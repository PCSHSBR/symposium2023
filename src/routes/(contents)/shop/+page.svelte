<script>
	import CdnImage from '$lib/components/CDNImage.svelte';
</script>

<section class="main-container my-8">
	<div class="flex-warp flex">
		<a href="/shop/shirt" class="text-base-content decoration-transparent">
			<div class="shop-item w-52 overflow-hidden rounded-xl bg-base-300 shadow-md">
				<div class="h-52 w-52 overflow-hidden">
					<CdnImage
						file="sym2023/shirt-image/IMG_0022.png"
						class="h-full w-full object-cover"
						alt=""
					/>
				</div>
				<div class="p-4">
					<h2 class="text-xl font-bold">เสื้อ Symposium</h2>
					<p>350 บาท</p>
				</div>
			</div>
		</a>
	</div>
</section>

<style lang="postcss">
	.shop-item {
		&:hover {
			transform: scale(1.05);
		}
	}
</style>
