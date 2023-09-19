<script lang="ts">
	export let title: string;
	export let folderId: string;
	// optinal
	export let id: string | undefined = '';
</script>

{#if id}
	<span {id} class="-mt-16 inline-block h-16" />
{/if}
<h2>{title}</h2>
<iframe
	{title}
	src="https://drive.google.com/embeddedfolderview?id={folderId}#list"
	class="h-96 w-full border-0"
/>
