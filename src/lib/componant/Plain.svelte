<script lang="ts">
	import Children from 'svelte-exmarkdown/renderer/Children.svelte';

	export let children: Node[];
	// export const properties: Record<string, unknown>;
</script>

<Children {children} />
