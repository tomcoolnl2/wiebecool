import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from '@/components';

describe('Alert Snapshot Test', () => {
	it('matches the snapshot', () => {
		const container = render(<Alert type="success" message="Test Message" />);
		expect(container).toMatchSnapshot();
	});
});

describe('Alert Component', () => {
	it('renders with the correct message', () => {
		const message = 'Test Message';
		const { getByRole } = render(<Alert type="success" message={message} />);
		expect(getByRole('alert')).toHaveTextContent(message);
	});

	it('applies the correct type class', () => {
		const { container } = render(<Alert type="error" message="Error Message" />);
		expect(container.firstChild).toHaveClass('alert error');
	});
});
