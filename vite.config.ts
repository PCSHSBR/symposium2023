import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv-vault-core'

dotenv.config();

export default defineConfig({
	plugins: [sveltekit()]
});
