import { Meta, StoryObj } from '@storybook/react';
import { BreadCrumbs } from '@/components';

const meta: Meta<typeof BreadCrumbs> = {
	title: 'Page/BreadCrumbs',
	component: BreadCrumbs,
	parameters: {
		layout: 'centered',
		viewport: {
			defaultViewport: 'responsive',
		},
	},
	argTypes: {
		path: {
			control: 'text',
			description: 'The path used to generate breadcrumbs',
			defaultValue: '/home/about/contact',
		},
	},
};

export default meta;

type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
	args: {
		path: '/contact',
	},
};

export const CustomPath: Story = {
	args: {
		path: '/werk/item',
	},
};
