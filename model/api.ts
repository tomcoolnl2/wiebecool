import {
	SeoMetaData,
	Address,
	ContactPage,
	NavigationPageEntry,
	Artist,
	HomePage,
	AboutPage,
	CollectionPage,
	DetailCollectionItem,
	DetailPage,
	Slug,
	PortfolioCard,
} from './';

export interface SysID {
	sys: { id: string };
}

export enum AlertMessageType {
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface AlertMessage {
	type: AlertMessageType;
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
	homePage: HomePage;
}

export interface AboutPageResponse {
	aboutPage: AboutPage;
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
		items: [DetailPage];
	};
}

export interface ContactPageResponse {
	contactPage: ContactPage;
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
