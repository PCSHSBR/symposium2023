import { redirect } from '@sveltejs/kit';
import type { Session } from '@supabase/supabase-js';
import type { Roles } from '$lib/types';
/**
 * Check if the user role meet the condition, redirecting if not
 * @param session The session object
 * @param target The target URL to redirect to if the user is not logged in
 * @returns void
 */
export function roleCheck(session: Session | null, role: Roles, target: string) {
	if (role === 'anon' && session) throw redirect(303, target);
	if (!session) throw redirect(303, target);
	if (role !== session.user.user_metadata.role) throw redirect(303, target);
	// done check!
}
