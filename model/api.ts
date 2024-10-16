import {
	SeoMetaData,
	Address,
	ContactPageContent,
	NavigationPageEntry,
	Artist,
	HomePageContent,
	AboutPageContent,
	CollectionPage,
	DetailCollectionItem,
	DetailPageContent,
	Slug,
	PortfolioCard,
} from './';

export interface SysID {
	sys: { id: string };
}

export interface AlertMessage {
	type: 'success' | 'error';
	message: string;
}

export enum OrderType {
	PUBLISHED_FIRST_DESC = 'newest', // default
	PUBLISHED_FIRST_ASC = 'oldest',
	PAGE_TITLE_DESC = 'z-a',
	PAGE_TITLE_ASC = 'a-z',
}

export const OrderTypeMap: { [key in OrderType]: string } = {
	[OrderType.PUBLISHED_FIRST_DESC]: 'sys_firstPublishedAt_DESC',
	[OrderType.PUBLISHED_FIRST_ASC]: 'sys_firstPublishedAt_ASC',
	[OrderType.PAGE_TITLE_DESC]: 'title_DESC',
	[OrderType.PAGE_TITLE_ASC]: 'title_ASC',
};

export interface MetaDataResponse {
	seoMetaData: SeoMetaData;
}

export interface MetaDataBySlugResponse {
	collectionPageCollection: {
		items: MetaDataResponse[];
	};
	detailPageCollection: {
		items: MetaDataResponse[];
	};
}

export interface NavigationResponse {
	navigation: {
		title: string;
		description: string;
		navigationItemsCollection: {
			items: NavigationPageEntry[];
		};
	};
}
export interface ArtistResponse {
	artist: Artist;
}

export interface AddressResponse {
	address: Address;
}

export interface TextBlockResponse {
	__typename: 'TextBlock';
	description: any;
	title: string | null;
}

export interface PortfolioCardResponse {
	__typename: 'PortfolioCards';
	detailPagesCollection: {
		items: PortfolioCard[];
	};
}

export interface HomePageResponse {
	seoMetaData: SeoMetaData;
	homePage: HomePageContent;
	artist: Artist;
	address: Address;
}

export interface AboutPageResponse {
	seoMetaData: SeoMetaData;
	aboutPage: AboutPageContent;
	artist: Artist;
	address: Address;
}

export interface CollectionPageResponse {
	collectionPageCollection: {
		items: CollectionPage[];
	};
}

export interface DetailPageCollectionResponse {
	detailPageCollection: {
		items: DetailCollectionItem[];
	};
}

export interface DetailPageBySlugResponse {
	detailPageCollection: {
		items: [DetailPageContent];
	};
	artist: Artist;
	address: Address;
}

export interface ContactPageResponse {
	seoMetaData: SeoMetaData;
	contactPage: ContactPageContent;
	artist: Artist;
	address: Address;
}

export interface SitemapItemResponse {
	slug: Slug;
	sys: {
		publishedAt: string;
	};
}

export interface SitemapResponse {
	homePageCollection: { items: [SitemapItemResponse] };
	aboutPageCollection: { items: SitemapItemResponse[] };
	collectionPageCollection: { items: SitemapItemResponse[] };
	detailPageCollection: { items: SitemapItemResponse[] };
	contactPageCollection: { items: [SitemapItemResponse] };
}
