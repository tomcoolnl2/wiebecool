import {
	Address,
	BasePageSchema,
	BaseSchema,
	ContactPage,
	ContactPageSchema,
	ContentData,
	DetailPage,
	ItemImage,
	PageData,
	PageType,
	PostalAddressSchema,
	ReWriteRule,
	Schema,
	SchemaType,
	SculptureSchema,
} from '@/model';
import { buildUrl, creator, locale, processPlainText } from '@/lib';

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
			url: buildUrl(data.slug, ReWriteRule[PageType.DetailPage]).href,
		};
	}

	switch (schemaType) {
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
