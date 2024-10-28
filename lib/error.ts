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
