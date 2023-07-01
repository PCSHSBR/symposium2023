<script lang="ts">
	import { onMount } from 'svelte';
	import Banner from '$lib/components/banner.svelte';
	import Icon from '@iconify/svelte';
	import { calculateProgressPercentage, scaledNumber } from '$lib/animateOnScroll';

	let isLoading = true;
	let isBannerHovered = false;
	var isSafari: boolean;
	let eventdate = new Date('2023-09-03');
	let now = new Date();
	let remaining = new Date(eventdate.getTime() - now.getTime());

	let hero_sticky: HTMLDivElement;
	let hero_section_percent: number;

	console.log(now.toISOString());
	setInterval(() => {
		now = new Date();
		remaining = new Date(eventdate.getTime() - now.getTime());
	}, 1000);

	onMount(() => {
		window.addEventListener('scroll', () => {
			updateAnimation();
		});
		
		function updateAnimation() {
			hero_section_percent = calculateProgressPercentage(document, window, hero_sticky);
			// console.log(`${((scaledNumber(0.5,1,hero_section_percent,0,50))-15)*-1}%`)
			document.querySelector('.title').style.top = `${((scaledNumber(0.5,1,hero_section_percent,0,30))-20)*-1}%`;
			document.querySelector('.title').style.opacity = `${(scaledNumber(0.5,1,hero_section_percent,0,1)-1)*-1}`;
		}
		updateAnimation();
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
	<div class="hero-sticky h-[200vh]" bind:this={hero_sticky}>
		<section
		class="banner sticky top-0"
		on:mouseenter={() => {
			isBannerHovered = true;
		}}
		on:mouseleave={() => {
			isBannerHovered = false;
		}}
	>
	<div class="h-screen overflow-hidden">
		<Banner bind:isLoading bind:isHover={isBannerHovered} bind:bannerContainer={hero_sticky} />
	</div>
	<div>
		<div class="absolute px-16 md:px-32 title">
			<h1
			class=" -leading-[16px] text-4xl font-black mix-blend-difference invert dark:mix-blend-difference dark:invert-0 md:text-6xl"
			>
			<span class="text-[128px]">3</span><span class="align-top text-xl">rd</span> PCSHS Science
			Symposium
		</h1>
		<p class="mix-blend-difference invert dark:mix-blend-difference sub-title dark:invert-0">
			มาร่วมสร้างสรรค์นวัตกรรมที่จะเปลี่ยนโลกให้ดีขึ้นผ่านการนำเสนอผลงานโครงงานของคุณกันเถอะ!
		</p>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="btn-primary btn">ส่งโครงงาน</a>
	</div>
	<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
		<Icon icon="mdi:menu-down" />
		<span>เข้าสู่งาน</span>
	</div>
</div>
</section>
</div>

<div class="info-sticky h-[200vh]" />