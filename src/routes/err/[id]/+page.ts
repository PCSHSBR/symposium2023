import { error, fail } from '@sveltejs/kit';
export const load = async ({ params }) => {
	if (!parseInt(params.id) || !params.id) throw error(418, 'ฉันเป็นถ้วยชา');
	throw error(parseInt(params.id));
};
