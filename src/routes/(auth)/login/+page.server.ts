import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const ssr = false;

const schema = z.object({
	email: z.string().email({ message: 'โปรดใส่ที่อยู่อีเมลที่ถูกต้อง' }),
	password: z.string()
});

export const load = (async () => {
	const form = await superValidate(schema);
	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await superValidate(request, schema);
		console.log(formData);
		if (!formData.valid) {
			console.log('not valid');
			return fail(500, { formData, success: false, message: 'โปรดตรวจสอบข้อมูลที่กรอก' });
		}
		const result = await supabase.auth.signInWithPassword({
			email: formData.data.email,
			password: formData.data.password
		});

		if (result.error) {
			console.log(result);
			return fail(500, { formData, message: result.error.message, success: false });
		}
		return { formData, success: true };
	}
} satisfies Actions;
