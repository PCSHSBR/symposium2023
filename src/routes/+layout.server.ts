import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession, role, supabase }, url }) => {
	const session = await getSession();
	const code = url.searchParams.get('code');
	// const redirect_to = url.searchParams.get('redirect');
	// if (code) {
	// 	const { data, error } = await supabase.auth.exchangeCodeForSession(code);
	// }
	// if (redirect_to) throw redirect(303, redirect_to || '/');

	return {
		session: session,
		role: (await role()) || 'anon',
		user_metadata: session?.user?.user_metadata
	};
}) satisfies LayoutServerLoad;
