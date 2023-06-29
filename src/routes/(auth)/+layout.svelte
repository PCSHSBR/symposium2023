<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Navbar {data} />
<main class="mx-auto min-h-screen max-w-2xl p-5 pt-16">
	<slot />
</main>
