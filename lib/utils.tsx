import emailjs from 'emailjs-com';
import * as React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document, INLINES } from '@contentful/rich-text-types';
import { Address, AlertMessage, AlertMessageType, ContactFormInput, OrderType, PageType, ReWriteRule, Slug } from '@/model';

/** The locale of the website */
export const locale = 'nl-NL';

/** The base URL of the website. */
export const baseUrl = 'https://wiebecool.nl';

/** Hardcoded. */
export const artist = {
	name: 'Wiebe Cool',
	occupation: 'Beeldhouwer',
	description: 'Wiebe Cool | Beeldhouwer',
};

/**
 * Builds a link for the href attribute of a Navigation link.
 * @param {PageType} pageType - The type of page as a string.
 * @param {slug} slug - The name for the page to navigate to.
 * @returns {Slug} The formatted slug representing the path to a page.
 */
export function hrefBuilder(pageType: PageType, slug: string): Slug {
	const formattedSlug: Slug = ensureLeadingSlash(slug);
	switch (pageType) {
		case PageType.CollectionPage:
			return (ReWriteRule[PageType.CollectionPage] + formattedSlug) as Slug;
		case PageType.DetailPage:
			return (ReWriteRule[PageType.DetailPage] + formattedSlug) as Slug;
		default:
			return formattedSlug;
	}
}

/**
 * Formats search parameters based on the provided order and filter values.
 * @param {OrderType | null} order - The order parameter value.
 * @param {string | null} filter - The filter parameter value.
 * @returns {string} The formatted search parameters string.
 */
export function formatSearchParams(order: OrderType | null, filter: string | null): string {
	const params = new URLSearchParams();
	if (order) {
		params.set('order', order);
	}
	if (filter) {
		params.set('filter', filter);
	}
	const searchParams = params.toString();
	return searchParams ? '?' + searchParams : '';
}

/**
 * Constructs a string with the first char to capitalize
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Constructs a URL based on the provided slug and path.
 * @param {Slug} slug The slug to append to the URL.
 * @param {Slug} [path=''] The optional path to prepend to the slug.
 * @returns {URL} The constructed URL.
 */
export function buildUrl(slug: Slug, path: Slug | '' = ''): URL {
	return new URL(path + slug, baseUrl);
}

/**
 * Generates a Google Maps address string.
 * @param {string} address The address to format.
 * @returns {string} The formatted Google Maps address string.
 */
export function formatGoogleMapsAddress(address: Address): string {
	return `${address.streetAddress}+${address.zipCode}+${address.city}+,${address.country}`;
}

/**
 * Formats a phone number by adding spaces in a 2-3-3-2 pattern.
 *
 * @param {string} phone - The phone number to format (e.g., '0628979316').
 * @returns {string} - The formatted phone number (e.g., '06 289 793 16').
 */
export function formatPhoneNumber(phone: string): string {
	return phone.replace('0316', '6').replace(/(\d{2})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4');
}

/**
 * Processes Contentful rich text and converts it into React components.
 * @param {Document} rawRichText The raw rich text document from Contentful.
 * @returns {React.ReactNode} The React components generated from the rich text.
 */
export function processRichText(rawRichText: Document): React.ReactNode {
	const options = {
		renderNode: {
			[INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => {
				let anchorAttrs = {};
				if (/^https?:\/\//.test(node.data.uri)) {
					anchorAttrs = {
						target: '_blank',
						rel: 'noopener noreferrer',
					};
				}
				return (
					<a href={node.data.uri} {...anchorAttrs}>
						{children}
					</a>
				);
			},
		},
	};
	return documentToReactComponents(rawRichText, options);
}

/**
 * Processes Contentful rich text and converts it into React components.
 * @param {Document} rawRichText The raw rich text document from Contentful.
 * @returns {string} The plain string representation generated from rich text.
 */
export function processPlainText(rawRichText: Document): string {
	return documentToPlainTextString(rawRichText);
}

/**
 * Formats a string representing a price.
 * @param {string} input The input string to format.
 * @returns {string} The formatted price string.
 */
export function formatPrice(input: string): string {
	const price = parseFloat(input);
	if (!isNaN(price)) {
		const formattedPrice = price.toLocaleString(locale, { style: 'currency', currency: 'EUR' });
		return formattedPrice;
	} else {
		return input;
	}
}

/**
 * Ensures a string has a leading slash.
 * @param {string} str The input string to check.
 * @returns {Slug} The string with a leading slash.
 */
export function ensureLeadingSlash(str: string): Slug {
	if (!str.startsWith('/')) {
		return `/${str}` as Slug;
	}
	return str as Slug;
}

/**
 * Converts a date string to a localized date string.
 * @param {string} dateString - The input date string in ISO 8601 format.
 * @returns {string} The localized date string.
 */
export function toLocaleDateString(dateString: string): string {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
	const parts = formattedDate.split(' ');
	const capitalizedMonth = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
	return `${parts[0]} ${capitalizedMonth} ${parts[2]}`;
}

/**
 * Validates the contact form data.
 * @param {FormData} formData - The form data containing the email, name, and message.
 * @returns {AlertMessage} An alert message indicating the validation result.
 */
export async function sendEmail(data: ContactFormInput): Promise<AlertMessage> {
	const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
	const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
	const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';

	try {
		await emailjs.send(
			serviceID,
			templateID,
			{
				from_name: data.name,
				from_email: data.email,
				message: data.message,
			},
			userID
		);
		return { type: AlertMessageType.SUCCESS, message: 'Bericht verstuurd. Bedankt!' };
	} catch (error) {
		console.error('Error sending email:', error);
		return { type: AlertMessageType.ERROR, message: 'Er ging iets mis!' };
	}
}
