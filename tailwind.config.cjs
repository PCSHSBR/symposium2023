const daisyui = require('daisyui');
const neasting = require('postcss-nesting');
const gridAreas = require('@savvywombat/tailwindcss-grid-areas');
const tailwindDefault = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontSize: {
				sm: ['0.875rem', { lineHeight: '1.5rem' }],
				base: ['1rem', { lineHeight: '1.6rem' }],
			},
			fontFamily: {
				mono: ['iA Writer Mono', ...tailwindDefault.fontFamily.mono],
				display: ['Anuphan Variable', ...tailwindDefault.fontFamily.sans]
			},
			screens: {
				xs: '400px'
			}
		}
	},

	plugins: [daisyui, neasting]
};

module.exports = config;
