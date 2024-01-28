import 'server-only';
import { cache } from 'react';
import { DocumentNode } from 'graphql';
import { NavigationPageEntry, NavigationResponse, SysID } from '@/model/navigation';
import MainNavigationQuery from '@/graphql/MainNavigation.gql';
/**
 * Represents an authentication error.
 * @class
 * @extends Error
 */
export class ContentfulError extends Error {
	/**
	 * Creates an instance of AuthError.
	 * @param {string} message - The error message.
	 * @param {number} status - The status code associated with the error.
	 */
	constructor(message: string, public status: number = 500) {
		super(message);
		this.name = this.constructor.name;
		this.message = `Contentful: ${this.status}: ${message}`;
		Object.setPrototypeOf(this, ContentfulError.prototype);
	}
}

export const preload = (query: string | DocumentNode, variables = {}) => {
	void fetchContentfulData(query, variables);
};

export const fetchContentfulData = cache(async (query: string | DocumentNode, variables = {}) => {
	try {
		const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

		const body =
			typeof query === 'string'
				? JSON.stringify({ query, variables })
				: JSON.stringify({
						query: query.loc!.source.body,
						variables,
				  });

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
			body,
			cache: process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache',
		});

		if (!response.ok) {
			const msg = 'Network response was not ok.';
			console.log(msg, response);
			throw new Error(msg);
		}

		const json = await response.json();
		return json.data;
		//
	} catch (error) {
		console.error(error);
		throw new ContentfulError(`Fetch error: Something went wrong`);
	}
});

export const fetchMainNavigation = async (sysID: string): Promise<NavigationResponse> => {
	const {
		navigation: {
			title,
			navigationItemsCollection: { items: navigation },
		},
	} = await fetchContentfulData(MainNavigationQuery, { sysID });

	const promises = navigation.map(async (item: NavigationPageEntry) => {
		const subNavigation = item.subNavigation as SysID;
		if (subNavigation?.sys?.id) {
			const { navigation: subNavigationEntries } = await fetchMainNavigation(subNavigation.sys.id);
			item.subNavigation = subNavigationEntries;
		}
	});
	await Promise.all(promises);

	return { title, navigation };
};
