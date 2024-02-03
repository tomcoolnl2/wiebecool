import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Slug } from '@/model';

export const baseUrl = 'https://wiebecool.nl';

export function buildUrl(slug: Slug, category: Slug | '' = ''): URL {
	return new URL(category + slug, baseUrl);
}

export function detectMobile(): boolean {
	if (typeof window === 'undefined') {
		return false;
	}
	return window.navigator && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent);
}

export function generateGoogleMapsAddress(address: string): string {
	return address.replace(/ /g, '+');
}

export function processRichText(rawRichText: any): React.ReactNode {
	return documentToReactComponents(rawRichText);
}

export function formatStatus(input: string): string {
	const price = parseFloat(input);
	if (!isNaN(price)) {
		const formattedPrice = price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
		return formattedPrice;
	} else {
		return input;
	}
}

export function ensureLeadingSlash(str: string): Slug {
	if (!str.startsWith('/')) {
		return `/${str}`;
	}
	return str as Slug;
}
