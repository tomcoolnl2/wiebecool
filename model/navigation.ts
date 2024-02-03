//
import { PageType } from '.';

export interface SysID {
	sys: { id: string };
}

interface PageEntry extends SysID {
	__typename: PageType;
	slug: string;
}

export interface NavigationPageEntry {
	name: string;
	page: PageEntry;
	subNavigation: SysID | NavigationPageEntry[] | null;
}

export interface Navigation {
	title: string;
	navigation: NavigationPageEntry[];
}

export interface NavigationContextState {
	isMobileOpen: boolean;
	toggleMobile: (value: boolean) => void;
}
