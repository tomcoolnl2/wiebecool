import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
//@ts-ignore
global.TextDecoder = TextDecoder;

const testCache = <T extends Function>(func: T) => func;

jest.mock('react', () => {
	const originalModule = jest.requireActual('react');
	return {
		...originalModule,
		cache: testCache,
	};
});

jest.mock('@contentful/rich-text-react-renderer', () => ({
	documentToReactComponents: jest.fn(),
}));

jest.mock('@contentful/rich-text-plain-text-renderer', () => ({
	documentToPlainTextString: jest.fn(),
}));
