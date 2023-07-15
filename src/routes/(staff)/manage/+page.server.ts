import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	if (!(await getSession())) throw redirect(300, '/login?redirect=/manage');
	return {};
};
