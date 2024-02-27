import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Background } from '@/components';

describe('Background Snapshot Test', () => {
	it('matches the snapshot', () => {
		const { container } = render(<Background />);
		expect(container).toMatchSnapshot();
	});
});
