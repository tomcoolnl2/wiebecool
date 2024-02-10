import { Document } from '@contentful/rich-text-types';
import { PortfolioCardResponse, SitemapItemResponse, SysID } from '@/model';
import { TextBlock } from '@/components';

export interface PageParams {
	params: { slug: string };
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
	artist: Artist;
}

export interface AboutPage extends BasePage {
	type: PageType.AboutPage;
	bannerImage: ItemImage;
	buildingBlocksCollection: {
		items: Array<TextBlock | PortfolioCardResponse>;
	};
	artist: Artist;
}

export interface CollectionPage extends BasePage {
	type: PageType.CollectionPage;
	subtitle: string;
	tags: string[];
	collection: DetailCollectionItem[];
}

export interface CollectionPageCollection {
	collectionPageCollection: {
		items: CollectionPage[];
	};
}

export interface DetailCollectionItem extends SysID, BasePage {
	imageCollection: ImageCollection;
}

export interface DetailPage extends BasePage {
	type: PageType.DetailPage;
	material: string | null;
	dimensions: string | null;
	status: string | null;
	creationDate: string | null;
	imageCollection: ImageCollection;
	imageCarousel: PageCarousel;
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
