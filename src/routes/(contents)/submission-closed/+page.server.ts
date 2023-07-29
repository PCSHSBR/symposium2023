import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { featureFlags } from '$lib/featureFlags';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session?.user) throw redirect(303, '/');
	if (session.user.user_metadata.role !== 'student-team-contact') throw redirect(303, '/auth');
	if (
		featureFlags.openForRegistrationAndEditProject ||
		featureFlags.openForUploadAbstract ||
		featureFlags.openForUploadArticle
	)
		throw redirect(303, '/my-project');
};
