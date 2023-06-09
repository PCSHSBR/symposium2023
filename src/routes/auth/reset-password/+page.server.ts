import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';

export const ssr = false;

export let actions = {
  default: async ({ request,url,locals: { supabase } }) => {
    let formData = await superValidate(request,schema);
    if(!formData.valid){
      console.log("not valid");
      return fail(500,{ formData });
    }
    let result = await supabase.auth.resetPasswordForEmail(formData.data.email,{ redirectTo: `${url.origin}/auth/callback` });
    console.log(result);
    if(result.error){
      console.log(result);
      return fail(500,{message: result.error.message });
    }
    return { formData };
  }
}

const schema = z.object({
  email: z.string().email({message: 'Please enter a valid email address.'}),
});

export const load = async () => {
  const form = await superValidate(schema);
  return { form };
};