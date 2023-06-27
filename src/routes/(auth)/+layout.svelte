<script lang="ts">
	import Navbar from '$lib/componant/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Navbar {data} />
<main class="mx-auto min-h-screen p-5 pt-16 max-w-2xl">
	<slot />
</main>
