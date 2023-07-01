<script lang="ts">
	import { onMount } from 'svelte';
	import Banner from '$lib/components/banner.svelte';
	import Icon from '@iconify/svelte';

	let isLoading = true;
	let isBannerHovered = false;
	var isSafari: boolean;
	let eventdate = new Date('2023-09-20');
	let now = new Date();
	let remaining = new Date(eventdate.getTime() - now.getTime());

	console.log(now.toISOString());
	setInterval(() => {
		now = new Date();
		remaining = new Date(eventdate.getTime() - now.getTime());
	}, 1000);

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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	class="banner relative" 
	on:mouseenter={() => {
		isBannerHovered = true;
	}}
	on:mouseleave={() => {
		isBannerHovered = false;
	}}
>
	<div class="h-screen overflow-hidden">
		<Banner bind:isLoading bind:isHover={isBannerHovered} />
	</div>
	<div class="absolute top-[15%] px-16 md:px-32">
		<h1
			class="-leading-[16px] text-4xl font-black mix-blend-difference invert dark:mix-blend-difference dark:invert-0 md:text-6xl"
		>
			<span class="text-[128px]">3</span><span class="align-top text-xl">rd</span> PCSHS Science Symposium
		</h1>
		<p class="mix-blend-difference invert dark:mix-blend-difference dark:invert-0">
			มาร่วมสร้างสรรค์นวัตกรรมที่จะเปลี่ยนโลกให้ดีขึ้นผ่านการนำเสนอผลงานโครงงานของคุณกันเถอะ!
		</p>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="btn-primary btn">ส่งโครงงาน</a>
	</div>
	<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
		<Icon icon="mdi:menu-down" />
		<span>ดูเพิมเติม</span>
	</div>
</section>
