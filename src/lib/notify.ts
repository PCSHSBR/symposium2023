import { toast, type SvelteToastOptions } from '$lib/toastStore';

// extend from SvelteToastOptions and add message and type
type NotifyParams = SvelteToastOptions & {
	message: string;
	type?: 'default' | 'success' | 'error' | 'warning';
};

export const notify = ({ message, type = 'default', ...restParams }: NotifyParams) => {
	if (type === 'error') console.error(message);
	if (type === 'warning') console.warn(message);
	if (type === 'success') console.log(message);
	if (type === 'default') console.log(message);
	return toast.push(message, {
		...restParams,
		duration: 10000,
		dismissable: true,
		// @ts-ignore
		type
	});
};
