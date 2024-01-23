export interface State {
	animation: string;
	modal: boolean;
	productModal: Product | null;
	portfolioDetailsModal: PortfolioItem | null;
	modalToggle: (value: boolean) => void;
	setProductModal: (value: Product | null) => void;
	setPortfolioDetailsModal: (value: PortfolioItem | null) => void;
}

export enum ActionType {
	MODAL = 'MODAL',
	NEWSMODAL = 'NEWSMODAL',
	PORTFOLIODETAILSMODAL = 'PORTFOLIODETAILSMODAL',
}

export type StateAction =
	| { type: ActionType.MODAL; payload: boolean }
	| { type: ActionType.NEWSMODAL; payload: Product | null }
	| { type: ActionType.PORTFOLIODETAILSMODAL; payload: PortfolioItem | null };

export interface MenuItem {
	id: number;
	name: string;
	href: string;
}

export interface PortfolioItem {
	id: number;
	thumbnail: string;
	title: string;
	text: string[];
	client: string;
	date: string;
	category: string;
	share: ShareItem[];
	bigImage: string;
	images: string[];
}

export interface ShareItem {
	id: number;
	iconName: string;
	link: string;
}

export interface Product {
	id: number;
	title: string;
	subtitle: string;
	image: string;
	alt: string;
}
