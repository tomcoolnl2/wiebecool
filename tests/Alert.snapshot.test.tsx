import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '@/components';

describe('Alert Snapshot Test', () => {
	it('matches the snapshot', () => {
		const tree = render(<Alert type="success" message="Test Message" />);
		expect(tree).toMatchSnapshot();
	});
});
