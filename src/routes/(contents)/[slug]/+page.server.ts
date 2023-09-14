import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const redirectList: Record<string, string> = {
	certs: '/certificates',
	cert: '/certificates'
};

export const load: PageServerLoad = async ({ params }) => {
	if (params.slug in redirectList) throw redirect(302, redirectList[params.slug]);
	throw error(404, 'ไม่พบหน้าที่คุณต้องการ');
};
