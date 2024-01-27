import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

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

export function parseSeoMetaDataQuery(id: string): string {
	return `
		query SeoMetaData {
			seoMetaData(id: "${id}") {
				title
				description
				keywords
			}
		}
	`;
}

export function detailPagesByTagIDQuery(id: string) {
	const guery = `
	query DetailPagesByTagID {
		detailPageCollection(
		  	where: { contentfulMetadata: { tags: { id_contains_all: "${id}"} } }
		) {
		  	items {
				name
				title
				description
				imagesCollection {
					items {
					  url
					  title
					  description
					}
				  }
		  	}
		}
	}`;
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

export function ensureLeadingSlash(str: string): string {
	if (!str.startsWith('/')) {
		return `/${str}`;
	}
	return str;
}
