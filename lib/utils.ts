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
