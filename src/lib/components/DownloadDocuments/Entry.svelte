<script>
	import Icon from '@iconify/svelte';

	export let name = '<name>';
	export let description = '<description>';
	export let link = '<link>';
	export let isDownload = false;
</script>

<tr>
	<td>{@html name}</td>
	<td>{@html description}</td>
	<td class="text-center">
		<a href={link} target="_blank" class="btn-info btn">
			{#if isDownload}
				<Icon icon="mdi:download" class="h-5 w-5" />
			{:else}
				<Icon icon="mdi:open-in-new" class="h-5 w-5" />
			{/if}
		</a>
	</td>
</tr>
