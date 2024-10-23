import { Meta, StoryObj } from '@storybook/react';
import { CollectionControls } from '@/components/CollectionControls';
import { OrderType } from '@/model';
import '@/css/pages/collection-page.css';

// Sample tag data for the story
const tags = [
	{ id: '1', name: 'Steen' },
	{ id: '2', name: 'Portretten' },
	{ id: '3', name: 'Hout' },
];

const meta: Meta<typeof CollectionControls> = {
	title: 'Components/CollectionControls',
	component: CollectionControls,
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '600px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;

type Story = StoryObj<typeof CollectionControls>;

export const Default: Story = {
	args: {
		path: '/collection',
		tags: tags,
		sortOrder: OrderType.PAGE_TITLE_ASC,
		filter: '3',
		sortingEnabled: true,
		allowSorting: true,
		filteringEnabled: true,
	},
};

export const NoSorting: Story = {
	args: {
		path: '/collection',
		tags: tags,
		sortOrder: null,
		filter: '2',
		sortingEnabled: false,
		allowSorting: false,
		filteringEnabled: true,
	},
};

export const NoFiltering: Story = {
	args: {
		path: '/collection',
		tags: tags,
		sortOrder: OrderType.PAGE_TITLE_DESC,
		filter: null,
		sortingEnabled: true,
		allowSorting: true,
		filteringEnabled: false,
	},
};

export const NoSortingNoFiltering: Story = {
	args: {
		path: '/collection',
		tags: tags,
		sortOrder: null,
		filter: null,
		sortingEnabled: false,
		allowSorting: true,
		filteringEnabled: false,
	},
};
