import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession, supabase } }) => {
	return {
		userSessionDatafromServer: await getSession()
	};
}) satisfies PageServerLoad;
