import {
	AboutPage,
	AboutPageSchema,
	Address,
	Artist,
	BasePageSchema,
	BaseSchema,
	ContactPage,
	ContactPageSchema,
	ContentData,
	DetailPage,
	HomePage,
	HomePageSchema,
	ItemImage,
	PageData,
	PageType,
	PersonSchema,
	PostalAddressSchema,
	ReWriteRule,
	Schema,
	SchemaType,
	SculptureSchema,
} from '@/model';
import { buildUrl, creator, locale, processPlainText } from '@/lib';

function generatePersonSchema(data: Artist): PersonSchema {
	return {
		'@type': SchemaType.PERSON,
		name: data.name,
		description: data.description,
		sameAs: data.mentions?.join(',') || '',
	};
}

export function generateSchema(
	data: PageData | ContentData,
	schemaType: SchemaType,
	img: ItemImage | null = null
): Schema {
	//
	const baseSchema: BaseSchema = {
		'@context': 'https://schema.org',
		'@type': schemaType,
		inLanguage: locale,
	};

	let basePageSchema = {} as BasePageSchema;
	if ('type' in data) {
		// true if data === PageData
		basePageSchema = {
			name: data.title || 'Untitled',
			description: processPlainText(data.description),
			url: buildUrl(data.slug).href,
		};
	}

	switch (schemaType) {
		case SchemaType.HOME_PAGE: {
			const homePageData = data as HomePage;
			const schema = {
				...baseSchema,
				...basePageSchema,
				about: generatePersonSchema(homePageData.artist),
			};
			return schema as HomePageSchema;
		}
		case SchemaType.ABOUT_PAGE: {
			const aboutPageData = data as AboutPage;
			const schema = {
				...baseSchema,
				...basePageSchema,
				mainEntity: generatePersonSchema(aboutPageData.artist),
			};
			return schema as AboutPageSchema;
		}
		case SchemaType.POSTAL_ADDRESS: {
			const addressData = data as Address;
			const schema = {
				'@type': SchemaType.POSTAL_ADDRESS,
				streetAddress: addressData.streetAddress,
				addressLocality: addressData.city,
				postalCode: addressData.zipCode,
				addressCountry: addressData.country,
			};
			return schema as PostalAddressSchema;
		}
		case SchemaType.SCULPTURE: {
			const detailPageData = data as DetailPage;
			const dateCreated = detailPageData.creationDate ?? null;
			const material = detailPageData.material ?? null;
			const dimensions = detailPageData.dimensions ?? null;
			const image = img?.url ?? '';
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(detailPageData.slug, ReWriteRule[PageType.DetailPage]).href,
				image,
				creator: {
					'@type': SchemaType.PERSON,
					name: creator.name,
				},
				...(dateCreated ? { dateCreated } : {}),
				...(material ? { material } : {}),
				...(dimensions ? { dimensions } : {}),
			};
			return schema as SculptureSchema;
		}
		case SchemaType.CONTACT_PAGE: {
			const contactPageData = data as ContactPage;
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(contactPageData.slug).href,
				contactPoint: {
					'@type': SchemaType.CONTACT_POINT,
					telephone: contactPageData.artist.telephone,
					email: contactPageData.artist.email,
				},
			};
			return schema as ContactPageSchema;
		}
		default:
			throw new Error('Unsupported schema type');
	}
}
