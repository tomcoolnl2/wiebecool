import type { Meta, StoryObj } from '@storybook/react';
import { ShareInstagram } from '../components/ShareInstagram';

const meta = {
	title: 'Components/ShareInstagram',
	component: ShareInstagram,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof ShareInstagram>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	args: {
		size: 'sm',
	},
};

// Large size variant
export const Large: Story = {
	args: {
		size: 'lg',
	},
};

// Extra large size variant
export const ExtraLarge: Story = {
	args: {
		size: '2xl',
	},
};
