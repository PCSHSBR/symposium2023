import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession, role, supabase }, url }) => {
	const session = await getSession();
	if (!session) {
		const code = url.searchParams.get('code');
		const redirect_to = url.searchParams.get('redirect');
		if (code) {
			await supabase.auth.exchangeCodeForSession(code);
		}

		throw redirect(303, redirect_to || '/');
	}
	return {
		session: session,
		role: (await role()) || 'anon'
	};
}) satisfies LayoutServerLoad;
