import { type Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	mode: 'jit',
	future: {
		hoverOnlyWhenSupported: true,
	},
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			fontFamily: {
				montserrat: 'var(--font-montserrat), sans-serif',
				mulish: 'var(--font-mulish), sans-serif',
				poppins: 'var(--font-poppins), sans-serif',
			},
			colors: {
				'buddha-gold': {
					'50': '#fcfde9',
					'100': '#fafcc5',
					'200': '#f9fa8e',
					'300': '#f6f04e',
					'400': '#f1e11e',
					'500': '#e1c911',
					'600': '#b7950b',
					'700': '#9b730d',
					'800': '#805b13',
					'900': '#6d4a16',
					'950': '#402708',
				},
			},
			aspectRatio: {
				'3/4': '3 / 4',
				banner: '16 / 6',
				portrait: '9 / 16',
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'text-shadow': (value) => ({
						textShadow: value,
					}),
				},
				{ values: theme('textShadow') }
			);
		}),
	],
};
export default config;
