<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<section class="m-auto max-w-[calc(100%-32px)] pt-[5rem] md:max-w-md">
	<div class="search join w-full items-center p-2">
		<Icon icon="mdi:search" class="join-item mx-3 text-2xl" />
		<input type="text" name="search" placeholder="ค้นหา" id="" class="input join-item w-full" />
	</div>
</section>
<section class="m-auto flex max-w-[calc(100%-32px)] flex-row flex-wrap gap-4 pt-2 md:max-w-3xl">
	<div class="collapse bg-base-200">
		<input type="checkbox" />
		<div class="collapse-title text-xl font-medium">Click me to show/hide content</div>
		<div class="collapse-content">
			<p>hello</p>
		</div>
	</div>
</section>
