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

	plugins: [daisyui]
};

module.exports = config;
