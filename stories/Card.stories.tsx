import { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/Card';
import { mockImage } from '@/mock/data';

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		id: '1',
		href: '/sample-path',
		title: 'Sample Card Title',
		img: mockImage,
		size: 300,
	},
	render: (args) => (
		<div style={{ width: '300px' }}>
			<Card {...args} />
		</div>
	),
};

export const PortfolioCards: Story = {
	args: {
		id: '1',
		href: '/sample-path',
		title: 'Sample Card Title',
		img: mockImage,
		size: 300,
	},
	render: (args) => (
		<div className="portfolio-cards" style={{ width: '400px' }}>
			<Card {...args} />
			<Card {...args} />
		</div>
	),
};
