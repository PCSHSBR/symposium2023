import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { role } }) => {
	if ((await role()) !== 'staff') throw redirect(303, '/login?redirect=/manage/invite');
}) satisfies PageServerLoad;

export let actions = {
	default: async ({ request, url, locals: { role, supabase, getSession } }) => {
		if ((await role()) !== 'staff')
			throw fail(403, {
				message: 'คุณไม่ใช่ Staff โปรดเข้าสู่ระบบด้วยบัญชี Staff ก่อนดำเนินการต่อ'
			});
		const session = await getSession();
		const formData = await request.formData();
		const formSchema = z.object({
			email: z
				.string({
					invalid_type_error: 'กรุณากรอกอีเมลให้ถูกต้อง',
					required_error: 'กรุณากรอกอีเมล'
				})
				.email({
					message: 'โปรดตรวจสอบอีเมลอีกครั้ง'
				}),
			role: z
				.string({
					invalid_type_error: 'ค่าต้องเป็นตัวอักษร'
				})
				.refine(
					(v) => ['staff', 'teacher', 'student-team-contact', 'school-contact'].includes(v),
					(val) => ({
						message: `คุณไม่สามารถเลือกบทบาท ${val} ได้`
					})
				)
		});
		const parsed = formSchema.safeParse(Object.fromEntries(formData));
		if (!parsed.success) return fail(400, { ok: false, message: parsed.error.flatten() });
		const result = await supabase.auth.admin.inviteUserByEmail(parsed.data.email, {
			data: {
				role: parsed.data.role,
				invited_by: session?.user.email
			},
			redirectTo: `${url.origin}/welcome`
		});
		if (result.error)
			return fail(400, {
				message: result.error?.message || 'เกิดข้อผิดพลาดในการส่งคำเชิญ'
			});
		return { ok: true, message: 'ส่งคำเชิญสำเร็จ' };
	}
} satisfies Actions;
