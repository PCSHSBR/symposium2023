import { error } from '@sveltejs/kit';
import type { PageServerData, PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession, supabase }, url }) => {
	const session = await getSession();
	if (!session) throw error(401, 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
	const page = parseInt(url.searchParams.get('page') || '1');
	const listUser = (
		await supabase.auth.admin.listUsers({
			page: page,
			perPage: 100
		})
	).data.users;
	return {
		inviteList: listUser
	};
}) as PageServerLoad;
