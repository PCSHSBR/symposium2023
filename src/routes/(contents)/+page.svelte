<script lang="ts">
	import { onMount } from 'svelte';

	let days = 15;
	let hours = 15;
	let minutes = 12;
	let seconds = 24;

	setInterval(() => {
		seconds--;
		if (seconds == 0) {
			minutes--;
			seconds = 59;
		}
		if (minutes == 0) {
			hours--;
			minutes = 59;
		}
		if (hours == 0) {
			days--;
			hours = 23;
		}
	}, 1000);
	var isSafari;
	onMount(() => {
		isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		console.log(isSafari);
	});
</script>

<svelte:head>
	<title>The 3rd PCSHS Science Symposium 2023 @PCSHSBR</title>
	<meta
		name="description"
		content="ยินดีต้อนรับสู่งานนำเสนอผลงานโครงงานนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยของระดับชั้นมัธยมศึกษาปีที่ 6 The 3rd PCSHS Science Symposium 2023 ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์"
	/>
	<meta
		property="og:description"
		content="ยินดีต้อนรับสู่งานนำเสนอผลงานโครงงานนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยของระดับชั้นมัธยมศึกษาปีที่ 6 The 3rd PCSHS Science Symposium 2023 ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์"
	/>
	<meta property="og:title" content="The 3rd PCSHS Science Symposium 2023 @PCSHSBR" />
</svelte:head>

<section class="banner relative">
	<div class="h-screen overflow-hidden">
		{#if isSafari}
			<img
				src="Image/BannerPic.png"
				alt=""
				class="absolute top-[128px] h-[calc(100vh-8rem)] w-screen object-cover"
			/>
		{:else}
			<video
				loop
				autoplay
				muted
				class="absolute top-[128px] h-[calc(100vh-8rem)] w-screen object-cover"
			>
				<source src="video/BannerVid.webm" />
			</video>
		{/if}
	</div>
	<div class="absolute top-[15%] px-16 md:px-32">
		<h1
			class="-leading-[16px] text-4xl font-black mix-blend-difference invert dark:mix-blend-difference dark:invert-0 md:text-6xl"
		>
			3rd PCSHS Science Symposium
		</h1>
		<p class="mix-blend-difference invert dark:mix-blend-difference dark:invert-0">
			มาร่วมสัมผัสประสบการณ์การนำเสนอผลงานโครงงานวิทยาศาสตร์ และเทคโนโลยี ระดับชั้นมัธยมศึกษาปีที่ 6
		</p>
		<a class="btn-primary btn">ส่งโครงงาน</a>
	</div>
</section>
