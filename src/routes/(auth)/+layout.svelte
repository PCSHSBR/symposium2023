<script lang="ts">
	import Navbar from '$lib/componant/Navbar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Navbar data={data}/>
<main class="min-h-screen">
<slot />
</main>

