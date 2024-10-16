import { notFound } from 'next/navigation';
import { cache } from 'react';
import { DocumentNode as GraphQLDocumentNode } from 'graphql';
import MainNavigationQuery from '@/graphql/MainNavigation.gql';
import HomePageQuery from '@/graphql/HomePage.gql';
import ContactPageQuery from '@/graphql/ContactPage.gql';
import AboutPageQuery from '@/graphql/AboutPage.gql';
import CollectionPageBySlugQuery from '@/graphql/CollectionPageBySlug.gql';
import DetailPagesByTagIDs from '@/graphql/DetailPagesByTagIDs.gql';
import DetailPageBySlugQuery from '@/graphql/DetailPageBySlug.gql';
import SiteMapQuery from '@/graphql/Sitemap.gql';
import {
	type AboutPage,
	type AboutPageResponse,
	type DetailCollectionItem,
	type CollectionPage,
	type CollectionPageResponse,
	type ContactPage,
	type ContactPageResponse,
	type DetailPage,
	type DetailPageBySlugResponse,
	type DetailPageCollectionResponse,
	type HomePage,
	type HomePageResponse,
	type Navigation,
	type NavigationPageEntry,
	type NavigationResponse,
	type Sitemap,
	type SitemapResponse,
	type Slug,
	type SysID,
	OrderType,
	OrderTypeMap,
	PageType,
} from '@/model';
import { ContentfulError } from './error';
import { ContentfulIDs as cfids } from './contentful';

/**
 * Preloads data by fetching from Contentful.
 * @param {string | DocumentNode} query - The GraphQL query or document node.
 * @param {Object} [variables={}] - The variables to be passed with the query.
 */
export const preload = (query: string | GraphQLDocumentNode, variables = {}) => {
	void fetchContentfulData(query, variables);
};

/**
 * Fetches data using the provided fetcher function and handles errors.
 * If an error occurs, it will trigger the `notFound()` function to handle 404 scenarios.
 * @template T - The type of the data expected to be returned by the fetcher.
 * @param {() => Promise<T>} fetcher - A function that returns a promise resolving to the data.
 * @returns {Promise<T>} The fetched data if successful.
 * @throws Will trigger `notFound()` in case of an error.
 */
export const fetchData = async <T>(fetcher: () => Promise<T>): Promise<T> => {
	try {
		const data = await fetcher();
		return data;
	} catch (error) {
		notFound();
	}
};

/**
 * Fetches data from Contentful.
 * @param {string | DocumentNode} query - The GraphQL query or document node.
 * @param {Object} [variables={}] - The variables to be passed with the query.
 * @returns {Promise<Object>} A promise resolving to the fetched data.
 */
export const fetchContentfulData = cache(async <T>(query: string | GraphQLDocumentNode, variables = {}): Promise<T> => {
	try {
		const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

		const body =
			typeof query === 'string'
				? JSON.stringify({ query, variables })
				: JSON.stringify({
						query: query.loc!.source.body,
						variables,
				  });

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
			body,
			cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
		});

		if (!response.ok) {
			const msg = 'Network response was not ok.';
			throw new Error(msg);
		}

		const json = await response.json();
		return json.data;
		//
	} catch (error) {
		console.error(error);
		throw new ContentfulError(`Fetch error: Something went wrong`);
	}
});

export const fetchNavigation = async (sysID: string): Promise<Navigation> => {
	//
	const {
		navigation: {
			title,
			navigationItemsCollection: { items: navigation },
		},
	} = await fetchContentfulData<NavigationResponse>(MainNavigationQuery, { sysID });

	const promises = navigation.map(async (item: NavigationPageEntry) => {
		const subNavigation = item.subNavigation as SysID;
		if (subNavigation?.sys?.id) {
			const { navigation: subNavigationEntries } = await fetchNavigation(subNavigation.sys.id);
			item.subNavigation = subNavigationEntries;
		}
	});

	await Promise.all(promises);

	return { title, navigation };
};

/**
 * Fetches navigation data from Contentful based on a sys ID.
 * @returns {Promise<Navigation>} A promise resolving to the fetched navigation data.
 */
export async function fetchMainNavigation(): Promise<Navigation> {
	return await fetchNavigation(cfids.nav.id);
}

/**
 * Fetches home page data from Contentful.
 * @returns {Promise<HomePage>} A promise resolving to the fetched Home page Data.
 */
export async function fetchHomePage(): Promise<HomePage> {
	const { homePage, ...pageComponents } = await fetchContentfulData<HomePageResponse>(HomePageQuery, {
		homePageSysID: cfids.homePage.id,
		artistSysID: cfids.artist.id,
		addressSysID: cfids.address.id,
	});
	const seoMetaData = homePage.seoMetaData;
	const content = { ...homePage, type: PageType.HomePage };
	return { content, ...pageComponents, seoMetaData };
}

/**
 * Fetches about page data from Contentful.
 * @returns {Promise<AboutPage>} A promise resolving to the fetched About Page data.
 */
export async function fetchAboutPage(): Promise<AboutPage> {
	const { aboutPage, ...pageComponents } = await fetchContentfulData<AboutPageResponse>(AboutPageQuery, {
		aboutPageSysID: cfids.aboutPage.id,
		artistSysID: cfids.artist.id,
		addressSysID: cfids.address.id,
	});
	const seoMetaData = aboutPage.seoMetaData;
	const content = { ...aboutPage, type: PageType.AboutPage };
	return { content, ...pageComponents, seoMetaData };
}

/**
 * Fetches collection page data from Contentful based on a slug.
 * @param {Slug} slug The Contentful identifier
 * @param {OrderType} slug The sorting param
 * @returns {Promise<CollectionPage>} A promise resolving to the fetched about page data.
 */
export async function fetchCollectionPage(slug: Slug, sortOrder: OrderType | null): Promise<CollectionPage> {
	//
	const {
		collectionPageCollection: {
			items: [collectionPage],
		},
	} = await fetchContentfulData<CollectionPageResponse>(CollectionPageBySlugQuery, { slug });

	const tags = collectionPage.contentfulMetadata.tags.map((tag) => tag.id);
	const cards = await fetchDetailPagesByTagIDs(tags, sortOrder ?? OrderType.PUBLISHED_FIRST_DESC);
	const content = { ...collectionPage, type: PageType.CollectionPage, cards };
	const seoMetaData = collectionPage.seoMetaData;
	return { content, seoMetaData };
}

/**
 * Fetches detail pages based on tag IDs.
 * @param {string[]} tags - Array of tag IDs to filter detail pages.
 * @param {OrderType} [sortOrder=OrderType.PUBLISHED_FIRST_DESC] - Sort order for the fetched detail pages.
 * @param {number} [limit=0] - Maximum number of detail pages to fetch. Default is 0 (fetch all).
 * @param {string | null} [skipId=null] - ID of the detail page to skip fetching.
 * @returns {Promise<DetailCollectionItem[]>} - A promise that resolves to an array of DetailCollectionItem objects representing the fetched detail pages.
 */
export async function fetchDetailPagesByTagIDs(
	tags: string[],
	sortOrder = OrderType.PUBLISHED_FIRST_DESC,
	limit: number = 0, // 0 = all
	skipId: string | null = null
): Promise<DetailCollectionItem[]> {
	//
	const {
		detailPageCollection: { items: cards },
	} = await fetchContentfulData<DetailPageCollectionResponse>(DetailPagesByTagIDs, {
		tagIDs: tags,
		order: OrderTypeMap[sortOrder],
		limit,
		skipId,
	});

	return cards;
}

/**
 * Fetches detail/sculpture page data from Contentful based on a slug.
 * @param {Slug} slug The Contentful identifier
 * @returns {Promise<DetailPage>} A promise resolving to the fetched detail/sculpture page data.
 */
export async function fetchDetailPage(slug: Slug): Promise<DetailPage> {
	const {
		detailPageCollection: {
			items: [detailPage],
		},
		...pageComponents
	} = await fetchContentfulData<DetailPageBySlugResponse>(DetailPageBySlugQuery, {
		slug,
		artistSysID: cfids.artist.id,
		addressSysID: cfids.address.id,
	});

	let tags: string[] = [];
	if (detailPage.relatedItemsTags?.length) {
		tags = detailPage.relatedItemsTags.map((tag) => tag.toLowerCase());
	}

	const skipId = detailPage.sys.id;
	const cards = await fetchDetailPagesByTagIDs(tags, OrderType.PUBLISHED_FIRST_ASC, 4, skipId);
	const content = { ...detailPage, type: PageType.DetailPage, cards };
	const seoMetaData = detailPage.seoMetaData;
	return { seoMetaData, content, ...pageComponents };
}

/**
 * Fetches contact page data from Contentful based on a sys ID.
 * @returns {Promise<ContactPage>} A promise resolving to the fetched contact page data.
 */
export async function fetchContactPage(): Promise<ContactPage> {
	const { contactPage, ...pageComponents } = await fetchContentfulData<ContactPageResponse>(ContactPageQuery, {
		contactPageSysID: cfids.contactPage.id,
		artistSysID: cfids.artist.id,
		addressSysID: cfids.address.id,
	});
	const seoMetaData = contactPage.seoMetaData;
	const content = { ...contactPage, type: PageType.ContactPage };
	return { content, ...pageComponents, seoMetaData };
}

/**
 * Fetches all main  pages from Contentful
 * @returns {Promise<Sitemap>} A promise resolving to the fetched pages data.
 */
export async function fetchSitemap(): Promise<Sitemap> {
	const {
		homePageCollection: {
			items: [homePage],
		},
		aboutPageCollection: { items: aboutPages },
		collectionPageCollection: { items: collectionPages },
		detailPageCollection: { items: detailPages },
		contactPageCollection: {
			items: [contactPage],
		},
	} = await fetchContentfulData<SitemapResponse>(SiteMapQuery);

	return { homePage, aboutPages, collectionPages, detailPages, contactPage };
}
