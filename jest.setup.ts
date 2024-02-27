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
