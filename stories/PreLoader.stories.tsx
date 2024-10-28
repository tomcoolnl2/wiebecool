import type { Meta, StoryObj } from '@storybook/react';
import { PreLoader } from '../components/PreLoader';

const meta = {
	title: 'Components/PreLoader',
	component: PreLoader,
	parameters: {
		layout: 'fullscreen',
	},
} satisfies Meta<typeof PreLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story (non-mobile view)
export const Default: Story = {
	render: () => <PreLoader />,
};

// Mobile version (simulating a mobile view)
export const Mobile: Story = {
	render: () => {
		return (
			<div style={{ display: 'none' }}>
				<PreLoader />
			</div>
		);
	},
};
