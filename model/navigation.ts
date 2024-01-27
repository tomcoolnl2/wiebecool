//
export interface Navigation {
	title: string;
	description: string;
	navigationItemsCollection: {
		items: NavigationPageEntry[];
	};
}

interface PageEntry {
	sys: { id: string };
	slug: string;
}

export interface NavigationPageEntry {
	name: string;
	page: PageEntry;
	subNavigation: Navigation | null;
}
