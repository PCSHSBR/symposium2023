const daisyui = require('daisyui');
const neasting = require('postcss-nesting');

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

	plugins: [daisyui, neasting]
};

module.exports = config;
