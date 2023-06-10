import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	console.log('code', code);
	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, '/');
}) satisfies RequestHandler;
