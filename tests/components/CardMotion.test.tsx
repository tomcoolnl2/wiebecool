import '@testing-library/jest-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { CardMotion } from '@/components';

const props = {
	delay: 0,
	card: <div>Test Card</div>,
};

describe('Card Snapshot Test', () => {
	it('matches the snapshot', () => {
		const { container } = render(<CardMotion {...props} />);
		expect(container).toMatchSnapshot();
	});
});

describe('Card Component', () => {
	it('renders card with motion effects', async () => {
		const { container } = render(<CardMotion {...props} />);
		await waitFor(() => {
			const motionDiv = container.querySelector('[style="opacity: 1;"]');
			expect(motionDiv).toBeInTheDocument();
		});
	});
});
