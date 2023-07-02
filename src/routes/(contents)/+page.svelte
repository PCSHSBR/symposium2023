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
				// console.log(hero_section_percent);
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
			targets: '.sub-title , .send-project , .enter-event',
			opacity: [0, 1],
			delay: 100
		});
		let s1am3 = tl1.add({
			targets: '.date-range',
			opacity: [0, 1],
			delay: 0
		});

		// text-in-out animation
		let scene1_1 = new ScrollMagic.Scene({
			triggerElement: '.hero-sticky',
			triggerHook: 0,
			duration: document.querySelector('.hero-sticky')?.clientHeight - window.innerHeight
		})
			.on('enter', (e) => {
				tl1.play();
			})
			.on('leave', (e) => {
				tl1.play();
			})
			.addTo(control);

		// symp quote animation
		let quoteWrapper = document.querySelector('.symp-description p');
		quoteWrapper.innerHTML = quoteWrapper.textContent.replace(
			/\S/g,
			"<span class='letter'>$&</span>"
		);
		let tl2 = animejs.timeline({ autoplay: false, duration: 1000, easing: 'easeOutExpo' });
		let s2am1 = tl2.add({
			targets: '.symp-description p .letter',
			opacity: [0, 1],
			translateY: [40, 0],
			delay: (el, i) => 50 * (i + 1)
		});
		let s2am2 = tl2.add({
			targets: '.symp-description .author',
			opacity: [0, 1],
			translateY: [40, 0],
			delay: 1000
		});

		let scene2 = new ScrollMagic.Scene({
			triggerElement: '.symp-description',
			triggerHook: 0,
			offset: -window.innerHeight / 1.5,
			duration: document.querySelector('.symp-description').clientHeight
		})
			.on('enter', (e) => {
				tl2.play();
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
		<div class="min-h-[-webkit-fill-available] overflow-hidden">
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
					<span class="divider mx-8 h-1 w-16 rounded-sm bg-base-content" />
					<span>3 กันยายน - 7 กันยายน 2566</span>
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
				<a href="#info" class="enter-event btn-primary btn">เข้างาน</a>
			</div>
			<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
				<Icon icon="mdi:menu-down" />
				<span>เข้าสู่งาน</span>
			</div>
		</div>
	</section>
</div>

<div class="info-container relative" id="info">
	<section class="event-countdown mx-auto max-w-md px-8 py-16 flex flex-col justify-center items-center gap-4">
		<div class="self-start">
			<span class="text-3xl w-full">เหลืออีก</span>
		</div>
		<div class="flex flex-wrap flex-row justify-center gap-5 text-center">
			<div class="flex flex-col">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{remaining.getMonth()};" />
				</span>
				month
			</div>
			<div class="flex flex-col">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{remaining.getDay()};" />
				</span>
				days
			</div>
			<div class="flex flex-col">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{remaining.getHours()};" />
				</span>
				hours
			</div>
			<div class="flex flex-col">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{remaining.getMinutes()};" />
				</span>
				min
			</div>
			<div class="flex flex-col">
				<span class="countdown font-mono text-5xl">
					<span style="--value:{remaining.getSeconds()};" />
				</span>
				sec
			</div>
		</div>
		<div class="self-end">
			<span class="text-3xl w-full">กิจกรรมจะเริ่ม</span>
		</div>
	</section>
	<section class="symp-description mx-auto flex max-w-2xl flex-col px-8 py-16 bg-base-300 shadow rounded-none my-16 md:rounded-xl">
		<p class="p-4 text-2xl italic">
			"The scientist is not a person who gives the right answers, but the one who asks the right
			questions."
		</p>
		<span class="author relative self-end">Claude Bernard</span>
	</section>
</div>

<style>
	:global(.letter) {
		display: inline-block;
	}
</style>
