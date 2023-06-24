const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Anuphan', 'sans-serif']
			}
		}
	},

	plugins: [require('@tailwindcss/line-clamp'), daisyui]
};

module.exports = config;
