<script>
	import { onMount, onDestroy } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { linear } from 'svelte/easing';
	import { toast } from '$lib/toastStore';

	/** @type {import('$lib/toastStore').SvelteToastOptions} */
	export let item;

	/** @type {any} */
	let next = item.initial;
	let prev = next;
	let paused = false;
	let cprops = {};
	/** @type {any} */
	let unlisten;
	let type = 'info';

	const progress = tweened(item.initial, { duration: item.duration, easing: linear });

	function close() {
		toast.pop(item.id);
	}

	function autoclose() {
		if ($progress === 1 || $progress === 0) close();
	}

	function pause() {
		if (!paused && $progress !== next) {
			progress.set($progress, { duration: 0 });
			paused = true;
		}
	}

	function resume() {
		if (paused) {
			const d = /** @type {any} */ (item.duration);
			const duration = d - d * (($progress - prev) / (next - prev));
			progress.set(next, { duration }).then(autoclose);
			paused = false;
		}
	}

	/** @param {any} prop */
	function check(prop, kind = 'undefined') {
		return typeof prop === kind;
	}

	function listen(d = document) {
		if (check(d.hidden)) return;
		const handler = () => (d.hidden ? pause() : resume());
		const name = 'visibilitychange';
		d.addEventListener(name, handler);
		unlisten = () => d.removeEventListener(name, handler);
		handler();
	}

	$: if (next !== item.next) {
		next = item.next;
		prev = $progress;
		paused = false;
		progress.set(next).then(autoclose);
	}

	$: if (item.component) {
		const { props = {}, sendIdTo } = item.component;
		cprops = { ...props, ...(sendIdTo && { [sendIdTo]: item.id }) };
	}

	// `progress` has been renamed to `next`; shim included for backward compatibility, to remove in next major
	$: if (!check(item.progress)) {
		item.next = item.progress;
	}

	onMount(listen);

	onDestroy(() => {
		if (check(item.onpop, 'function')) {
			// @ts-ignore
			item.onpop(item.id);
		}
		unlisten && unlisten();
	});
</script>

<div
	role="status"
	class="alert p-2"
	class:pe={item.pausable}
	on:mouseenter={() => {
		if (item.pausable) pause();
	}}
	on:mouseleave={resume}
>
	<div class="p-0" class:pe={item.component}>
		{#if item.component}
			<svelte:component this={item.component.src} {...cprops} />
		{:else}
			{@html item.msg}
		{/if}
	</div>
	{#if item.dismissable}
		<div
			class="btn"
			role="button"
			tabindex="0"
			on:click={close}
			on:keydown={(e) => {
				if (e instanceof KeyboardEvent && ['Enter', ' '].includes(e.key)) close();
			}}
		/>
	{/if}
	<progress class="progress-primary progress" value={$progress} />
</div>
