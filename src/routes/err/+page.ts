import { error, fail } from '@sveltejs/kit';
export const load = async () => {
	throw error(406, {
		message: 'jassdj'
	});
};
