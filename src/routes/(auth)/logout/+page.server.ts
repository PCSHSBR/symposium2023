import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/');
	const { error: supabaseError } = await supabase.auth.signOut();
	if (supabaseError) throw error(503, supabaseError.message);
	throw redirect(303, '/');
}) satisfies PageServerLoad;
