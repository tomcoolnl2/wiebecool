import {
	baseUrl,
	capitalize,
	buildUrl,
	generateGoogleMapsAddress,
	processRichText,
	processPlainText,
	formatPrice,
	ensureLeadingSlash,
	toLocaleDateString,
	validateContactForm,
	formatSearchParams,
} from '@/lib/utils';
import { OrderType, Slug } from '@/model';
import { mockRichTextParagraph, mockRichTextWithHyperLink } from '../mocks/contentfulMocks';

describe('capitalize function', () => {
	test('capitalizes the first letter of a word', () => {
		expect(capitalize('hello')).toBe('Hello');
		expect(capitalize('world')).toBe('World');
	});

	test('does not change already capitalized words', () => {
		expect(capitalize('Hello')).toBe('Hello');
		expect(capitalize('World')).toBe('World');
	});

	test('handles empty string', () => {
		expect(capitalize('')).toBe('');
	});

	test('handles single-letter string', () => {
		expect(capitalize('a')).toBe('A');
		expect(capitalize('z')).toBe('Z');
	});
});

describe('buildUrl function', () => {
	test('constructs a URL with only a slug', () => {
		const slug = 'example-slug';
		const expectedUrl = new URL(`/${slug}`, baseUrl);
		expect(buildUrl(slug as Slug)).toEqual(expectedUrl);
	});

	test('constructs a URL with a slug and path', () => {
		const slug = 'example-slug';
		const path = '/example-path/';
		const expectedUrl = new URL(`${path}${slug}`, baseUrl);
		expect(buildUrl(slug as Slug, path)).toEqual(expectedUrl);
	});

	test('handles empty path', () => {
		const slug = 'example-slug';
		const expectedUrl = new URL(`/${slug}`, baseUrl);
		expect(buildUrl(slug as Slug, '')).toEqual(expectedUrl);
	});

	test('handles empty slug', () => {
		const slug = '';
		const path = '/example-path/';
		const expectedUrl = new URL(`${path}${slug}`, baseUrl);
		expect(buildUrl(slug as Slug, path)).toEqual(expectedUrl);
	});
});

describe('generateGoogleMapsAddress function', () => {
	test('generates a Google Maps address string correctly', () => {
		const address = {
			streetAddress: '123 Example St',
			zipCode: '12345',
			city: 'Exampleville',
			country: 'Exampleland',
		};

		const expectedAddressString = '123 Example St+12345+Exampleville+,Exampleland';
		expect(generateGoogleMapsAddress(address)).toEqual(expectedAddressString);
	});

	test('handles special characters in address fields', () => {
		const address = {
			streetAddress: '456 Special St',
			zipCode: '54321',
			city: 'Specialville',
			country: 'Special&Land',
		};

		const expectedAddressString = '456 Special St+54321+Specialville+,Special&Land';
		expect(generateGoogleMapsAddress(address)).toEqual(expectedAddressString);
	});

	test('handles empty fields', () => {
		const address = {
			streetAddress: '',
			zipCode: '',
			city: '',
			country: '',
		};

		const expectedAddressString = '+++,';
		expect(generateGoogleMapsAddress(address)).toEqual(expectedAddressString);
	});
});

describe('processRichText function', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders rich text with hyperlinks', () => {
		const mockReactComponents = <div>Mocked React Components</div>;
		require('@contentful/rich-text-react-renderer').documentToReactComponents.mockReturnValue(mockReactComponents);
		const renderedComponents = processRichText(mockRichTextWithHyperLink);
		expect(renderedComponents).toEqual(mockReactComponents);
		expect(require('@contentful/rich-text-react-renderer').documentToReactComponents).toHaveBeenCalledWith(
			mockRichTextWithHyperLink,
			expect.any(Object)
		);
	});
});

describe('processPlainText function', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('returns plain text content from rich text', () => {
		require('@contentful/rich-text-plain-text-renderer').documentToPlainTextString.mockReturnValue('Hello world');
		const result = processPlainText(mockRichTextParagraph);
		expect(result).toEqual('Hello world');
		expect(require('@contentful/rich-text-plain-text-renderer').documentToPlainTextString).toHaveBeenCalledWith(
			mockRichTextParagraph
		);
	});
});

describe('formatPrice function', () => {
	test('formats a valid price string correctly', () => {
		const input = '1000';
		const expectedOutput = '€\xa01.000,00';
		expect(formatPrice(input)).toBe(expectedOutput);
	});

	test('returns input unchanged if it cannot be parsed as a number', () => {
		const input = 'invalid';
		expect(formatPrice(input)).toBe(input);
	});

	test('returns input unchanged if it is an empty string', () => {
		const input = '';
		expect(formatPrice(input)).toBe(input);
	});

	test('handles negative numbers correctly', () => {
		const input = '-1000';
		const expectedOutput = '€\xa0-1.000,00';
		expect(formatPrice(input)).toBe(expectedOutput);
	});

	test('handles decimal numbers correctly', () => {
		const input = '1234.56';
		const expectedOutput = '€\xa01.234,56';
		expect(formatPrice(input)).toBe(expectedOutput);
	});
});

describe('ensureLeadingSlash function', () => {
	test('adds leading slash if not present', () => {
		const input = 'example';
		const expectedOutput = '/example';
		expect(ensureLeadingSlash(input)).toBe(expectedOutput);
	});

	test('does not add leading slash if already present', () => {
		const input = '/example';
		expect(ensureLeadingSlash(input)).toBe(input);
	});

	test('returns empty string if input is empty', () => {
		const input = '';
		expect(ensureLeadingSlash(input)).toBe('/');
	});
});

describe('toLocaleDateString function', () => {
	test('converts date string to a localized date string', () => {
		const dateString = '2023-12-15T00:00:00Z';
		const expectedOutput = '15 December 2023';
		expect(toLocaleDateString(dateString)).toBe(expectedOutput);
	});

	test('handles invalid date string', () => {
		const dateString = 'invalid date';
		const expectedOutput = 'Invalid Date undefined';
		expect(toLocaleDateString(dateString)).toBe(expectedOutput);
	});

	test('handles empty date string', () => {
		const dateString = '';
		const expectedOutput = 'Invalid Date undefined';
		expect(toLocaleDateString(dateString)).toBe(expectedOutput);
	});
});

describe('validateContactForm function', () => {
	test('returns error if name is missing', () => {
		const formData = new FormData();
		formData.append('email', 'test@example.com');
		formData.append('message', 'Test message');
		const expectedOutput = { type: 'error', message: 'Vul een naam in.' };
		expect(validateContactForm(formData)).toEqual(expectedOutput);
	});

	test('returns error if email is invalid', () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'invalid email');
		formData.append('message', 'Test message');
		const expectedOutput = { type: 'error', message: 'Verkeerd email adres.' };
		expect(validateContactForm(formData)).toEqual(expectedOutput);
	});

	test('returns error if message is missing', () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'test@example.com');
		const expectedOutput = { type: 'error', message: 'Vul een vraag in.' };
		expect(validateContactForm(formData)).toEqual(expectedOutput);
	});

	test('returns success if all fields are valid', () => {
		const formData = new FormData();
		formData.append('name', 'John Doe');
		formData.append('email', 'test@example.com');
		formData.append('message', 'Test message');
		const expectedOutput = { type: 'success', message: 'Passed.' };
		expect(validateContactForm(formData)).toEqual(expectedOutput);
	});
});

describe('formatSearchParams function', () => {
	test('formats search parameters with order', () => {
		const order = OrderType.PAGE_TITLE_ASC;
		const expectedOutput = '?order=a-z';
		expect(formatSearchParams(order, null)).toBe(expectedOutput);
	});

	test('formats search parameters with filter', () => {
		const filter = 'keyword';
		const expectedOutput = '?filter=keyword';
		expect(formatSearchParams(null, filter)).toBe(expectedOutput);
	});

	test('formats search parameters with both order and filter', () => {
		const order = OrderType.PAGE_TITLE_DESC;
		const filter = 'keyword';
		const expectedOutput = '?order=z-a&filter=keyword';
		expect(formatSearchParams(order, filter)).toBe(expectedOutput);
	});

	test('returns empty string if both order and filter are null', () => {
		const expectedOutput = '';
		expect(formatSearchParams(null, null)).toBe(expectedOutput);
	});
});
