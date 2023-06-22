import { redirect } from '@sveltejs/kit';

export const load = async ({ params, locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw redirect(302, '/login');
	throw redirect(302, 'controls/dashboard');
};
