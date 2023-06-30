import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');
	const redirect_to = url.searchParams.get('redirect');
	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, redirect_to || '/');
}) satisfies RequestHandler;
