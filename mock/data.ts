import { Address, Artist, ItemImage, NavigationPageEntry, PageType } from '@/model';

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
	telephone: '0031612345678',
	email: 'alice.johnson@example.com',
	mentions: ["Featured in the Modern Art Museum's 2023 collection.", 'Recipient of the Art Innovator Award 2022.', 'Interviewed by Art Daily.'],
};

export const mockImage: ItemImage = {
	url: 'https://via.placeholder.com/300',
	title: 'Sample Image',
	description: 'Description',
	width: 300,
	height: 300,
	sys: { id: '1' },
};

export const mockMainNavigation: NavigationPageEntry[] = [
	{
		name: 'Home',
		page: { slug: 'home', sys: { id: '1' }, __typename: PageType.HomePage },
		subNavigation: [],
	},
	{
		name: 'About',
		page: { slug: 'about', sys: { id: '2' }, __typename: PageType.AboutPage },
		subNavigation: [],
	},
	{
		name: 'Collection',
		page: { slug: 'collection', sys: { id: '3' }, __typename: PageType.CollectionPage },
		subNavigation: [
			{
				name: 'Sculpture 1',
				page: { slug: 'detailpage1', sys: { id: '4' }, __typename: PageType.DetailPage },
				subNavigation: [],
			},
			{
				name: 'Sculpture 2',
				page: { slug: 'detailpage2', sys: { id: '5' }, __typename: PageType.DetailPage },
				subNavigation: [],
			},
		],
	},
	{
		name: 'Contact',
		page: { slug: 'contact', sys: { id: '6' }, __typename: PageType.ContactPage },
		subNavigation: [],
	},
];
