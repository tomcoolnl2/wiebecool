export interface State {
	nav: string;
	animation: string;
	modal: boolean;
	serviceModal: ServiceModal | null;
	productModal: Product | null;
	portfolioDetailsModal: PortfolioItem | null;
	menus: MenuItem[];
	navChange: (value: string) => void;
	animationChange: (value: string) => void;
	setServiceModal: (value: ServiceModal | null) => void;
	modalToggle: (value: boolean) => void;
	setProductModal: (value: Product | null) => void;
	setPortfolioDetailsModal: (value: PortfolioItem | null) => void;
}

export enum ActionType {
	NAV = 'NAV',
	ANIMATION = 'ANIMATION',
	MODAL = 'MODAL',
	SERVICEMODAL = 'SERVICEMODAL',
	NEWSMODAL = 'NEWSMODAL',
	PORTFOLIODETAILSMODAL = 'PORTFOLIODETAILSMODAL',
}

export type StateAction =
	| { type: ActionType.NAV; payload: string }
	| { type: ActionType.ANIMATION; payload: string }
	| { type: ActionType.MODAL; payload: boolean }
	| { type: ActionType.SERVICEMODAL; payload: ServiceModal | null }
	| { type: ActionType.NEWSMODAL; payload: Product | null }
	| { type: ActionType.PORTFOLIODETAILSMODAL; payload: PortfolioItem | null };

export interface MenuItem {
	id: number;
	name: string;
	href: string;
}

export interface NewsModal {
	image: string;
	author: string;
	date: string;
	title: string;
}

export interface ServiceModal {
	id: number;
	name: string;
	text: string[];
	image: string;
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
