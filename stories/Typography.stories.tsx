// Typography.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
	title: 'Design System/Typography',
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const Headings: Story = {
	render: () => (
		<div>
			<h1 className="page-header-title">This is an H1 heading</h1>
			<h2>This is an H2 heading</h2>
			<h3>This is an H3 heading</h3>
			<h4>This is an H4 heading</h4>
			<h5>This is an H5 heading</h5>
			<h6>This is an H6 heading</h6>
		</div>
	),
};

export const Paragraphs: Story = {
	render: () => (
		<div>
			<p>This is a paragraph of text. It demonstrates how the global paragraph styling looks.</p>
			<p>Another paragraph with additional text to show multiple paragraphs in the same story.</p>
		</div>
	),
};
