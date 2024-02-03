import { SeoMetaData, Address, ContactPage, NavigationPageEntry, Artist, HomePage } from './';

export interface MetaDataResponse {
	seoMetaData: SeoMetaData;
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

export interface DetailPageResponse {
	detailPageCollection: {
		items: DetailPageResponse[];
	};
}
export interface ContactPageResponse {
	contactPage: ContactPage;
}
