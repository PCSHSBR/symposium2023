import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isPropertyExist } from '$lib/utils';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(303, '/login?redirect=/dashboard');
	if (
		!isPropertyExist(session?.user?.user_metadata, [
			'title_th',
			'firstname_th',
			'lastname_th',
			'phone'
		])
	)
		throw redirect(303, '/welcome');
}) satisfies PageServerLoad;
