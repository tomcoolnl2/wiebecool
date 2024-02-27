import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '@/components';

const props = {
	id: '1',
	href: 'https://example.com',
	title: 'Example Card',
	img: {
		url: 'https://example.com/image.jpg',
		title: 'Example Image',
		description: 'Example Card description',
		width: 300,
		height: 300,
		sys: {
			id: 'wc4ughpo',
		},
	},
	size: 300,
};

describe('Card Snapshot Test', () => {
	it('matches the snapshot', () => {
		const { container } = render(<Card {...props} />);
		expect(container).toMatchSnapshot();
	});
});

describe('Card Component', () => {
	it('renders card with correct properties', () => {
		const { getByText, getByAltText } = render(<Card {...props} />);
		expect(getByText('Example Card')).toBeInTheDocument();
		expect(getByAltText('Example Image')).toBeInTheDocument();
		expect(getByAltText('Example Image')).toHaveAttribute(
			'src',
			'/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg%3Fw%3D300%26h%3D300%26fm%3Djpg%26fl%3Dprogressive%26fit%3Dthumb&w=640&q=75'
		);
		expect(document.querySelector('a')).toHaveAttribute('href', 'https://example.com');
	});

	it('renders card with default size if size prop not provided', () => {
		const { getByAltText } = render(<Card {...props} />);
		expect(getByAltText('Example Image')).toHaveAttribute('width', '300');
		expect(getByAltText('Example Image')).toHaveAttribute('height', '300');
	});

	it("renders img alt atribute with Card's title if img title is falsy", () => {
		const updatedProps = {
			...props,
			img: {
				...props.img,
				title: '',
			},
		};
		const { getByAltText } = render(<Card {...updatedProps} />);
		expect(getByAltText('Example Card')).toBeInTheDocument();
	});
});
