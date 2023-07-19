<script lang="ts">
	import LogoWithText from './LogoWithText.svelte';
	import Icon from '@iconify/svelte';
</script>

<footer class="footer footer-center rounded bg-base-200 p-16 text-base-content">
	<div class="flex w-full flex-wrap justify-between">
		<div class="text-left">
			<LogoWithText class="h-20 w-auto" />
			<p>Copyright © 2023 PCSHSBR Science Symposium</p>
		</div>
		<div class="flex flex-wrap gap-x-10">
			<div class="text-left">
				<h3 class="text-xl font-bold">ติดต่อ</h3>
				<div class="flex">
					<a href="/facebook" class="flex"><Icon icon="ic:baseline-facebook" class="text-2xl" /></a>
					<a href="/facebook" class="flex"><Icon icon="mdi:phone" class="text-2xl" /></a>
					<a href="/facebook" class="flex"><Icon icon="mdi:email-outline" class="text-2xl" /></a>
				</div>
			</div>
		</div>
	</div>
</footer>
