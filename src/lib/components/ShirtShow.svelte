<script lang="ts">
	import CdnImage from '$lib/components/CDNImage.svelte';
</script>

<section class="shop p-10" id="shop">
	<a href="/shop/shirt" class="link focus:ring-1 focus:ring-offset-2" target="_blank">
		<div
			class="main-c-1 relative mx-auto h-[30rem] max-w-[60rem] overflow-hidden rounded-3xl bg-gradient-to-tl from-primary to-secondary transition-all duration-500"
		>
			<div>
				<div class="text-c-1 absolute right-0 z-[100] text-white transition-all duration-500">
					<div class="text-c-2 max-w-[400px] p-12 text-right transition-all duration-500">
						<h3 class="w-full max-w-[400px] text-4xl font-bold leading-relaxed sm:text-6xl">
							ซื้อเสื้อ Symposium ได้เลยตอนนี้<br />
							<span class="text-lg font-normal"> เปิดพรีออเดอร์ถึง 30 สิงหาคมนี้เท่านั้น </span>
						</h3>
						<p>ราคา 350 ต่อชิ้น</p>
						<!-- <button class="btn w-full bg-white text-black"></button> -->
					</div>
				</div>
				<div class="left-0 z-[99]">
					<CdnImage
						class="absolute bottom-0 left-10 h-[360px] !bg-none md:left-[120px] md:h-full"
						file="sym2023/cut-images/IMG-0027-1.png"
					/>
					<CdnImage
						class="absolute -left-20 bottom-0 h-[360px] !bg-none md:-left-10 md:h-full"
						file="sym2023/cut-images/IMG-0018-1.png"
					/>
				</div>
			</div>
		</div>
	</a>
</section>
