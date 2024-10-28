import { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@/components/Carousel';
import '@/css/components/carousel.css';
import { mockCarouselData } from '@/mock/data';

const meta: Meta<typeof Carousel> = {
	title: 'Components/Carousel',
	component: Carousel,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
	args: mockCarouselData,
};

export const NoDescriptionCarousel: Story = {
	args: {
		...mockCarouselData,
		showDescription: false,
		description: undefined,
	},
};

export const OneImageCarousel: Story = {
	args: {
		...mockCarouselData,
		imageCollection: {
			items: mockCarouselData.imageCollection.items.slice(0, 1),
		},
	},
};
