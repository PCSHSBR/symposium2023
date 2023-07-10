<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import ScrollMagic from 'scrollmagic';
	import animejs from 'animejs';
	import { watchWithFilter } from 'svelte-legos';

	import { calendarData } from '$lib/calendarData';
	import Banner from '$lib/components/banner.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import heropic1 from '$lib/assets/images/HeroPic1.jpg';

	let isLoading = true;
	let isBannerHovered = false;
	var isSafari: boolean;
	let eventdate = new Date('2023-09-03');
	let now = new Date();
	let remaining = new Date(eventdate.getTime() - now.getTime());

	let hero_sticky: HTMLDivElement;
	let hero_section_percent: number;

	setInterval(() => {
		now = new Date();
		remaining = new Date(eventdate.getTime() - now.getTime());
	}, 1000);

	onMount(() => {
		function animation() {
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

			// info animation
			let tl2 = animejs.timeline({ autoplay: false, duration: 1000, easing: 'easeOutExpo' });
			let s2am1 = tl2.add({
				targets: '.info-img',
				opacity: [0, 1],
				scale: [1.5, 1],
				delay: 200
			});
			let s2am2 = tl2.add({
				targets: '.event-info .info-paragrpah',
				opacity: [0, 1]
			});
			let s2am3 = tl2.add({
				targets: ' .event-info .event-poem',
				opacity: [0, 1]
			});

			let s2am4 = animejs({
				targets: '.event-info .background span,.event-info .background svg',
				translateY: [100, 0],
				opacity: [0, 1],
				delay: (el, i) => 200 * i,
				duration: 1000,
				easing: 'easeOutExpo'
			});

			let scene2 = new ScrollMagic.Scene({
				triggerElement: '.event-info',
				triggerHook: 0,
				offset: -(window.innerHeight - 200),
				duration: document.querySelector('.event-info')?.clientHeight
			})
				.on('enter', (e) => {
					tl2.play();
					s2am4.play();
				})
				.addTo(control);
		}

		function interactiveEvent() {
			let event_calendar = document.querySelector('.event-calendar');
			let background = event_calendar?.querySelector('.background');
			let interactiveCircle = background?.querySelector('.interactive');

			window.addEventListener('mousemove', (e) => {
				let event_calendar_rect = event_calendar?.getBoundingClientRect();
				if (
					e.clientY - event_calendar_rect.top < event_calendar?.clientHeight &&
					e.clientY - event_calendar_rect?.top > 0
				) {
					interactiveCircle.style.opacity = '1';
					interactiveCircle.style.left = `${e.clientX - event_calendar_rect.left}px`;
					interactiveCircle.style.top = `${e.clientY - event_calendar_rect.top}px`;
					interactiveCircle.style.transform = `translate(-50%,-50%)`;
					// console.log(e.clientX - event_calendar_rect.left,e.clientY - event_calendar_rect.top);
				} else {
					interactiveCircle.style.opacity = '0';
				}
			});
		}
		interactiveEvent();
		animation();
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
				<!-- <a class="send-project btn-primary btn">ส่งโครงงาน</a> -->
				<a href="#info" class="enter-event btn-primary btn">เข้างาน</a>
			</div>
			<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
				<Icon icon="mdi:menu-down" />
				<span>เข้าสู่งาน</span>
			</div>
		</div>
	</section>
</div>

<div class="info-container relative w-full overflow-hidden" id="info">
	<section class="event-info relative mx-auto max-w-4xl px-10 py-40">
		<div
			class="background absolute -left-10 top-5 -z-40 flex rotate-90 flex-col text-8xl text-base-content/50 blur-md"
		>
			<span class="">WE</span>
			<span class="">BUILD</span>
			<span class="">FUTURE</span>
			<span class="">TOGETER</span>
			<div class="my-2 mr-2 flex">
				<Icon icon="material-symbols:circle" />
				<Icon icon="mdi:triangle" />
				<Icon icon="mdi:square" />
			</div>
		</div>
		<div class="h-40 overflow-hidden rounded-3xl">
			<img src={heropic1} class="info-img h-full w-full object-cover" alt="" />
		</div>
		<div class="info-paragrpah">
			<h1
				class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent"
			>
				PCSHS SYMPOSIUM
			</h1>
			<p class="">
				<span
					class="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent"
					>PCSHS Symposium</span
				> มีเป้าหมายเพื่อส่งเสริมการพัฒนาและเผยแพร่โครงการทางวิทยาศาสตร์และเทคโนโลยีในระดับชาติภายในกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณ์ระดับมัธยมศึกษาตอนปลาย(PCSHS)
				ซึ่งมีทั้งหมด 12 โรงเรียนทั่วประเทศไทย งานนี้ทำหน้าที่เป็นเวทีในการส่งเสริมและอำนวยความสะดวกในความก้าวหน้าทางวิทยาศาสตร์และเทคโนโลยีโดยเปิดโอกาสให้นักเรียนได้แสดงผลงานการวิจัยของพวกเขาด้วยการส่งเสริมการแลกเปลี่ยนความรู้และการทำงานร่วมกัน
				การประชุมสัมมนาพยายามที่จะขับเคลื่อนโครงการทางวิทยาศาสตร์ให้สูงขึ้นไปอีกขั้นซึ่งท้ายที่สุดจะเป็นประโยชน์ต่อความก้าวหน้าและนวัตกรรมของประเทศ
			</p>
		</div>
		<div class="event-poem flex flex-row flex-wrap items-center pt-10">
			<div class="my-2 mr-2 flex">
				<Icon icon="material-symbols:circle" />
				<Icon icon="mdi:triangle" />
				<Icon icon="mdi:square" />
			</div>
			<span class="text-sm"
				>In the realm of science, knowledge ascends, driven by the PCSHS Science Symposium.</span
			>
		</div>
	</section>
	<section class="event-calendar relative mx-auto overflow-hidden bg-base-300">
		<div class="background">
			<span class="circle interactive" />
			<!-- <span class="circle left-10 top-0 scale-[5]" />
			<span class="circle right-0 top-20 scale-[3]" /> -->
		</div>
		<div class="calendar-info relative mx-auto max-w-6xl p-10">
			<div>
				<h1 class="m-0 text-6xl font-bold">Calendar</h1>
				<p class="text-xl">กำหนดการ</p>
			</div>
			<Calendar class="" calenderData={calendarData} />
		</div>
	</section>
</div>

<style lang="postcss">
	.circle {
		z-index: 0;
		@apply absolute h-20 w-20 rounded-full bg-red-800/50 blur-xl transition-colors transition-opacity duration-500;

		&:hover {
			@apply bg-primary/50;
		}
	}
</style>
