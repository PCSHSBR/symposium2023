<script>
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { toast } from '$lib/toastStore';
	import ToastItem from './ToastItem.svelte';

	/** @type {import('$lib/toastStore').SvelteToastOptions} */
	export let options = {};
	/** @type {(string|'default')} */
	export let target = 'default';

	/** @type {import('$lib/toastStore').SvelteToastOptions[]} */
	let items = [];

	/** @param {Object<string,string|number>} [theme] */
	function getCss(theme) {
		return theme ? Object.keys(theme).reduce((a, c) => `${a}${c}:${theme[c]};`, '') : undefined;
	}

	$: toast._init(target, options);

	$: items = $toast.filter((i) => i.target === target);
</script>

<ul class="fixed right-3 top-16 z-[9999] flex flex-col-reverse gap-2">
	{#each items as item (item.id)}
		<li
			class={item.classes?.join(' ')}
			in:fly={item.intro}
			out:fade
			animate:flip={{ duration: 200 }}
			style={getCss(item.theme)}
		>
			<ToastItem {item} />
		</li>
	{/each}
</ul>
