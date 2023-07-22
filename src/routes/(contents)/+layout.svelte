<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { notify } from '$lib/notify';
	import { toThai } from '$lib/langUtils';

	export let data: LayoutData;

	onMount(() => {
		if (!window.location.hash) return;
		const hash = new Map(
			window.location.hash
				.split('#')[1]
				.split('&')
				.map((x) => x.split('=').map(decodeURIComponent))
		);
		if (hash.get('message')) {
			notify({
				message: toThai(hash.get('message') as string) || '',
				type: 'default'
			});
		}
		// #error=unauthorized_client&error_code=401&error_description=Email+link+is+invalid+or+has+expired
		if (hash.get('error')) {
			notify({
				message: toThai(hash.get('error_description') as string) || '',
				type: 'error'
			});
		}
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
