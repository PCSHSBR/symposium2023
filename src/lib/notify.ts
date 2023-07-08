import { toast } from '$lib/toastStore';

export const notify = ({ message, type = 'default', ...restParams }) => {
	return toast.push(message, {
		...restParams
	});
};
