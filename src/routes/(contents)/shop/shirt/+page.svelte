<script lang="ts">
	import img1 from '$lib/assets/images/shop/shirt/IMG_0001.jpg';
	import img2 from '$lib/assets/images/shop/shirt/IMG_0002.jpg';
	import img3 from '$lib/assets/images/shop/shirt/IMG_0003.jpg';
	import img4 from '$lib/assets/images/shop/shirt/IMG_0004.jpg';
	import img5 from '$lib/assets/images/shop/shirt/IMG_0005.jpg';
	import img6 from '$lib/assets/images/shop/shirt/IMG_0006.jpg';
	import img7 from '$lib/assets/images/shop/shirt/IMG_0007.jpg';
	import img8 from '$lib/assets/images/shop/shirt/IMG_0008.jpg';
	import { onMount } from 'svelte';

	let img_list = [img1, img2, img3, img4, img5, img6, img7, img8];
	let img_select_container: HTMLElement;
	let img_preview_container: HTMLElement;
	onMount(() => {
		img_select_container.querySelectorAll('div').forEach((div) => {
			div.addEventListener('click', () => {
				img_preview_container.querySelector('img').src = div.querySelector('img').src;
			});
		});
	});
</script>

<section class="main-container my-8">
	<div class="sub-container box-border">
		<div class="w-full max-w-[600px]">
			<div
				bind:this={img_preview_container}
				class="h-[600px] w-full max-w-[600px] overflow-hidden rounded-3xl bg-base-300"
			>
				<img src={img1} class="h-full w-full object-scale-down" alt="shirt" />
			</div>
			<div
				bind:this={img_select_container}
				class="img-select-container my-4 w-full max-w-[600px] overflow-x-auto overflow-y-hidden whitespace-nowrap"
			>
				{#each img_list as img}
					<div
						class="mr-4 inline-block h-[118px] w-[118px] overflow-hidden rounded-3xl bg-base-300"
					>
						<img src={img} class="h-full w-full object-cover" alt="" />
					</div>
				{/each}
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
		@media (min-width: 968px) {
			grid-template-columns: 600px 1fr;
		}
	}
</style>
