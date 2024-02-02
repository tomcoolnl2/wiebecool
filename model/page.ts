import { SysID } from './navigation';

export interface SitemapItem {
	url: string;
	lastModified: string;
	changeFrequency: 'yearly' | 'monthly' | 'weekly';
	priority: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
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

export const ReWriteRule: { [key in PageType]: Slug } = {
	[PageType.HomePage]: '/',
	[PageType.AboutPage]: '/about',
	[PageType.CollectionPage]: '/collectie',
	[PageType.ContactPage]: '/contact',
	[PageType.DetailPage]: '/werk',
};

export type Slug = `/${string}`;

export interface ItemImage extends SysID {
	url: string;
	title: string;
	description: string;
}

export interface CollectionItems {
	items: CollectionItem[];
}

export interface CollectionItem extends SysID {
	slug: string;
	title: string;
	imageCollection: {
		items: ItemImage[];
	};
}

export interface PageCarousel {
	description: any; // TODO
	showDescription: boolean;
	imageCollection: {
		items: ItemImage[];
	};
}
