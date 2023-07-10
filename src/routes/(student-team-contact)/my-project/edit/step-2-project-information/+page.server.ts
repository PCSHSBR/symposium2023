import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { studentRegisterProjectFormSchema } from '$lib/formSchemas';
import { superValidate } from 'sveltekit-superforms/server';
export const ssr = false;

export const load = (async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	await supabase.auth.refreshSession();
	if (!session) throw redirect(303, '/login?redirect=/my-project/edit/step-2-project-information');
	const form = await superValidate(studentRegisterProjectFormSchema, {
		errors: false
	});
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ locals: { getSession, role }, request }) => {
		const session = await getSession();
		if (!session) return fail(401);
		const form = await superValidate(request, studentRegisterProjectFormSchema);
		console.log('POST', JSON.stringify({ form }));
		if (!form.valid) return fail(400, { form });
		return { form };
	}
};
