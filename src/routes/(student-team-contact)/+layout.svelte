<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Navbar {data} />
<main class="min-h-screen">
	<slot />
</main>
<Footer />
