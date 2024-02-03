import { cache } from 'react';
import { DocumentNode as GraphQLDocumentNode } from 'graphql';
import {
	AboutPage,
	AboutPageResponse,
	Address,
	AddressResponse,
	Artist,
	ArtistResponse,
	ContactDetails,
	ContactPage,
	ContactPageResponse,
	HomePage,
	HomePageResponse,
	MetaDataResponse,
	Navigation,
	NavigationPageEntry,
	NavigationResponse,
	PageType,
	SysID,
} from '@/model';

import MetaDataQuery from '@/graphql/MetaData.gql';
import MainNavigationQuery from '@/graphql/MainNavigation.gql';
import HomePageQuery from '@/graphql/HomePage.gql';
import ContactPageQuery from '@/graphql/ContactPage.gql';
import AddressQuery from '@/graphql/Address.gql';
import ArtistQuery from '@/graphql/Artist.gql';
import AboutPageQuery from '@/graphql/AboutPage.gql';

/**
 * Represents an error specific to Contentful-related operations.
 * @class
 * @extends Error
 */
export class ContentfulError extends Error {
	/**
	 * Creates an instance of ContentfulError.
	 * @param {string} message - The error message.
	 * @param {number} status - The status code associated with the error. Default is 500.
	 */
	constructor(message: string, public status: number = 500) {
		super(message);
		this.name = this.constructor.name;
		this.message = `Contentful: ${this.status}: ${message}`;
		Object.setPrototypeOf(this, ContentfulError.prototype);
	}
}

/**
 * Preloads data by fetching from Contentful.
 * @param {string | DocumentNode} query - The GraphQL query or document node.
 * @param {Object} [variables={}] - The variables to be passed with the query.
 */
export const preload = (query: string | GraphQLDocumentNode, variables = {}) => {
	void fetchContentfulData(query, variables);
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

/**
 * Fetches SEO Meta data from Contentful based on a sys ID.
 * @param {string} sysID The Contentful identifier
 * @returns {Promise<MetaDataResponse>} A promise resolving to the fetched seo meta data.
 */
export async function fetchSeoMetaData(sysID: string): Promise<MetaDataResponse> {
	return await fetchContentfulData<MetaDataResponse>(MetaDataQuery, { sysID });
}

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
	return await fetchNavigation('5bRsPaSUeUrD7QB5m868iu');
}

/**
 * Fetches address data from Contentful based on a sys ID.
 * @returns {Promise<Artist>} A promise resolving to the fetched address data.
 */
export async function fetchArtist(): Promise<Artist> {
	const { artist } = await fetchContentfulData<ArtistResponse>(ArtistQuery, { sysID: '42dyv6PaMYHTxIQvt5k1BR' });
	return artist;
}

/**
 * Fetches address data from Contentful based on a sys ID.
 * @returns {Promise<Address>} A promise resolving to the fetched address data.
 */
export async function fetchAddress(): Promise<Address> {
	const { address } = await fetchContentfulData<AddressResponse>(AddressQuery, { sysID: 'VYrkgFK6dR1V81lIJqez2' });
	return address;
}

export async function fetchContactDetails(): Promise<ContactDetails> {
	const [artist, address] = await Promise.all([fetchArtist(), fetchAddress()]);
	return { artist, address };
}

/**
 * Fetches home page data from Contentful based on a sys ID.
 * @returns {Promise<HomePage>} A promise resolving to the fetched home page data.
 */
export async function fetchHomePage(): Promise<HomePage> {
	const [{ homePage }, artist] = await Promise.all([
		await fetchContentfulData<HomePageResponse>(HomePageQuery, {
			sysID: '7bjsm9rIwR5janeyF5XK2n',
		}),
		fetchArtist(),
	]);
	console.log(artist);
	return { ...homePage, type: PageType.HomePage, artist };
}

/**
 * Fetches about page data from Contentful based on a sys ID.
 * @returns {Promise<AboutPage>} A promise resolving to the fetched about page data.
 */
export async function fetchAboutPage(): Promise<AboutPage> {
	const [{ aboutPage }, artist] = await Promise.all([
		await fetchContentfulData<AboutPageResponse>(AboutPageQuery, {
			sysID: '3LaYVXJtqbtQYH38PqSkeQ',
		}),
		fetchArtist(),
	]);
	return { ...aboutPage, type: PageType.AboutPage, artist };
}

/**
 * Fetches contact page data from Contentful based on a sys ID.
 * @returns {Promise<ContactPage>} A promise resolving to the fetched contact page data.
 */
export async function fetchContactPage(): Promise<ContactPage> {
	const [{ contactPage }, artist, address] = await Promise.all([
		await fetchContentfulData<ContactPageResponse>(ContactPageQuery, {
			sysID: '68BbqtKbBhg4PwwWHNOB2',
		}),
		fetchArtist(),
		fetchAddress(),
	]);
	return { ...contactPage, type: PageType.ContactPage, artist, address };
}
