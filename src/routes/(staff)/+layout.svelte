<script lang="ts">
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<Navbar {data} />
<main class="m-auto px-7 pt-16"><slot /></main>
