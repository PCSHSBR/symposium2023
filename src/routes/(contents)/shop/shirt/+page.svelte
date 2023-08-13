<script lang="ts">
	import img1 from '$lib/assets/images/shop/shirt/IMG_0001.jpg';
	import img2 from '$lib/assets/images/shop/shirt/IMG_0002.jpg';
	import img3 from '$lib/assets/images/shop/shirt/IMG_0003.jpg';
	import img4 from '$lib/assets/images/shop/shirt/IMG_0004.jpg';
	import { onMount } from 'svelte';

	let img_select_container: HTMLElement;
	onMount(() => {});
</script>

<section class="main-container my-8">
	<div class="sub-container box-border">
		<div class="w-full max-w-[600px]">
			<div class="h-[600px] w-full max-w-[600px] overflow-hidden rounded-3xl bg-base-300">
				<img src={img1} class="h-full w-full object-scale-down" alt="shirt" />
			</div>
			<div
				bind:this={img_select_container}
				class="img-select-container my-4 w-full max-w-[600px] gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap"
			>
				<div class="inline-block h-[118px] w-[118px] overflow-hidden rounded-3xl bg-base-300">
					<img src={img1} class="h-full w-full object-cover" alt="" />
				</div>
				<div class="inline-block h-[118px] w-[118px] overflow-hidden rounded-3xl bg-base-300">
					<img src={img2} class="h-full w-full object-cover" alt="" />
				</div>
				<div class="inline-block h-[118px] w-[118px] overflow-hidden rounded-3xl bg-base-300">
					<img src={img3} class="h-full w-full object-cover" alt="" />
				</div>
			</div>
		</div>
		<div class="flex h-full w-full max-w-[600px] flex-col md:w-full">
			<div>
				<h1 class="text-3xl font-bold">เสื้อ Symposium</h1>
				<p class="text-xl font-bold">100 บาท</p>
				<p class="text-xl">เสื้องาน Symposium</p>
			</div>
			<div class="mt-4 flex">
				<button class="btn-primary btn w-full">สั่ง</button>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	.sub-container {
		@apply flex flex-col items-center gap-4 md:grid md:grid-cols-2;
		@media (min-width: 768px) {
			grid-template-columns: 600px 1fr;
		}
	}
</style>
