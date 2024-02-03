//

export enum SchemaType {
	HOME_PAGE = 'WebPage',
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

export interface HomePageSchema extends BaseSchema {
	'@type': SchemaType.HOME_PAGE;
	url: string;
	about: {
		'@type': SchemaType.PERSON;
		name: string;
		description: string;
		image?: string;
		sameAs: string;
	};
}

export interface SculptureSchema extends BaseSchema {
	url: string;
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
	url: string;
	contactPoint: {
		'@type': SchemaType.CONTACT_POINT;
		telephone: string;
		email: string;
	};
}

export type Schema = HomePageSchema | ArtistSchema | SculptureSchema | ContactPageSchema | PostalAddressSchema;
