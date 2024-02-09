import {
	AboutPage,
	AboutPageSchema,
	Address,
	Artist,
	BasePageSchema,
	BaseSchema,
	BreadcrumbSchema,
	Breadcrumbs,
	CollectionPage,
	CollectionPageSchema,
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
	SculptureListItemSchema,
	SculptureSchema,
	Slug,
} from '@/model';
import { baseUrl, buildUrl, artist, locale, processPlainText } from '@/lib';

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
		case SchemaType.COLLECTION: {
			const collectionPageData = data as CollectionPage;
			let path: Slug = '/collectie';
			const schema = {
				...baseSchema,
				...basePageSchema,
				url: buildUrl(collectionPageData.slug, path).href,
				mainEntity: collectionPageData.collection.map(
					(detailPage) =>
						({
							'@type': SchemaType.SCULPTURE,
							name: detailPage.title,
							description: processPlainText(detailPage.description),
							image: detailPage.imageCollection.items[0].url,
							url: buildUrl(detailPage.slug, ReWriteRule[PageType.DetailPage]).href,
						} as SculptureListItemSchema)
				),
			};
			return schema as CollectionPageSchema;
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
		case SchemaType.BREADCRUMBS: {
			const { parents, current } = data as Breadcrumbs;
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
					name: artist.name,
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
