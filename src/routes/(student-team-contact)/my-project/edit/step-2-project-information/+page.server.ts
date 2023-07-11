import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { studentRegisterProjectFormSchema } from '$lib/formSchemas';
import { message, superValidate } from 'sveltekit-superforms/server';
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
		if (!session)
			throw redirect(303, '/login?redirect=/my-project/edit/step-2-project-information');
		const form = await superValidate(request, studentRegisterProjectFormSchema);
		console.log('POST', JSON.stringify(form.errors, null, 2));
		console.log('POST', JSON.stringify(form.data, null, 2));
		if (!form.valid) return fail(400, { form });
		const studentResult = await supabase
			.from('students')
			.select('id')
			.eq('user_id', session.user.id);
		const registerProjectResult = await supabase
			.from('projects')
			.insert([
				{
					field: form.data.project_field,
					presentation_type: form.data.presentation_type,
					school: form.data.school,
					title_th: form.data.project_title_th,
					title_en: form.data.project_title_en,
					team_contact_user_id: session.user.id,
					special_advisor: form.data.special_advisor
				}
			])
			.select('id');
		console.log('registerProjectResult', JSON.stringify(registerProjectResult, null, 2));
		if (registerProjectResult.error) throw error(500, registerProjectResult.error.message);
		const projectID = registerProjectResult.data[0].id;
		// create student entry
		const studentEntryResult = await supabase.from('students').insert(
			form.data.student_members.map((field) => {
				return {
					title_en: field.title_en,
					title_th: field.title_th,
					firstname_en: field.firstname_en,
					firstname_th: field.firstname_th,
					lastname_en: field.lastname_en,
					lastname_th: field.lastname_th,
					phone: field.phone_number,
					email: field.email,
					project: projectID
				};
			})
		);
		console.log('studentEntryResult', JSON.stringify(studentEntryResult, null, 2));
		if (studentEntryResult.error) throw error(500, studentEntryResult.error.message);
		// create teacher advisor entry
		const teacherAdvisorEntryResult = await supabase.from('teachers').insert(
			form.data.teacher_advisor.map((field) => {
				return {
					school: form.data.school,
					phone: field.phone_number,
					firstname_th: field.firstname_th,
					firstname_en: field.firstname_en,
					project: projectID,
					lastname_th: field.lastname_th,
					lastname_en: field.lastname_en,
					title_th: field.title_th,
					title_en: field.title_en,
					email: field.email
				};
			})
		);
		console.log('teacherAdvisorEntryResult', JSON.stringify(teacherAdvisorEntryResult, null, 2));
		if (teacherAdvisorEntryResult.error) throw error(500, teacherAdvisorEntryResult.error.message);
		// special advisor entry are already created in the project entry
		return message(form, 'บันทึกข้อมูลเรียบร้อยแล้ว');
	}
};
