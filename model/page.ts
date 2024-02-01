import { SysID } from './navigation';

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
