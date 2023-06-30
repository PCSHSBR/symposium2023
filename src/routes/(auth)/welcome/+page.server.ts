import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { role, getSession } }) => {
	const session = await getSession();
	if (!session) throw error(401, 'Unauthorized');
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals: { getSession, supabase }, request }) => {
		// check session
		const session = await getSession();
		if (!session) throw error(401, 'Unauthorized');
		const formData = Object.fromEntries(await request.formData());
		const { error, } = await supabase.auth.updateUser
	}
} satisfies Actions;
