import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export let load = async ({ params, locals: { getSession } }) => {
	const session = await getSession();
	if (!session) throw error(403);
};

export let actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		let formData = await request.formData();
		let new_password = await formData.get('password');
		let password_conf = await formData.get('password-conf');

		if (new_password !== password_conf)
			return fail(400, { message: 'รหัสผ่านไม่ตรงกัน', ok: false });
		if (new_password?.length < 8)
			return fail(400, { message: 'รหัสต้องมีอย่างน้อย 8 ตัวอักษร', ok: false });
		let result = await supabase.auth.updateUser({ password: new_password });
		if (result.error) return fail(500, { message: 'มีข้อผิดพลาดเกิดขึ้นในเซอร์เวอร์', ok: false });
		return { message: 'รหัสผ่านบันทึกเรียบร้อยแล้ว', ok: true };
	}
} satisfies Actions;
