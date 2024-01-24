import type { Config } from 'tailwindcss';

const config: Config = {
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
		},
	},
	plugins: [],
};
export default config;
