import { Meta, StoryObj } from '@storybook/react';
import { CookieBar, cookieKey } from '../components/CookieBar';
import { deleteCookie } from 'cookies-next';

const meta = {
	title: 'Components/CookieBar',
	component: CookieBar,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof CookieBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		deleteCookie(cookieKey);
		return <CookieBar />;
	},
};
