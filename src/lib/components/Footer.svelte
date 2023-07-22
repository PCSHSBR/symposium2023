<script lang="ts">
	import LogoWithText from './LogoWithText.svelte';
	import Icon from '@iconify/svelte';
</script>

<footer class="footer rounded bg-base-300 p-10 text-base-content">
	<div class="text-left">
		<a href="/">
			<LogoWithText class="h-12 w-auto" />
		</a>
		<p>
			<!-- กิจกรรมนำเสนอโครงงานวิทยาศาสตร์ของนักเรียนชั้นมัธยมศึกษาปีที่ 6 กลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3 ประจำปี 2566<br/>
			ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์<br/> -->
			Copyright © 2023 by
			<a href="https://github.com/PCSHSBR/symposium2023" class="link" target="_blank"
				>Motivated students from PCSHSBR</a
			>
		</p>
	</div>
	<div>
		<h3 class="footer-title">ติดต่อ</h3>
		<div class="grid grid-flow-col gap-4">
			<!-- <a href="/facebook" class="flex"><Icon icon="ic:baseline-facebook" class="h-6 w-6" /></a> -->
			<a href="tel:0637700077" class="flex"><Icon icon="mdi:phone" class="h-6 w-6" /></a>
			<a href="mailto:sym2023@pcshsbr.ac.th" class="flex"
				><Icon icon="mdi:email" class="h-6 w-6" /></a
			>
		</div>
	</div>
</footer>
