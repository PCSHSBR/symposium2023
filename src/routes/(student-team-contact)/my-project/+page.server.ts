import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession, role, supabase } }) => {
	const session = await getSession();
	if (!session || (await role()) !== 'student-team-contact') throw redirect(303, '/dashboard'); // actually redirect to /login?redirect=/dashboard
	return {};
};
