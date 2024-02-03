import { Document } from '@contentful/rich-text-types';
import { SysID } from './navigation';

export type RichText = Document & { json: any };

export interface SitemapItem {
	url: URL;
	lastModified: string;
	changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: number;
}

export interface SitemapItemResponse {
	slug: Slug;
	sys: {
		publishedAt: string;
	};
}

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
	[PageType.AboutPage]: '/about',
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
}

export interface Address {
	streetAddress: string;
	zipCode: string;
	city: string;
	country: string;
}

interface BasePage {
	type: PageType;
	slug: Slug;
	name: string;
	title: string;
	description: RichText;
}

export interface ContactPage extends BasePage {
	type: PageType.ContactPage;
	artist: Artist;
	address: Address;
	submitButtonText: string;
}

export interface DetailPage extends BasePage {
	material: string | null;
	dimensions: string | null;
	status: string | null;
	creationDate: string | null;
	imageCollection: ImageCollection;
	imageCarousel: PageCarousel;
}

export type PageData = DetailPage | ContactPage;

export type ContentData = Address;
