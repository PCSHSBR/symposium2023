<script lang="ts">
	import { onMount } from 'svelte';
	import Banner from '$lib/components/banner.svelte';
	import Icon from '@iconify/svelte';
	import ScrollMagic from 'scrollmagic';
	import animejs from 'animejs';

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
		let control = new ScrollMagic.Controller();

		// hero-sticky progress scroll
		let scene1 = new ScrollMagic.Scene({
			triggerElement: '.hero-sticky',
			triggerHook: 0,
			duration: document.querySelector('.hero-sticky')?.clientHeight
		})
			.on('progress', (e) => {
				hero_section_percent = e.progress;
				console.log(hero_section_percent);
			})
			.addTo(control);

		// text animation
		let tl1 = animejs.timeline({ autoplay: true, duration: 1000, easing: 'easeOutExpo' });
		let s1am1 = tl1.add({
			targets: '.main-title ',
			opacity: [0, 1],
			delay: 1000
		});
		let s1am2 = tl1.add({
			targets: '.sub-title , .send-project',
			opacity: [0, 1],
			delay: 100
		});
		let s1am3 = tl1.add({
			targets: '.date-range',
			opacity: [0, 1],
			delay: 0,
		});

		// text-in-out animation
		let scene1_1 = new ScrollMagic.Scene({
			triggerElement: '.hero-sticky',
			triggerHook: 0,
			duration: document.querySelector('.hero-sticky')?.clientHeight - window.innerHeight
		})
			.on('enter', (e) => {
				s1am1.play();
				s1am2.play();
				s1am3.play();
			})
			.on('leave', (e) => {
				s1am1.play();
				s1am2.play();
				s1am3.play();
			})
			.addTo(control);
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
			<Banner
				bind:isLoading
				bind:isHover={isBannerHovered}
				bind:scrollProgress={hero_section_percent}
			/>
		</div>
		<div>
			<div
				class="title absolute top-[15%] px-16 mix-blend-difference invert dark:mix-blend-difference dark:invert-0 md:px-32"
			>
				<div class="date-range flex flex-row flex-wrap items-center">
					<span>PCSHSBR</span>
					<span class="divider w-16 h-1 bg-base-content rounded-sm mx-8" />
					<span>9 กันยายน 2566</span>
				</div>
				<h1 class="main-title text-4xl font-black leading-none md:text-6xl">
					<span class="text-[128px]">3</span><span class="align-top text-xl">rd</span> PCSHS Science
					Symposium
				</h1>
				<p class="sub-title">
					มาร่วมสร้างสรรค์นวัตกรรมที่จะเปลี่ยนโลกให้ดีขึ้นผ่านการนำเสนอผลงานโครงงานของคุณกันเถอะ!
				</p>
				<!-- svelte-ignore a11y-missing-attribute -->
				<a class="send-project btn-primary btn">ส่งโครงงาน</a>
			</div>
			<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
				<Icon icon="mdi:menu-down" />
				<span>เข้าสู่งาน</span>
			</div>
		</div>
	</section>
</div>

<div class="info-sticky">
	<section class="symp-description mx-auto p-32">
		<p class="max-w-sm">
			"Symposium นั้นเป็นงานที่รวมนวัตกรรมและความคิดของผู้คนหลากหลายความคิดมาไว้ในที่เดียว โดยมีเป้าหมายเพื่อสร้างสรรค์นวัตกรรมที่จะเปลี่ยนโลกให้ดีขึ้น และเป็นการสร้างความรู้ความเข้าใจให้กับผู้คนที่เข้าร่วมงาน โดยเฉพาะนักเรียนที่เข้าร่วมงาน ซึ่งจะได้รับความรู้ความเข้าใจในการสร้างสรรค์นวัตกรรม และการนำเสนอผลงานโครงงาน ซึ่งจะเป็นประโยชน์ต่อการเรียนรู้ในอนาคตของนักเรียนอย่างแน่นอน"
		</p>
	</section>
</div>
