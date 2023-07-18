import { error } from '@sveltejs/kit';

export let load = async (req: Request, res: Response) => {
	const url = new URL(req.url);
	let token = url.searchParams.get('token');
	let type = url.searchParams.get('type');
	let redirect_to = url.searchParams.get('redirect_to');
	return {
		token,
		type,
		redirect_to
	};
};
