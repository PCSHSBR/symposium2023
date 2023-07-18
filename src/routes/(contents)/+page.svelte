<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import ScrollMagic from 'scrollmagic';
	import animejs from 'animejs';
	import LoadingPage from '$lib/components/LoadingPage.svelte';
	import Speaker from '$lib/assets/images/Speaker.png';
	import { calendarData } from '$lib/calendarData';
	import Banner from '$lib/components/Banner.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import FieldTrip from '$lib/components/FieldTrip.svelte';
	import FieldSchedule from '$lib/components/FieldSchedule.svelte';
	import SpeakerPatentImage from '$lib/assets/images/SpeakerPatent.jpg';

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
		let is_hero_showed = false;
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
					if (!is_hero_showed) {
						tl2.play();
						s2am4.play();
						is_hero_showed = true;
					}
				})
				.addTo(control);
		}

		function interactiveEvent() {
			let event_calendar = document.querySelectorAll('.hover-effect');

			event_calendar.forEach((item, index) => {
				let background = item.querySelector('.background');
				let interactiveCircle = background?.querySelector('.interactive');

				window.addEventListener('mousemove', (e) => {
					let event_calendar_rect = item?.getBoundingClientRect();
					if (
						e.clientY - event_calendar_rect.top < item?.clientHeight &&
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
	<meta property="og:url" content="https://3rdpss2023.pcshsbr.ac.th/" />
	<meta
		property="og:image"
		content="https://pcshsbr-assets.imgix.net/sym2023/og_image.png?w=1200&h=627&fit=crop&auto=format%2Cenhance%2Ccompress"
	/>
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="627" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="The 3rd PCSHS Science Symposium 2023 @PCSHSBR" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@pcshsbr" />
	<meta name="twitter:creator" content="@pcshsbr" />
	<meta name="twitter:title" content="The 3rd PCSHS Science Symposium 2023 @PCSHSBR" />
	<meta
		name="twitter:description"
		content="ยินดีต้อนรับสู่งานนำเสนอผลงานโครงงานนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยของระดับชั้นมัธยมศึกษาปีที่ 6 The 3rd PCSHS Science Symposium 2023 ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์"
	/>
	<meta
		name="twitter:image"
		content="https://pcshsbr-assets.imgix.net/sym2023/og_image.png?w=1200&h=627&fit=crop&auto=format%2Cenhance%2Ccompress"
	/>
	<meta name="twitter:image:alt" content="The 3rd PCSHS Science Symposium 2023 @PCSHSBR" />
	<meta name="twitter:domain" content="https://3rdpss2023.pcshsbr.ac.th/" />
</svelte:head>

<LoadingPage />
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
					<span>4 กันยายน - 6 กันยายน 2566</span>
				</div>
				<h1 class="main-title text-4xl font-black leading-none md:text-6xl">
					<span class="text-[128px]">3</span><sup class="align-top text-xl">rd</sup> PCSHS Science Symposium
				</h1>
				<p class="sub-title text-xl shadow-lg">พัฒนาโลกสู่ความยั่งยืนด้วยนวัตกรรมและโครงงาน</p>
			</div>
			<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
				<Icon icon="mdi:menu-down" />
				<span>ข้อมูลงาน</span>
			</div>
		</div>
	</section>
</div>

<div class="info-container relative w-full overflow-hidden" id="info">
	<section class="event-info relative mx-auto max-w-4xl px-10 py-40">
		<div
			class="background absolute -left-10 top-5 flex rotate-90 flex-col text-8xl text-base-content/50 blur-md"
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
			<img
				srcset="https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=100 100w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=116 116w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=134 134w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=156 156w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=182 182w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=210 210w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=244 244w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=282 282w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=328 328w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=380 380w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=442 442w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=512 512w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=594 594w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=688 688w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=798 798w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=926 926w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1074 1074w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1246 1246w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1446 1446w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1678 1678w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1946 1946w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=2258 2258w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=2618 2618w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=3038 3038w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=3524 3524w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=4088 4088w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=4742 4742w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=5500 5500w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=6380 6380w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=7400 7400w"
				src="https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?ixembed=1689152679867&auto=format,compress"
				class="info-img h-full w-full object-cover"
				alt="ภาพถ่ายบรรยายกาศการนำเสนอโครงงาน"
			/>
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
			<span class="text-sm">Improving a Sustainable World through Innovation and Projects</span>
		</div>
	</section>
	<section
		id="event-calendar"
		class="event-calendar hover-effect relative mx-auto overflow-hidden bg-base-300"
	>
		<span class="target-anchor" id="event-schedule" />
		<div class="background">
			<span class="circle interactive" />
			<span class="circle left-10 top-0 scale-[5]" />
			<span class="circle right-0 top-20 scale-[3]" />
		</div>
		<div class="calendar-info relative mx-auto max-w-6xl p-10">
			<div class="pb-4">
				<h2 class="m-0 flex items-center text-6xl font-bold">
					<Icon icon="mdi:calendar" class="pr-4" /> <span>กำหนดการ</span>
				</h2>
			</div>
			<Calendar class="" calenderData={calendarData} />
			<FieldSchedule />
		</div>
	</section>
	<section id="event-trip" class="event-trip relative mx-auto overflow-hidden">
		<div class="mx-auto max-w-6xl p-10">
			<div class="relative z-10">
				<h2 class="m-0 flex items-center text-6xl font-bold">
					<Icon icon="mdi:location" class="pr-4" /> <span>ทัศนศึกษา</span>
				</h2>
			</div>
			<FieldTrip />
		</div>
	</section>
	<section id="event-speaker" class="event-speaker relative mx-auto overflow-hidden">
		<div class="mx-auto max-w-6xl p-10">
			<div class="relative z-10">
				<h2 class="m-0 flex items-center text-6xl font-bold">
					<Icon icon="mdi:person" class="pr-4" /> <span>วิทยากร</span>
				</h2>
			</div>
			<div class="my-4 grid grid-cols-1 text-center md:grid-cols-2 md:text-left">
				<div class="mx-auto max-w-sm overflow-hidden rounded-lg md:mx-0">
					<img src={Speaker} class="h-full w-full object-cover" alt="Speaker" />
				</div>
				<div class="p-6">
					<h3 class="mb-6 text-2xl font-bold">ดร.สุพรรณ ยอดยิ่งยง</h3>
					<p>
						คว้ารางวัล Special Prize (On stage) จากผลงาน
						"กระบวนการสังเคราะห์ซิลิกาแอโรเจลต้นทุนต่ำด้วยการทำแห้งที่ความดันบรรยากาศ" จาก
						INDONESIAN INVENTION AND INNOVATION PROMOTION ASSOCIATION (INNOPA) ประเทศอินโดนีเซีย
						ในงาน Bitgaram International Exposition of Electric Power Technology (BIXPO 2015)
						ซึ่งจัดขึ้นระหว่างวันที่ 12 - 14
					</p>
				</div>
			</div>
		</div>
	</section>
	<section id="event-document" class="event-document relative mx-auto overflow-hidden">
		<div class="mx-auto max-w-6xl p-10">
			<div class="relative z-10">
				<h2 class="m-0 flex items-center text-6xl font-bold">
					<Icon icon="mdi:document" class="pr-4" /> <span>เอกสารต่าง ๆ</span>
				</h2>
				<div class="flex flex-row flex-wrap">
					<a href="/" class="btn-primary btn"><Icon icon="mdi:download" />เอกสาร</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	.circle {
		@apply absolute z-0 h-20 w-20 rounded-full bg-primary/50 blur-xl transition-opacity duration-500;
	}
</style>
