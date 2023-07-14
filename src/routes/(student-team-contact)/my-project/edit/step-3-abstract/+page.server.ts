import type { Action, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project/edit/step-3-abstract');
}) satisfies PageServerLoad;
