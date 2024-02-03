import { cache } from 'react';
import { DocumentNode as GraphQLDocumentNode } from 'graphql';
import { NavigationPageEntry, NavigationResponse, SysID } from '@/model/navigation';
import MainNavigationQuery from '@/graphql/MainNavigation.gql';

/**
 * Represents an error specific to Contentful-related operations.
 * @class
 * @extends Error
 */
export class ContentfulError extends Error {
	/**
	 * Creates an instance of ContentfulError.
	 * @param {string} message - The error message.
	 * @param {number} status - The status code associated with the error. Default is 500.
	 */
	constructor(message: string, public status: number = 500) {
		super(message);
		this.name = this.constructor.name;
		this.message = `Contentful: ${this.status}: ${message}`;
		Object.setPrototypeOf(this, ContentfulError.prototype);
	}
}

/**
 * Preloads data by fetching from Contentful.
 * @param {string | DocumentNode} query - The GraphQL query or document node.
 * @param {Object} [variables={}] - The variables to be passed with the query.
 */
export const preload = (query: string | GraphQLDocumentNode, variables = {}) => {
	void fetchContentfulData(query, variables);
};

/**
 * Fetches data from Contentful.
 * @param {string | DocumentNode} query - The GraphQL query or document node.
 * @param {Object} [variables={}] - The variables to be passed with the query.
 * @returns {Promise<Object>} A promise resolving to the fetched data.
 */
export const fetchContentfulData = cache(async (query: string | GraphQLDocumentNode, variables = {}) => {
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

export const fetchNavigation = async (sysID: string): Promise<NavigationResponse> => {
	const {
		navigation: {
			title,
			navigationItemsCollection: { items: navigation },
		},
	} = await fetchContentfulData(MainNavigationQuery, { sysID });

	const promises = navigation.map(async (item: NavigationPageEntry) => {
		const subNavigation = item.subNavigation as SysID;
		if (subNavigation?.sys?.id) {
			const { navigation: subNavigationEntries } = await fetchNavigation(subNavigation.sys.id);
			item.subNavigation = subNavigationEntries;
		}
	});
	await Promise.all(promises);

	return { title, navigation };
};

/**
 * Fetches navigation data from Contentful based on a sys ID.
 * @param {string} sysID - The sys ID associated with the navigation.
 * @returns {Promise<NavigationResponse>} A promise resolving to the fetched navigation data.
 */
export async function fetchMainNavigation() {
	return await fetchNavigation('5bRsPaSUeUrD7QB5m868iu');
}
