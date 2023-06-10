<script lang="ts">
	import Navbar from '$lib/componant/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<!-- prevent all crowler to crowling auth modules -->
	<meta name="robots" content="noindex" />
</svelte:head>

<Navbar {data} />
<main class="">
	<slot />
</main>
