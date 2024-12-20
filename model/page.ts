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

export interface GlobalConfig {
	locale: string;
	baseUrl: string;
	sysIDs: Record<string, string>;
}

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
	address: Address;
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

interface BasePage {
	type: PageType;
	slug: Slug;
	seoMetaData: SeoMetaData;
	name: string;
	title: string;
	description: RichText;
}

export interface HomePageContent extends BasePage {
	title: string;
	subtitle: string;
	mugshot: ItemImage;
	buildingBlocksCollection: {
		items: Array<PortfolioCardResponse>;
	};
}

export interface HomePage {
	seoMetaData: SeoMetaData;
	content: HomePageContent;
}

export interface AboutPageContent extends BasePage {
	bannerImage: ItemImage;
	buildingBlocksCollection: {
		items: Array<TextBlockResponse | PortfolioCardResponse>;
	};
}

export interface AboutPage {
	seoMetaData: SeoMetaData;
	content: AboutPageContent;
}

export interface CollectionPage {
	seoMetaData: SeoMetaData;
	content: CollectionPageContent;
}

export interface CollectionPageContent extends BasePage {
	seoMetaData: SeoMetaData;
	bannerImage: ItemImage;
	buildingBlocksCollection: {
		items: Array<TextBlockResponse | PortfolioCardResponse>;
	};
	subtitle: string;
	sortingEnabled: boolean;
	filteringEnabled: boolean;
	contentfulMetadata: ContentfulMetaData;
	cards: DetailCollectionItem[];
}

export interface CollectionPageCollection {
	collectionPageCollection: {
		items: CollectionPageContent[];
	};
}

export interface DetailCollectionItem extends SysID, BasePage {
	priority: boolean;
	contentfulMetadata: ContentfulMetaData;
	imageCollection: ImageCollection;
}

export interface DetailPageContent extends BasePage, SysID {
	seoMetaData: SeoMetaData;
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

export interface DetailPage {
	seoMetaData: SeoMetaData;
	content: DetailPageContent;
}

export interface ContactPageContent extends BasePage {
	formIntro: string;
	submitButtonText: string;
}

export interface ContactPage {
	seoMetaData: SeoMetaData;
	content: ContactPageContent;
}

export type PageContent = HomePageContent | AboutPageContent | CollectionPageContent | DetailPageContent | ContactPageContent;

export type ComponentContent = Artist | Address | Breadcrumbs;

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

export type ContactFormInput = {
	name: string;
	email: string;
	message: string;
};
