//

export interface Navigation {
	title: string;
	description: string;
	navigationItemsCollection: {
		items: NavigationPageEntry[];
	};
}

export interface SysID {
	sys: { id: string };
}
interface PageEntry extends SysID {
	slug: string;
}

export interface NavigationPageEntry {
	name: string;
	page: PageEntry;
	subNavigation: SysID | NavigationPageEntry[] | null;
}

export interface NavigationResponse {
	title: string;
	navigation: NavigationPageEntry[];
}

export interface NavigationContextState {
	isMobileOpen: boolean;
	toggleMobile: (value: boolean) => void;
}
