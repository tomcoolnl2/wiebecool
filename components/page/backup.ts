interface Navigation {
	title: string;
	description: string;
	navigationItemsCollection: {
		items: NavigationEntry[];
	};
}

type NavigationEntry = NavigationPageEntry | NavigationTagEntry;
interface NavigationPageEntry {
	__typename: 'NavigationPageEntry';
	name: string;
	subNavigation: null;
	page: { __typename: string; slug: string };
}

interface NavigationTagEntry {
	__typename: 'NavigationTagEntry';
	name: string;
	tags: string;
	subNavigation: null;
}

const query = `
	query Navigation {
		navigation(id: "5bRsPaSUeUrD7QB5m868iu") {
			title
			description
			navigationItemsCollection {
				items {
					__typename
					... on NavigationPageEntry {
						name
						page {
							__typename
							... on HomePage { slug }
							... on AboutPage { slug }
							... on CollectionPage { slug }
							... on ContactPage { slug }
						}
						subNavigation {
							sys { id }
						}
					}
				}
			}
		}
	}
`;
