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
} from './';

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
