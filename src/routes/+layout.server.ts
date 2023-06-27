// src/routes/+layout.server.ts
export const load = async ({ locals: { getSession } }) => {
	const session = await getSession();
	return {
		session: session,
		role: session?.user?.role ?? 'anon'
	};
};
