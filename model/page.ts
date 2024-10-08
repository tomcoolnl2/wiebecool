import type { Document } from '@contentful/rich-text-types';
import type { PortfolioCardResponse, SitemapItemResponse, SysID, TextBlockResponse } from '@/model';

export interface PageParams {
	params: { slug: string };
	searchParams?: { [key: string]: string | string[] | undefined };
}

export type RichText = Document & { json: any };

export enum PageType {
	HomePage = 'HomePage',
	AboutPage = 'AboutPage',
	CollectionPage = 'CollectionPage',
	ContactPage = 'ContactPage',
	DetailPage = 'DetailPage',
}

export type ReWriteRule = {
	[key in PageType]: Slug;
};

export const ReWriteRule: ReWriteRule = {
	[PageType.HomePage]: '/',
	[PageType.AboutPage]: '/over-mij',
	[PageType.CollectionPage]: '/collectie',
	[PageType.ContactPage]: '/contact',
	[PageType.DetailPage]: '/werk',
};

export type Slug = `/${string}`;

export interface SeoMetaData {
	title: string;
	description: string;
	keywords: string;
}

export interface ItemImage extends SysID {
	url: string;
	title: string;
	description: string;
	width: number;
	height: number;
}

export interface ImageCollection {
	items: ItemImage[];
}

export interface ImageAuthor {
	name: string;
	url: string;
}

export interface CollectionItems {
	items: CollectionItem[];
}

export interface CollectionItem extends SysID {
	slug: string;
	title: string;
	imageCollection: ImageCollection;
}

export interface PortfolioCard extends SysID {
	slug: string;
	title: string;
	imageCollection: {
		items: ItemImage[];
	};
}

export interface Tag {
	id: string;
	name: string;
}

export interface ContentfulMetaData {
	tags: Tag[];
}

export interface PageCarousel {
	description: RichText;
	showDescription: boolean;
	imageCollection: ImageCollection;
}

export interface Artist {
	name: string;
	occupation: string;
	description: string;
	telephone: string;
	email: string;
	mentions: string[];
}

export interface Address {
	streetAddress: string;
	zipCode: string;
	city: string;
	country: string;
}

export interface Breadcrumbs {
	parents: string[];
	current: string;
}

export interface ContactDetails {
	artist: Artist;
	address: Address;
}

interface BasePage {
	type: PageType;
	slug: Slug;
	name: string;
	title: string;
	description: RichText;
}

export interface HomePage extends BasePage {
	type: PageType.HomePage;
	title: string;
	subtitle: string;
	mugshot: ItemImage;
	buildingBlocksCollection: {
		items: Array<PortfolioCardResponse>;
	};
	artist: Artist;
}

export interface AboutPage extends BasePage {
	type: PageType.AboutPage;
	bannerImage: ItemImage;
	buildingBlocksCollection: {
		items: Array<TextBlockResponse | PortfolioCardResponse>;
	};
	artist: Artist;
}

export interface CollectionPage extends BasePage {
	type: PageType.CollectionPage;
	subtitle: string;
	sortingEnabled: boolean;
	filteringEnabled: boolean;
	contentfulMetadata: ContentfulMetaData;
	cards: DetailCollectionItem[];
}

export interface CollectionPageCollection {
	collectionPageCollection: {
		items: CollectionPage[];
	};
}

export interface DetailCollectionItem extends SysID, BasePage {
	priority: boolean;
	contentfulMetadata: ContentfulMetaData;
	imageCollection: ImageCollection;
}

export interface DetailPage extends BasePage, SysID {
	type: PageType.DetailPage;
	material: string | null;
	dimensions: string | null;
	status: string | null;
	price: string;
	creationDate: string | null;
	imageCollection: ImageCollection;
	mainImageAuthor?: ImageAuthor;
	imageCarousel: PageCarousel;
	contentfulMetadata: ContentfulMetaData;
	relatedItemsTags: string[];
	cards: DetailCollectionItem[];
}

export interface ContactPage extends BasePage {
	type: PageType.ContactPage;
	artist: Artist;
	address: Address;
	formIntro: string;
	submitButtonText: string;
}

export type PageData = HomePage | AboutPage | CollectionPage | DetailPage | ContactPage;

export type ContentData = Address | Breadcrumbs;

export interface SitemapItem {
	url: string;
	lastModified: string;
	changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: number;
}

export interface Sitemap {
	homePage: SitemapItemResponse;
	aboutPages: SitemapItemResponse[];
	collectionPages: SitemapItemResponse[];
	detailPages: SitemapItemResponse[];
	contactPage: SitemapItemResponse;
}
