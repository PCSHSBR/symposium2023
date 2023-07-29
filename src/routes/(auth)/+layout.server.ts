import { featureFlags } from '$lib/featureFlags';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({}) => {
	if (!featureFlags.openForLogin)
		throw redirect(
			303,
			'/#error=login&error_description=ขณะนี้ปิดการเข้าสู่ระบบแล้ว ขออภัยในความไม่สะดวก'
		);
};
