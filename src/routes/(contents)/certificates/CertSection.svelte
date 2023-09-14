<script lang="ts">
	export let title: string;
	export let folderId: string;
</script>

<h2>{title}</h2>
<iframe
	{title}
	src="https://drive.google.com/embeddedfolderview?id={folderId}#list"
	class="h-96 w-full border-0"
/>
