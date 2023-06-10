<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@fontsource-variable/anuphan';
	import '@fontsource/noto-sans-thai-looped/400.css';
	import '@fontsource/noto-sans-thai-looped/700.css';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#374250" />
</svelte:head>

<slot />
