import { featureFlags } from '$lib/featureFlags';
import type { Action, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project/edit/step-3-abstract');
	if (session?.user?.user_metadata?.role !== 'student-team-contact')
		throw redirect(303, '/dashboard');
	if (!featureFlags.openForUploadArticle) throw redirect(303, '/submission-closed');
}) satisfies PageServerLoad;
