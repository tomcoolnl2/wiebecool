import { Address, Artist } from '@/model';

export const mockAddress: Address = {
	streetAddress: '123 Maple Street',
	zipCode: '10001',
	city: 'New York',
	country: 'USA',
};

export const mockArtist: Artist = {
	name: 'Alice Johnson',
	occupation: 'Painter',
	description: 'Specializes in abstract art using mixed media.',
	telephone: '+1-555-1234',
	email: 'alice.johnson@example.com',
	mentions: ["Featured in the Modern Art Museum's 2023 collection.", 'Recipient of the Art Innovator Award 2022.', 'Interviewed by Art Daily.'],
};
