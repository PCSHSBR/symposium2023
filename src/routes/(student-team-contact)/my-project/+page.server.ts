import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession, role, supabase } }) => {
	const session = await getSession();
	if (!session || (await role()) !== 'student-team-contact') throw redirect(303, '/dashboard'); // actually redirect to /login?redirect=/dashboard
	const { data: projectStatus, error: projectStatusError } = await supabase
		.from('project_status')
		.select('*')
		.eq('team_contact_user_id', session.user.id)
		.limit(1)
		.single();
	return {
		projectStatus: projectStatus
	};
};
