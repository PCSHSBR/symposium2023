<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import animejs from 'animejs';
	import LoadingPage from '$lib/components/LoadingPage.svelte';
	import { calendarData } from '$lib/calendarData';
	import Banner from '$lib/components/Banner.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import FieldTrip from '$lib/components/FieldTrip.svelte';
	import Schedule from '$lib/components/FieldSchedule.svelte';
	import SpeakerPatentImage from '$lib/assets/images/SpeakerPatent.jpg';
	import { notify } from '$lib/notify';
	import ShirtShow from '$lib/components/ShirtShow.svelte';
	import { toThai } from '$lib/langUtils';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { toast } from '$lib/toastStore';
	import CdnImage from '$lib/components/CDNImage.svelte';
	import DownloadDocuments from '$lib/components/DownloadDocuments/DownloadDocuments.svelte';

	export let data: PageData;

	let isLoading = true;
	let isBannerHovered = false;
	let hero_sticky: HTMLDivElement;
	let hero_section_percent: number;
	let isStandTV: boolean = false;

	function interactiveEvent() {
		const event_calendar = document.querySelectorAll('.hover-effect');

		event_calendar.forEach((item, _) => {
			let background = item.querySelector('.background');
			let interactiveCircle: HTMLElement | null | undefined =
				background?.querySelector('.interactive');
			window.addEventListener('mousemove', (e) => {
				let event_calendar_rect = item?.getBoundingClientRect();
				if (!interactiveCircle) return;
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

	onMount(async () => {
		const ScrollMagic = (await import('scrollmagic')).default;
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
				targets: '.documents',
				opacity: [0, 1],
				delay: 50
			});
			let s1am4 = tl1.add({
				targets: '.date-range',
				opacity: [0, 1],
				delay: 0
			});

			// text-in-out animation
			let scene1_1 = new ScrollMagic.Scene({
				triggerElement: '.hero-sticky',
				triggerHook: 0,
				duration: (document.querySelector('.hero-sticky')?.clientHeight ?? 0) - window.innerHeight
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

			let s2am4 = animejs({
				targets: '.event-info .background span,.event-info .background svg',
				translateY: [100, 0],
				opacity: [0, 1],
				delay: (el, i) => 200 * i,
				duration: 1000,
				easing: 'easeOutExpo'
			});

			let s2am3_2 = tl2.add({
				targets: ' .event-info .event-poem',
				opacity: [0, 1]
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
		interactiveEvent();
		animation();
	});

	async function handleSignInWithGoogle(response) {
		const _noti = notify({
			message: 'กำลังเข้าสู่ระบบ...',
			type: 'default'
		});
		const { data: _data, error } = await data.supabase.auth.signInWithIdToken({
			token: response.credential,
			provider: 'google'
		});
		toast.pop(_noti);
		if (error && error.message !== 'Internal Server Error')
			return notify({
				message: toThai(error.message) || 'ข้อผิดพลาดที่ไม่ทราบสาเหตุ',
				type: 'error'
			});
		if (error && error.message === 'Internal Server Error' && !_data.user) {
			return notify({
				message: 'ไม่พบคุณในระบบ คุณต้องได้รับคำเชิญก่อนจึงสามารถเข้าใช้งานระบบได้',
				initial: 0
			});
		}
		goto('/dashboard');
	}

	onMount(() => {
		window.handleSignInWithGoogle = handleSignInWithGoogle;
		if ($page.url.searchParams.get('standtv'))
			localStorage.setItem('standtv', $page.url.searchParams.get('standtv') ?? '0');
		isStandTV = localStorage.getItem('standtv') === '1' ? true : false;
		// console.log(isStandTV);
	});
</script>

<svelte:head>
	<title>The 3rd PCSHS Science Symposium 2023 @PCSHSBR</title>
	<meta
		name="description"
		content="การนำเสนอผลงานนักเรียนกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3"
	/>
	<meta property="og:url" content="https://3rdpss2023.pcshsbr.ac.th/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="The 3rd PCSHS Science Symposium 2023" />
	<meta
		property="og:description"
		content="การนำเสนอผลงานนักเรียนกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3"
	/>
	<meta
		property="og:image"
		content="https://termtem-cdn.imgix.net/sym2023/og-image.png?w=1200&h=630&fit=crop&auto=compress"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="3rdpss2023.pcshsbr.ac.th" />
	<meta property="twitter:url" content="https://3rdpss2023.pcshsbr.ac.th/" />
	<meta name="twitter:title" content="The 3rd PCSHS Science Symposium 2023" />
	<meta
		name="twitter:description"
		content="การนำเสนอผลงานนักเรียนกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3"
	/>
	<meta
		name="twitter:image"
		content="https://termtem-cdn.imgix.net/sym2023/og-image.png?w=1200&h=630&fit=crop&auto=compress"
	/>
	<script src="https://accounts.google.com/gsi/client" async></script>
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
				class="title absolute top-[15%] px-16 font-display {isStandTV
					? ''
					: 'mix-blend-difference invert'} dark:invert-0 md:px-32"
			>
				<div class="date-range flex flex-row flex-wrap items-center font-display">
					<span>PCSHSBR</span>
					<span class="divider mx-8 h-1 w-16 rounded-sm bg-base-content" />
					<span>4 กันยายน – 6 กันยายน 2566</span>
				</div>
				<h1 class="main-title text-4xl font-black leading-none md:text-6xl">
					<span class="sr-only">The</span> <span class="text-[120px]">3</span><sup
						class="translate-y-[-0.5em] text-[72px]">rd</sup
					> PCSHS Science Symposium
				</h1>
				<p class="sub-title font-display text-xl">
					Improving a Sustainable World through Innovation and Projects
				</p>
				<div class="documents mt-4 flex flex-col flex-wrap items-start gap-1">
					{#if !isStandTV}
						<a class="btn btn-sm" href="/#event-document">
							<Icon icon="mdi:file-pdf" /> บทคัดย่อและบทความวิชาการเผยแพร่
						</a>
						<a class="btn btn-sm" href="/schedule">
							<Icon icon="mdi:bullhorn" /> ลำดับการนำเสนอ
						</a>
						<a href="#shop" class="btn btn-sm bg-gradient-to-l from-primary to-secondary"
							>ซื้อเสื้อ Symposium</a
						>
					{:else}
						<a class="btn btn-lg h-20 w-full justify-start" href="/schedule">
							<Icon icon="mdi:schedule" /> ดูตารางการนำเสนอ
						</a>
						<a class="btn btn-lg h-20 w-full justify-start" href="/#event-schedule">
							<Icon icon="mdi:calendar" /> กำหนดการและลำดับนำเสนอ
						</a>
						<a class="btn btn-lg h-20 w-full justify-start" href="/map">
							<Icon icon="mdi:map" /> แผ่นที่โรงเรียน
						</a>
						<a class="btn btn-ghost btn-lg h-20 w-full justify-start" href="/#event-calendar">
							<Icon icon="mdi:arrow-down" /> เลื่อนลงเพื่อดูข้อมูลเพิ่มเติม
						</a>
					{/if}
				</div>
			</div>
			<div class="absolute bottom-0 flex h-16 w-full flex-col items-center">
				<Icon icon="mdi:menu-down" />
				<span>ข้อมูลงาน</span>
			</div>
		</div>
	</section>
</div>

<div class="info-container relative w-full overflow-hidden" id="info">
	{#if !isStandTV}
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
			<div class="relative h-40 overflow-hidden rounded-3xl">
				<img
					srcset="https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=100 100w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=116 116w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=134 134w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=156 156w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=182 182w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=210 210w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=244 244w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=282 282w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=328 328w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=380 380w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=442 442w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=512 512w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=594 594w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=688 688w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=798 798w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=926 926w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1074 1074w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1246 1246w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1446 1446w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1678 1678w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=1946 1946w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=2258 2258w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=2618 2618w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=3038 3038w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=3524 3524w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=4088 4088w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=4742 4742w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=5500 5500w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=6380 6380w, https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?auto=format,compress&w=7400 7400w"
					src="https://pcshsbr-assets.imgix.net/sym2023/HeroPic1.jpg?ixembed=1689152679867&auto=format,compress"
					class="info-img h-full w-full object-cover"
					alt="ภาพถ่ายบรรยายกาศการนำเสนอโครงงาน"
				/>
			</div>
			<div class="info-paragrpah relative">
				<h1
					class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent"
				>
					PCSHS SCIENCE SYMPOSIUM
				</h1>
				<p class="">
					<span
						class="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent"
						>PCSHS Science Symposium</span
					> มีเป้าหมายเพื่อส่งเสริมการพัฒนาและเผยแพร่โครงงานวิทยาศาสตร์และเทคโนโลยีของนักเรียนภายในกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
					(PCSHS) ทั้ง 12 แห่ง โดยจัดเป็นการนำเสนอผลงานโครงงานของนักเรียนระดับชั้นมัธยมศึกษาปีที่ 6 ณ
					โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยเจ้าภาพ โดยนอกจากเป็นการแสดงผลงานของนักเรียนแล้ว ยังเป็นการเผยแพร่วัฒนธรรมและวิถีชีวิตของคนในท้องถิ่น
					เพื่อการพัฒนานักเรียนให้มีศักยภาพสอดรับกับความต้องการของประเทศ และนำองค์ความรู้มาพัฒนาประเทศในด้านต่าง
					ๆ ต่อไปในอนาคต
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
	{/if}
	{#if !isStandTV}
		<section
			id="event-calendar"
			class="event-calendar hover-effect relative mx-auto overflow-hidden bg-base-300"
		>
			<span class="target-anchor" id="event-schedule" />
			<div class="background">
				<span class="circle interactive bg-primary/50" />
				<span class="circle left-10 top-0 scale-[5] bg-primary/50" />
				<span class="circle right-0 top-20 scale-[3] bg-primary/50" />
			</div>
			<div class="calendar-info relative mx-auto max-w-6xl p-10">
				<div class="pb-4">
					<h2 class="m-0 flex items-center text-6xl font-bold">
						<span>ปฏิทิน</span>
					</h2>
				</div>
				<Calendar class="" calenderData={calendarData} />
			</div>
		</section>
	{/if}
	<section id="event-schedule" class="hover-effect relative mx-auto overflow-hidden bg-base-300">
		<span class="target-anchor" id="event-schedule" />
		<div class="background">
			<span class="circle interactive bg-accent/50" />
			<span class="circle left-10 top-11 scale-[4] bg-accent/70" />
			<span class="circle right-5 top-[70%] scale-[3] bg-accent/70" />
		</div>
		<div class="calendar-info relative mx-auto max-w-6xl p-10">
			<div class="pb-4">
				<h2 class="m-0 flex items-center text-6xl font-bold">
					<span>กำหนดการและลำดับนำเสนอ</span>
				</h2>
			</div>
			<Schedule />
		</div>
	</section>
	{#if !isStandTV}
		<ShirtShow />
	{/if}
	{#if !isStandTV}
		<section id="school-map" class="school-map p-10">
			<a href="/map" target="_blank">
				<div
					class="main-c-1 relative mx-auto h-[30rem] max-w-[60rem] overflow-hidden rounded-3xl transition-all duration-500"
				>
					<div>
						<div
							class="text-c-1 absolute -bottom-[100%] left-0 z-[1000] transition-all duration-500"
						>
							<div class="text-c-2 p-8 transition-all duration-500">
								<h3 class="text-4xl font-bold">แผนที่โรงเรียน</h3>
								<p>คลิกที่นี่เพื่อดูแผนที่โรงเรียน</p>
							</div>
						</div>
					</div>
					<span class="transition-all duration-500" />
					<CdnImage
						class="z-[100] h-full w-full object-cover transition-all duration-500"
						alt="ภาพแผนที่โรงเรียนแบบคร่าว ๆ"
						file="sym2023/school-map.png"
					/>
				</div>
			</a>
		</section>
	{/if}

	{#if !isStandTV}
		<section id="event-trip" class="event-trip relative mx-auto overflow-hidden">
			<div class="mx-auto max-w-6xl p-10">
				<div class="relative z-10">
					<h2 class="m-0 flex items-center text-6xl font-bold">
						<span>ทัศนศึกษา</span>
					</h2>
				</div>
				<FieldTrip />
			</div>
		</section>
	{/if}
	{#if !isStandTV}
		<section id="event-speaker" class="event-speaker relative mx-auto overflow-hidden">
			<div class="mx-auto max-w-6xl p-10">
				<div class="relative z-10">
					<h2 class="m-0 flex items-center text-6xl font-bold">
						<span>วิทยากร</span>
					</h2>
				</div>
				<div class="my-4 grid grid-cols-1 text-center md:grid-cols-2 md:text-left">
					<div class="relative mx-auto max-w-sm overflow-hidden rounded-lg md:mx-0">
						<a href={SpeakerPatentImage} title="สิทธิบัตร"
							><CdnImage
								class="absolute bottom-2 right-2 mx-auto h-auto max-w-[25%] rounded-md shadow-lg"
								file="sym2023/speaker-patent.jpg"
								alt=""
							/></a
						>
						<CdnImage
							file="sym2023/speaker-updated.png"
							class="h-full w-full object-cover"
							alt="วิทยากร"
						/>
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
	{/if}
	{#if !isStandTV}
		<section id="event-document" class="event-document relative mx-auto overflow-hidden">
			<div class="mx-auto max-w-6xl p-10">
				<div class="relative z-10">
					<h2 class="m-0 flex items-center text-6xl font-bold">
						<span>ดาวน์โหลดเอกสาร</span>
					</h2>
					<DownloadDocuments />
				</div>
			</div>
		</section>
	{/if}
</div>
<div
	id="g_id_onload"
	data-client_id="430296940905-hs3h8t91t4q9k5aj5uu6q7it9gdnj70t.apps.googleusercontent.com"
	data-context="signin"
	data-callback="handleSignInWithGoogle"
	data-itp_support="true"
	data-auto_prompt={data.session ? 'false' : 'true'}
/>

<style lang="scss">
	.circle {
		@apply absolute z-0 h-20 w-20 rounded-full blur-xl transition-opacity duration-500;
	}
	.school-map {
		.main-c-1 {
			@apply text-base-100 shadow-xl dark:text-base-content;
			span {
				@apply absolute z-[101] h-full w-full bg-black/0;
			}
			&:hover {
				:global(img) {
					@apply scale-110;
				}
				.text-c-1 {
					@apply bottom-0 left-0;
				}
				span {
					@apply absolute z-[101] h-full w-full bg-black/50;
				}
			}
		}
	}
</style>
