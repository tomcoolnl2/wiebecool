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

export const fetchContentfulData = async (query: string) => {
	try {
		const url = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
			},
			body: JSON.stringify({ query }),
			cache: 'force-cache', // default
		});
		if (!response.ok) {
			throw new Error('Network response was not ok.');
		}
		const json = await response.json();
		return json.data;
		//
	} catch (error) {
		throw new ContentfulError(`Fetch error: Something went wrong`);
	}
};
