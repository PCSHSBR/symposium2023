import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { partytownVite } from '@builder.io/partytown/utils';
import { join } from 'path';

export default defineConfig({
	plugins: [
		sveltekit(),
		// Put the Sentry vite plugin after all other plugins
		sentryVitePlugin({
			org: process.env.SENTRY_ORG,
			project: process.env.SENTRY_PROJECT,

			// Auth tokens can be obtained from https://sentry.io/settings/account/api/auth-tokens/
			// and need `project:releases` and `org:read` scopes
			authToken: process.env.SENTRY_AUTH_TOKEN
		}),
		partytownVite({
			dest: join(process.cwd(), '.svelte-kit/output/client/~partytown')
		})
	],

	build: {
		sourcemap: true // Source map generation must be turned on
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});
