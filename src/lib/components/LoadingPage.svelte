<script lang="ts">
	import { loadpercent } from '$lib/store';
	import { onMount } from 'svelte';
	import LogoWithText from '$lib/components/LogoWithText.svelte';

	$: $loadpercent < 100
		? (document.body.style.overflow = 'hidden')
		: (document.body.style.overflow = 'auto');
</script>

<div
	class="absolute z-[100] h-full w-full bg-base-100 transition-all duration-700 ease-in-out
{$loadpercent >= 100 ? '-top-full opacity-0' : 'top-0'} 
"
>
	<div
		class="max-w- m-auto flex h-full w-[calc(100%-32px)] max-w-sm flex-col items-center justify-center align-middle"
	>
		<LogoWithText class="w-full" />
		<progress class="progress-primary progress w-full" value={$loadpercent} max="100" />
	</div>
</div>

<style lang="postcss">
</style>
