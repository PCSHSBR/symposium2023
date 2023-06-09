import { fail } from '@sveltejs/kit'
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

export const ssr = false;

export const actions = {
    default: async ({ request, url, locals: { supabase } }) => {
      const formData = await request.formData()
      const email = formData.get('email') as string
      const password = formData.get('password') as string
  
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
  
      if (error) {
        return fail(500, { message: error.message, success: false, email })
      }
  
      return {
        message: 'Sign in sucessful!',
        success: true,
      }
    },
  }