import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/Alert';
import { AlertMessageType } from '@/model';

const meta = {
	title: 'Components/Alert',
	component: Alert,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		type: { control: { type: 'select', options: ['success', 'error'] } },
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
	render: ({ type, message }) => (
		<div style={{ width: '50vw' }}>
			<Alert type={type} message={message} />
		</div>
	),
};

export const Error: Story = {
	args: {
		type: AlertMessageType.ERROR,
		message: 'This is a error message',
	},
	render: ({ type, message }) => (
		<div style={{ width: '50vw' }}>
			<Alert type={type} message={message} />
		</div>
	),
};
