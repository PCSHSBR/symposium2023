import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { getSession, role } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project');
	if (await role() !== 'student-team-contact') throw redirect(303, '/auth');
}) satisfies LayoutServerLoad;
