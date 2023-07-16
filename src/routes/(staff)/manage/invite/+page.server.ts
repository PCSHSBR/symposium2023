import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Roles } from '$lib/types';
import { toThai } from '$lib/langUtils';

const permittedAccessRoles = ['teacher', 'staff', 'school-contact'];

export const load = (async ({ locals: { role, getSession } }) => {
	const session = await getSession();
	if (!permittedAccessRoles.includes(session?.user.user_metadata.role))
		throw redirect(303, 'login?redirect=/auth');
}) satisfies PageServerLoad;

export let actions = {
	default: async ({ request, url, locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (!session) throw error(401, 'โปรดเข้าสู่ระบบ');
		const role: Roles = session.user.user_metadata.role;
		if (!permittedAccessRoles.includes(role))
			throw fail(403, {
				message: 'คุณไม่มีสิทธิ์ดำเนินการกระทำนี้'
			});
		const formData = await request.formData();
		const formSchema = z.object({
			email: z
				.string({
					invalid_type_error: 'กรุณากรอกอีเมลให้ถูกต้อง',
					required_error: 'กรุณากรอกอีเมล'
				})
				.transform((v) => v.split('\n').map((v) => v.trim())),
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
		let e: string[] = [];
		for (const email of parsed.data.email) {
			const result = await supabase.auth.admin.inviteUserByEmail(email, {
				data: {
					role: parsed.data.role,
					invited_by: session?.user.email
				},
				redirectTo: `${url.origin}/welcome`
			});
			console.log(result);
			if (result.error) e.push(`${email}: ${toThai(result.error.message)}`);
		}
		if (e.length !== 0)
			return fail(500, {
				message: e.join(', ')
			});
		return { ok: true, message: 'ส่งคำเชิญสำเร็จ' };
	}
} satisfies Actions;
