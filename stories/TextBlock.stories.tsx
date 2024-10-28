import type { Meta, StoryObj } from '@storybook/react';
import { TextBlock } from '../components/TextBlock';

const meta = {
	title: 'Components/TextBlock',
	component: TextBlock,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof TextBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		item: {
			__typename: 'TextBlock',
			title: 'Sample Title',
			description: {
				json: {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							content: [
								{
									nodeType: 'text',
									value: 'This is a sample description text processed from rich text.',
									marks: [],
									data: {},
								},
							],
						},
					],
				},
			},
		},
	},
};

export const WithoutTitle: Story = {
	args: {
		item: {
			__typename: 'TextBlock',
			title: null, // No title provided
			description: {
				json: {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							content: [
								{
									nodeType: 'text',
									value: 'This description has no title but is still processed correctly.',
									marks: [],
									data: {},
								},
							],
						},
					],
				},
			},
		},
	},
};

export const WithAdditionalContent: Story = {
	args: {
		item: {
			__typename: 'TextBlock',
			title: 'Another Sample Title',
			description: {
				json: {
					nodeType: 'document',
					data: {},
					content: [
						{
							nodeType: 'paragraph',
							content: [
								{
									nodeType: 'text',
									value: 'This description includes multiple paragraphs.',
									marks: [],
									data: {},
								},
							],
						},
						{
							nodeType: 'paragraph',
							content: [
								{
									nodeType: 'text',
									value: 'Here is the second paragraph, providing more information.',
									marks: [],
									data: {},
								},
							],
						},
					],
				},
			},
		},
	},
};
