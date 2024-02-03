//

export enum SchemaType {
	PERSON = 'Person',
	ARTIST = 'Artist',
	SCULPTURE = 'Sculpture',
	PLACE = 'Place',
	CONTACT_PAGE = 'ContactPage',
	POSTAL_ADDRESS = 'PostalAddress',
	CONTACT_POINT = 'ContactPoint',
}

export interface BaseSchema {
	'@context': string;
	'@type': SchemaType;
	inLanguage: string;
}

export interface BasePageSchema {
	name: string;
	description: string;
	url: string;
}

export interface PersonSchema extends BaseSchema {
	'@type': SchemaType.PERSON;
	name: string;
}

export interface ArtistSchema extends BaseSchema {
	'@type': SchemaType.ARTIST;
	birthDate?: string;
	birthPlace?: {
		'@type': SchemaType.PLACE;
		name: string;
	};
}

export interface SculptureSchema extends BaseSchema {
	creator: Partial<PersonSchema>;
	dateCreated?: string | null;
	material?: string | null;
	dimensions?: string | null;
	image: string;
}

export interface PostalAddressSchema {
	'@type': SchemaType.POSTAL_ADDRESS;
	streetAddress: string;
	addressLocality: string;
	postalCode: string;
	addressCountry: string;
}

export interface ContactPageSchema extends BaseSchema {
	'@type': SchemaType.CONTACT_PAGE;
	contactPoint: {
		'@type': SchemaType.CONTACT_POINT;
		telephone: string;
		email: string;
	};
}

export type Schema = ArtistSchema | SculptureSchema | ContactPageSchema | PostalAddressSchema;
