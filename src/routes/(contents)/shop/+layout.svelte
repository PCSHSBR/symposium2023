<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let real_route = $page.route.id?.split('/').splice(3, 5) ?? [];

	$: $page.route.id, updateRoute();

	function updateRoute() {
		real_route = $page.route.id?.split('/').splice(3, 5) ?? [];
		// console.log(real_route);
	}
</script>

<section class="main-container mx-auto w-[calc(100vw-64px)] max-w-5xl">
	<div class="breadcrumbs text-sm">
		<ul>
			<li><a href="/shop" on:click={updateRoute}>ร้านค้า</a></li>
			{#each real_route as route}
				<li><a href="/shop/{route}" on:click={updateRoute}>{route}</a></li>
			{/each}
		</ul>
	</div>
	<slot />
</section>

<style lang="postcss">
	a {
		@apply link-hover link text-base-content;
	}
</style>
