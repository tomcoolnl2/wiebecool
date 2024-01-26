export interface State {
	animation: string;
	modal: boolean;
	portfolioDetailsModal: PortfolioItem | null;
	modalToggle: (value: boolean) => void;
	setPortfolioDetailsModal: (value: PortfolioItem | null) => void;
}

export enum ActionType {
	MODAL = 'MODAL',
	PORTFOLIODETAILSMODAL = 'PORTFOLIODETAILSMODAL',
}

export type StateAction =
	| { type: ActionType.MODAL; payload: boolean }
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
