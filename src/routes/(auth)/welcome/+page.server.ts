import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { isPropertyExist } from '$lib/utils';
import { userWelcomeMetadataSchema } from '$lib/formSchemas';

export const load = (async ({ locals: { role, getSession, supabase } }) => {
	const session = await getSession();
	await supabase.auth.refreshSession();
	const form = await superValidate(session?.user?.user_metadata, userWelcomeMetadataSchema);
	return {
		form,
		isUserSetupDoneAlready: isPropertyExist(session?.user?.user_metadata, [
			'title_th',
			'title_en',
			'firstname_th',
			'firstname_en',
			'lastname_th',
			'lastname_en',
			'phone'
		])
	};
}) satisfies PageServerLoad;
