import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals: { getSession, supabase } }) => {
	return {
		userSessionDatafromServer: await getSession()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals: { getSession, role } }) => {
		const session = await getSession();
		if (!session) return fail(401);
	}
};
