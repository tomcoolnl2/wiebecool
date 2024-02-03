//

export enum SchemaType {
	PERSON = 'Person',
	ARTIST = 'Artist',
	SCULPTURE = 'Sculpture',
	PLACE = 'Place',
}

export interface BaseSchema {
	'@context': string;
	'@type': SchemaType;
	name: string;
	description: string;
	image: string;
	url: string;
	inLanguage: string;
}

export interface PersonSchema extends BaseSchema {
	'@type': SchemaType.PERSON;
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
}

export type Schema = ArtistSchema | SculptureSchema;
