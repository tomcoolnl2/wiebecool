import { Meta, StoryObj } from '@storybook/react';
import { ContactDetails, Props } from '../components/ContactDetails';
import { mockArtist } from '@/mock/data';

const meta = {
	title: 'Components/ContactDetails',
	component: ContactDetails,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		showInsta: { control: 'boolean' },
		showAddress: { control: 'boolean' },
		showCTAs: { control: 'boolean' },
		subject: { control: 'text' },
	},
} satisfies Meta<Props>;

export default meta;
type Story = StoryObj<Props>;

export const Default: Story = {
	args: {
		showInsta: false,
		showAddress: true,
		showCTAs: true,
		subject: 'Inquiry about Artworks',
		artist: mockArtist,
	},
};

export const WithInstagram: Story = {
	args: {
		showInsta: true,
		showAddress: true,
		showCTAs: true,
		subject: 'Contact Regarding Collaboration',
		artist: mockArtist,
	},
};

export const CallToActions: Story = {
	args: {
		showInsta: false,
		showAddress: false,
		showCTAs: true,
		subject: 'No Address Example',
		artist: mockArtist,
	},
};

export const Address: Story = {
	args: {
		showInsta: false,
		showAddress: true,
		showCTAs: false,
		subject: 'No Contact Methods Example',
		artist: mockArtist,
	},
};

export const Centered: Story = {
	args: {
		showInsta: true,
		showAddress: true,
		showCTAs: false,
		subject: 'Centerer Example',
		artist: mockArtist,
		className: 'text-center',
	},
};
