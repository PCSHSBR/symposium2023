import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { roleCheck } from '$lib/guards';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project');
	roleCheck(session, 'student-team-contact', '/auth');
}) satisfies LayoutServerLoad;
