<script lang="ts">
	import Icon from '@iconify/svelte';
	export let pass: boolean;
	export let label: string;
</script>

{#if pass}
	<Icon icon="mdi:check" class="h-5 w-5 dark:text-green-400 text-green-500" />
{:else}
	<Icon icon="mdi:close" class="h-5 w-5 dark:text-red-400 text-red-500" />
{/if}<span>{label}</span>
