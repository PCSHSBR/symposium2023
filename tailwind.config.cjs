const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				display: ['Anuphan', 'sans-serif']
			},
			screens: {
				xs: '400px'
			}
		}
	},

	plugins: [daisyui]
};

module.exports = config;
