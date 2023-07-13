<script lang="ts">
	export let message: string;
	let toastType: 'success' | 'error' | 'info' | 'warning' = 'info';
	export { toastType as type };
	const knownTypes = ['success', 'error', 'info', 'warning'];
	if (!knownTypes.includes(toastType)) {
		throw new Error(`Unknown type: ${toastType}`);
	}
</script>

<!-- alert-success alert-error alert-info alert-warning -->
<div class="alert-{toastType} p-3">
	<p>{message}</p>
</div>
