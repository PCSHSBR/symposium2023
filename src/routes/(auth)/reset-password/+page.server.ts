import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const ssr = false;

// Schema and load always come first
const schema = z.object({
	email: z.string().email({ message: 'โปรดใส่ที่อยู่อีเมลที่ถูกต้อง' })
});

export const load = async () => {
	const form = await superValidate(schema);
	return { form };
};

export let actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		let formData = await superValidate(request, schema);
		if (!formData.valid) {
			return fail(500, { formData, ok: false });
		}
		let result = await supabase.auth.resetPasswordForEmail(formData.data.email, {
			redirectTo: `${url.origin}/auth/set-new-password`
		});
		if (result.error) {
			return fail(500, { message: result.error.message, ok: false });
		}
		return { formData, ok: true };
	}
} satisfies Actions;
