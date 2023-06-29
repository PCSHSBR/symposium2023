export const enhanceHelper = ({ isLoading = false, reset = true }) => () => {
	isLoading = true;
	return async ({ update }) => {
		isLoading = false;
		update({ reset: true });
	};
}
