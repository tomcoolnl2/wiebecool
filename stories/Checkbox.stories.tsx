import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Checkbox } from '../components/Checkbox';

const meta = {
	title: 'Components/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
		disabled: { control: 'boolean' },
		checked: { control: 'boolean' },
	},
	args: {
		onChange: fn(),
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
	args: {
		size: 'small',
		checked: false,
		disabled: false,
	},
};

export const Medium: Story = {
	args: {
		size: 'medium',
		checked: false,
		disabled: false,
	},
};
export const Large: Story = {
	args: {
		size: 'large',
		checked: false,
		disabled: false,
	},
};
