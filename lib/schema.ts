import { buildUrl, fetchGlobalConfig, processPlainText } from '@/lib';
import {
	AboutPageSchema,
	Address,
	Artist,
	BasePageSchema,
	BaseSchema,
	BreadcrumbSchema,
	Breadcrumbs,
	CollectionPageContent,
	CollectionPageSchema,
	ContactPageContent,
	ContactPageSchema,
	ComponentContent,
	DetailPageContent,
	HomePageSchema,
	ItemImage,
	PageContent,
	PageType,
	PersonSchema,
	PostalAddressSchema,
	ReWriteRule,
	Schema,
	SchemaType,
	SculptureListItemSchema,
	SculptureSchema,
	Slug,
} from '@/model';

type SchemaGenerator = {
	schemaType: SchemaType;
	content: PageContent | ComponentContent;
	artist?: Artist | null;
	img?: ItemImage | null;
};

export async function generateSchema({ schemaType, content, artist = null, img = null }: SchemaGenerator): Promise<Schema> {
	//
	const { locale, baseUrl } = await fetchGlobalConfig();

	const baseSchema: BaseSchema = {
		'@context': 'https://schema.org',
		'@type': schemaType,
		inLanguage: locale,
	};

	let basePageSchema = {} as BasePageSchema;
	if ('type' in content) {
		basePageSchema = {
			name: content.title || 'Untitled',
			description: processPlainText(content.description),
			url: buildUrl(baseUrl, content.slug).href,
		};
	}

	switch (schemaType) {
		case SchemaType.HOME_PAGE: {
			const schema = {
				...baseSchema,
				...basePageSchema,
				about: artist ? generatePersonSchema(artist) : null,
			};
			return schema as HomePageSchema;
		}
		case SchemaType.ABOUT_PAGE: {
			const schema = {
				...baseSchema,
				...basePageSchema,
				mainEntity: generatePersonSchema(artist!),
			};
			return schema as AboutPageSchema;
		}
		case SchemaType.COLLECTION: {
			const collectionPageData = content as CollectionPageContent;
			let path: Slug = '/collectie';
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(baseUrl, collectionPageData.slug, path).href,
				mainEntity: collectionPageData.cards.map(
					(detailPage) =>
						({
							'@type': SchemaType.SCULPTURE,
							name: detailPage.title,
							description: processPlainText(detailPage.description),
							image: detailPage.imageCollection.items[0].url,
							url: buildUrl(baseUrl, detailPage.slug, ReWriteRule[PageType.DetailPage]).href,
						} as SculptureListItemSchema)
				),
			};
			return schema as CollectionPageSchema;
		}
		case SchemaType.POSTAL_ADDRESS: {
			const addressData = content as Address;
			const schema = {
				'@type': SchemaType.POSTAL_ADDRESS,
				streetAddress: addressData.streetAddress,
				addressLocality: addressData.city,
				postalCode: addressData.zipCode,
				addressCountry: addressData.country,
			};
			return schema as PostalAddressSchema;
		}
		case SchemaType.BREADCRUMBS: {
			const { parents, current } = content as Breadcrumbs;
			const schema = {
				'@type': SchemaType.BREADCRUMBS,
				itemListElement: [
					...parents.map((parent, i) => ({
						'@type': SchemaType.LIST_ITEM,
						position: i + 1,
						item: {
							'@id': baseUrl + '/' + parent,
							name: 'Parent',
						},
					})),
					{
						'@type': SchemaType.LIST_ITEM,
						position: parents.length + 1,
						item: {
							'@id': baseUrl + '/' + parents.join('/') + '/' + current,
							name: 'Current',
						},
					},
				],
			};
			return schema as BreadcrumbSchema;
		}
		case SchemaType.SCULPTURE: {
			const detailPageData = content as DetailPageContent;
			const dateCreated = detailPageData.creationDate ?? null;
			const material = detailPageData.material ?? null;
			const dimensions = detailPageData.dimensions ?? null;
			const image = img?.url ?? '';
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(baseUrl, detailPageData.slug, ReWriteRule[PageType.DetailPage]).href,
				image,
				creator: {
					'@type': SchemaType.PERSON,
					name: artist!.name,
				},
				...(dateCreated ? { dateCreated } : {}),
				...(material ? { material } : {}),
				...(dimensions ? { dimensions } : {}),
			};
			return schema as SculptureSchema;
		}
		case SchemaType.CONTACT_PAGE: {
			const contactPageData = content as ContactPageContent;
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(baseUrl, contactPageData.slug).href,
				contactPoint: {
					'@type': SchemaType.CONTACT_POINT,
					telephone: artist!.telephone,
					email: artist!.email,
				},
			};
			return schema as ContactPageSchema;
		}
		default:
			throw new Error('Unsupported schema type');
	}
}

function generatePersonSchema(data: Artist): PersonSchema {
	return {
		'@type': SchemaType.PERSON,
		name: data.name,
		description: data.description,
		sameAs: data.mentions?.join(',') || '',
	};
}
