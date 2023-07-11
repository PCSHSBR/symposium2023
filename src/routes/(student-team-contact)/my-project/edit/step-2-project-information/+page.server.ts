import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { studentRegisterProjectFormSchema } from '$lib/formSchemas';
import { superValidate } from 'sveltekit-superforms/server';
export const ssr = false;

const mockupDELETEMEdata = {
	presentation_type: 2,
	project_field: 4,
	project_title_th: 'เว็บแอปไร้เซิร์ฟเวอร์สำหรับสร้างลิงก์อย่างย่อด้วย Firebase Dynamic links',
	project_title_en: 'Serverless URL Shortener using Firebase Dynamic links',
	school: 5,
	student_members: [
		{
			title_en: 'Mr.',
			title_th: 'นาย',
			firstname_en: 'Patsagorn',
			firstname_th: 'พัสกร',
			lastname_en: 'Patsagorn',
			lastname_th: 'พัสกร',
			phone_number: '0649527661',
			email: 'manpatsagorny+student@gmail.com'
		}
	],
	teacher_advisor: [
		{
			title_th: 'นาย',
			title_en: 'Mr.',
			firstname_th: 'เอกชัย',
			firstname_en: 'Ekkachai',
			lastname_th: 'วัฒนไชย',
			lastname_en: 'Wattanachai',
			phone_number: '0987654321',
			email: 'ekkachai.wat@pcshsbr.ac.th'
		}
	],
	special_advisor: []
};

export const load = (async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	await supabase.auth.refreshSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project/edit/step-2-project-information');
	const form = await superValidate(mockupDELETEMEdata, studentRegisterProjectFormSchema, {
		errors: false
	});
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals: { getSession, role, supabase }, request }) => {
		const session = await getSession();
		if (!session) return fail(401);
		const form = await superValidate(request, studentRegisterProjectFormSchema);
		console.log('POST', JSON.stringify(form.errors, null, 2));
		console.log('POST', JSON.stringify(form.data, null, 2));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
