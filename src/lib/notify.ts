import { toast, type SvelteToastOptions } from '$lib/toastStore';

// extend from SvelteToastOptions and add message and type
type NotifyParams = SvelteToastOptions & {
	message: string;
	type?: 'default' | 'success' | 'error' | 'warning';
};

export const notify = ({ message, type = 'default', ...restParams }: NotifyParams) => {
	return toast.push(message, {
		...restParams
	});
};
