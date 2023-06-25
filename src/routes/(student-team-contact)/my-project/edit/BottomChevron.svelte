<script lang="ts">
	import Icon from '@iconify/svelte';

	export let prevHref = '#';
	export let prevPage = '';
	export let nextHref = '#';
	export let nextPage = '';
</script>

<nav class="join mt-5 flex flex-row justify-center">
	{#if prevHref && prevPage}
		<a href="/my-project/edit/{prevHref}" class="no-underline">
			<button
				class="btn-outline no-animation join-item btn flex flex-row flex-nowrap items-center align-middle md:btn-wide"
				aria-label="ย้อนกลับไปยังหน้า {prevPage}"
			>
				<Icon icon="mdi:chevron-left" class="h-8 w-8" />
				<span class="hidden {!nextHref || !nextPage ? 'xs:inline' : 'sm:inline'}">{prevPage}</span
				></button
			>
		</a>
	{/if}
	<a href="/my-project">
		<button class="btn-outline join-item btn"><Icon icon="mdi:home" /></button>
	</a>
	{#if nextHref && nextPage}
		<a href="/my-project/edit/{nextHref}" class="no-underline">
			<button
				aria-label="ไปหน้า {nextPage}"
				class="btn-outline no-animation join-item btn flex flex-row flex-nowrap items-center align-middle md:btn-wide"
				><span class="hidden xs:inline">{nextPage}</span>
				<Icon icon="mdi:chevron-right" class="h-8 w-8" /></button
			>
		</a>
	{/if}
</nav>
