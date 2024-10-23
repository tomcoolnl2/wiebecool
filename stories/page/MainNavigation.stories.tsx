import { Meta, StoryObj } from '@storybook/react';
import { MainNavigation } from '@/components';
import { mockMainNavigation } from '@/mock/data';

const meta: Meta<typeof MainNavigation> = {
	title: 'Page/MainNavigation',
	component: MainNavigation,
	parameters: {
		layout: 'desktop',
		viewport: {
			defaultViewport: 'responsive',
		},
	},
};

export default meta;

type Story = StoryObj<typeof MainNavigation>;

export const DesktopView: Story = {
	args: {
		title: 'Main Navigation',
		navigation: mockMainNavigation,
	},
	parameters: {
		viewport: {
			defaultViewport: 'desktop',
		},
	},
};

export const MobileView: Story = {
	args: {
		title: 'Main Navigation',
		navigation: mockMainNavigation,
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile2',
		},
	},
};
