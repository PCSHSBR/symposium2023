<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Navbar from '$lib/componant/Navbar.svelte';
</script>

<Navbar {data} />
<main class="m-auto max-w-xl pt-16"><slot /></main>
