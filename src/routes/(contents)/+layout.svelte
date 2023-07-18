<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: PageData;
	onMount(() => {
		console.log(location.hash);
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="PCSHS, PCSHSBR, Science Symposium, Symposium 2023, Thailand, Princess Chulabhorn Science High School, Princess Chulabhorn Science High School Buriram"
	/>
</svelte:head>

<Navbar {data} />
<main class={$page.url.pathname == '/' ? '' : 'pt-16'}>
	<slot />
</main>
<Footer />
