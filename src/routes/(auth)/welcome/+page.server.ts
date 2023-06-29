import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { role, getSession } }) => {
  const session = await getSession();
  if (!session) throw error(401, 'Unauthorized');
}) satisfies PageServerLoad;