import type { Config } from 'tailwindcss';

const config: Config = {
	mode: 'jit',
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
			aspectRatio: {
				'3/4': '3 / 4',
			},
		},
	},
	plugins: [],
};
export default config;
