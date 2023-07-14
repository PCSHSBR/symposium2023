import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import {
	studentRegisterProjectFormSchema,
	type StudentRegisterProjectFormSchema
} from '$lib/formSchemas';
import { message, superValidate } from 'sveltekit-superforms/server';
export const ssr = false;

export const load = (async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	await supabase.auth.refreshSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project/edit/step-2-project-information');
	const checkIfProjectExist = await supabase
		.from('projects')
		.select()
		.eq('team_contact_user_id', session.user.id);
	if (checkIfProjectExist.error) throw error(500, checkIfProjectExist.error.message);
	let projectID = checkIfProjectExist.data[0]?.id;
	let projectResult;
	if (projectID) {
		projectResult = await supabase.from('projects').select().eq('id', projectID);
		if (projectResult.error) throw error(500, projectResult.error.message);
	} else {
		projectResult = {
			data: []
		};
	}
	const projectData = {
		presentation_type: projectResult.data[0]?.presentation_type || 1,
		project_field: projectResult.data[0]?.field || 1,
		project_title_th: projectResult.data[0]?.title_th || '',
		project_title_en: projectResult.data[0]?.title_en || '',
		school: projectResult.data[0]?.school || 1,
		student_members: projectResult.data[0]?.student_members || [
			{
				title_en: '',
				title_th: '',
				firstname_en: '',
				firstname_th: '',
				lastname_en: '',
				lastname_th: '',
				phone_number: '',
				email: ''
			}
		],
		teacher_advisor: projectResult.data[0]?.teacher_advisor || [
			{
				title_th: '',
				title_en: '',
				firstname_th: '',
				firstname_en: '',
				lastname_th: '',
				lastname_en: '',
				phone_number: '',
				email: ''
			}
		],
		special_advisor: []
	};
	// @ts-ignore
	const form = await superValidate(projectData, studentRegisterProjectFormSchema, {
		errors: false
	});
	const teamImageList = await supabase.storage.from('teamImages').list(session.user.id, {
		limit: 1,
		sortBy: {
			// newest first
			column: 'updated_at',
			order: 'desc'
		}
	});
	if (teamImageList.error) throw error(500, teamImageList.error.message);
	let teamImageUrl = '';
	let teamImageData = teamImageList.data[0];
	if (teamImageList.data.length > 0) {
		const {
			data: { publicUrl }
		} = supabase.storage
			.from('teamImages')
			.getPublicUrl(`${session.user.id}/${teamImageList.data[0].name}`);
		teamImageUrl = publicUrl;
	}
	return { form, teamImageUrl: teamImageUrl, teamImageData: teamImageData };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals: { getSession, role, supabase }, request }) => {
		const session = await getSession();
		if (!session)
			throw redirect(303, '/login?redirect=/my-project/edit/step-2-project-information');
		const form = await superValidate(request, studentRegisterProjectFormSchema);
		// console.log('POST', JSON.stringify(form.data, null, 2));
		// console.log('POST', JSON.stringify(form.errors, null, 2));
		if (!form.valid) return fail(400, { form });
		// upsert
		const checkIfProjectExist = await supabase
			.from('projects')
			.select()
			.eq('team_contact_user_id', session.user.id);
		if (checkIfProjectExist.error) throw error(500, checkIfProjectExist.error.message);
		let projectID = checkIfProjectExist.data[0]?.id;
		const projectResult = await supabase.from('projects').upsert({
			team_contact_user_id: session.user.id,
			presentation_type: form.data.presentation_type,
			field: form.data.project_field,
			title_th: form.data.project_title_th,
			title_en: form.data.project_title_en,
			school: form.data.school,
			special_advisor: form.data.special_advisor,
			student_members: form.data.student_members,
			teacher_advisor: form.data.teacher_advisor,
			id: projectID
		});
		if (projectResult.error) throw error(500, projectResult.error.message);
		const updateStatusResult = await supabase.from('project_status').upsert({
			is_information_complete: true,
			team_contact_user_id: session.user.id
		});
		if (updateStatusResult.error) throw error(500, updateStatusResult.error.message);
		return message(form, 'บันทึกข้อมูลเรียบร้อยแล้ว');
	}
};
