import type { PageServerLoad } from './$types';
import { roleCheck } from '$lib/guards';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession, supabase } }) => {
	await supabase.auth.refreshSession();
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/account');
}) satisfies PageServerLoad;
