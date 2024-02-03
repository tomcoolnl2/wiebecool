import * as React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document, INLINES } from '@contentful/rich-text-types';
import { Address, Slug } from '@/model';

/** The locale of the website */
export const locale = 'nl-NL';

/** The base URL of the website. */
export const baseUrl = 'https://wiebecool.nl';

/** Hardcoded. */
export const creator = {
	name: 'Wiebe Cool',
	occupation: 'Beeldhouwer',
	description: 'Wiebe Cool | Beeldhouwer',
};

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
 * Detects if the current environment is a mobile device.
 * @returns {boolean} True if the environment is a mobile device, false otherwise.
 */
export function detectMobile(): boolean {
	if (typeof window === 'undefined') {
		return false;
	}
	return window.navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
}

/**
 * Generates a Google Maps address string.
 * @param {string} address The address to format.
 * @returns {string} The formatted Google Maps address string.
 */
export function generateGoogleMapsAddress(address: Address): string {
	return `${address.streetAddress}+${address.zipCode}+${address.city}+,${address.country}`;
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
export function formatStatus(input: string): string {
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
