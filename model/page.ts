import { SysID } from './navigation';

export type Slug = `/${string}`;

export enum PageType {
	HomePage = 'HomePage',
	AboutPage = 'AboutPage',
	CollectionPage = 'CollectionPage',
	ContactPage = 'ContactPage',
	DetailPage = 'DetailPage',
}

export const ReWriteRule = {
	[PageType.CollectionPage]: '/collectie',
	[PageType.DetailPage]: '/werk',
};

export interface CollectionItemImage {
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
	imagesCollection: {
		items: CollectionItemImage[];
	};
}
