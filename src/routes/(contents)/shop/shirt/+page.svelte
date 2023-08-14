<script lang="ts">
	import { onMount } from 'svelte';

	let img_list = `https://i.ibb.co/zJ4dn9t/IMG-0022.jpg
https://i.ibb.co/pbJqTCJ/IMG-0023.jpg
https://i.ibb.co/ScypPjB/IMG-0024.jpg
https://i.ibb.co/jLPcsnq/IMG-0025.jpg
https://i.ibb.co/ydV7ntP/IMG-0026.jpg
https://i.ibb.co/t3dzmQc/IMG-0027.jpg
https://i.ibb.co/QYgj2zN/IMG-0029.jpg
https://i.ibb.co/pwNQQM9/IMG-0030.jpg
https://i.ibb.co/7W4671M/IMG-0031.jpg
https://i.ibb.co/DkbNfNx/IMG-0033.jpg
https://i.ibb.co/LCdJXjs/IMG-0034.jpg
https://i.ibb.co/tDjS2Mp/IMG-0035.jpg
https://i.ibb.co/BLgZnFj/IMG-0036.jpg
https://i.ibb.co/hcyPy1B/IMG-0037.jpg
https://i.ibb.co/JymWCYz/IMG-0001.jpg
https://i.ibb.co/0KdG0ph/IMG-0002.jpg
https://i.ibb.co/mGSqn4n/IMG-0003.jpg
https://i.ibb.co/7S0YVM5/IMG-0004.jpg
https://i.ibb.co/4VZMrFs/IMG-0005.jpg
https://i.ibb.co/dkf1MZc/IMG-0006.jpg
https://i.ibb.co/swsxyVb/IMG-0007.jpg
https://i.ibb.co/526YPCS/IMG-0008.jpg
https://i.ibb.co/wMN1mjX/IMG-0009.jpg
https://i.ibb.co/nLvWy3P/IMG-0011.jpg
https://i.ibb.co/BrG5wLB/IMG-0012.jpg
https://i.ibb.co/YtZDbnW/IMG-0013.jpg
https://i.ibb.co/NpQVk9d/IMG-0018.jpg
https://i.ibb.co/pZBBh1f/IMG-0019.jpg
https://i.ibb.co/VCdtV1h/IMG-0020.jpg
https://i.ibb.co/G3B4DNf/IMG-0021.jpg`.split('\n');
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
				<img src={img_list[0]} class="h-full w-full object-scale-down" alt="shirt" />
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
