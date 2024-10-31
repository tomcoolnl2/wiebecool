import type { Meta, StoryObj } from '@storybook/react';
import { ShareSocials } from '../components/ShareSocials';
import { mockArtist } from '@/mock/data';

const meta = {
	title: 'Components/ShareSocials',
	component: ShareSocials,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ShareSocials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Amazing Art Piece',
		url: 'https://example.com/art-piece',
		media: 'https://example.com/image.jpg',
		tags: ['Art', 'Sculpture'],
		showFacebook: true,
		showTwitter: true,
		showPinterest: true,
		artist: mockArtist,
	},
};

export const WithoutFacebook: Story = {
	args: {
		...Default.args,
		showFacebook: false,
	},
};

export const WithoutTwitter: Story = {
	args: {
		...Default.args,
		showTwitter: false,
	},
};

export const WithoutPinterest: Story = {
	args: {
		...Default.args,
		showPinterest: false,
	},
};
