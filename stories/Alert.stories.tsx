import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/Alert';
import { AlertMessageType } from '@/model';

const meta = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		type: { control: { type: 'select', options: Object.values(AlertMessageType) } },
		message: { control: 'text' },
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		type: AlertMessageType.SUCCESS,
		message: 'This is a success message',
	},
};

export const Error: Story = {
	args: {
		type: AlertMessageType.ERROR,
		message: 'This is a error message',
	},
};
