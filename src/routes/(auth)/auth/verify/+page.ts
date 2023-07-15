import { error } from '@sveltejs/kit';

export let load = async (req: Request, res: Response) => {
	let token = req.url.searchParams.get('token');
	let type = req.url.searchParams.get('type');

	// type 1 = confirm email
	// type 2 = invite to team
	// type 3 = change email
	// type 4 = change password
	// default = unknown

	if (!token) throw error(400, 'No token provided');
	return {
		token,
		type
	};
};
