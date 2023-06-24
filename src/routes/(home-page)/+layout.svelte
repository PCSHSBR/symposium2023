<script lang="ts">
	import Navbar from '$lib/componant/Navbar.svelte';
	import Footer from '$lib/componant/Footer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<meta
		name="keywords"
		content="PCSHS, PCSHSBR, Science Symposium, Symposium 2023, Thailand, Princess Chulabhorn Science High School, Princess Chulabhorn Science High School Buriram"
	/>
</svelte:head>

<Navbar {data} />
<main>
	<slot />
</main>
<Footer/>