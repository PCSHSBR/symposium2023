// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession, role } }) => {
	const session = await getSession();
	return {
		session: session,
		role: await role() || 'anon'
	};
};
