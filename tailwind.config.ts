import type { Config } from 'tailwindcss';

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
				'curious-blue': {
					'50': '#f2f8fd',
					'100': '#e3effb',
					'200': '#c1dff6',
					'300': '#8ac5ef',
					'400': '#4ca7e4',
					'500': '#3498db',
					'600': '#176fb2',
					'700': '#145990',
					'800': '#144c78',
					'900': '#164064',
					'950': '#0f2942',
				},
			},
			aspectRatio: {
				'3/4': '3 / 4',
				banner: '16 / 6',
				portrait: '9 / 16',
			},
		},
	},
	plugins: [],
};
export default config;
