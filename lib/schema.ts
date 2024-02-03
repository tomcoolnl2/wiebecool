import { BaseSchema, DetailPageResponse, ItemImage, PageType, ReWriteRule, Schema, SchemaType } from '@/model';
import { buildUrl, creator, locale, processPlainText } from '@/lib';

export function generateSchema(data: DetailPageResponse, img: ItemImage, schemaType: SchemaType): Schema {
	//
	const dateCreated = data.creationDate ?? null;
	const material = data.material ?? null;
	const dimensions = data.dimensions ?? null;
	const url = buildUrl(data.slug, ReWriteRule[PageType.DetailPage]);

	const baseSchema: BaseSchema = {
		'@context': 'https://schema.org',
		'@type': schemaType,
		name: data.title || 'Untitled',
		description: processPlainText(data.description),
		image: img.url,
		url: url.href,
		inLanguage: locale,
	};

	switch (schemaType) {
		case SchemaType.SCULPTURE:
			return {
				...baseSchema,
				creator: {
					'@type': SchemaType.PERSON,
					name: creator.name,
				},
				...(dateCreated ? { dateCreated } : {}),
				...(material ? { material } : {}),
				...(dimensions ? { dimensions } : {}),
			};
		// case 'Artist':
		//   return {
		// 	...baseSchema,
		// 	birthDate: creator.birthDate,
		// 	deathDate: creator.deathDate,
		// 	birthPlace: creator.birthPlace,
		// 	worksFor: creator.worksFor,
		// 	// Add other artist-specific properties here
		//   };
		default:
			throw new Error('Unsupported schema type');
	}
}
