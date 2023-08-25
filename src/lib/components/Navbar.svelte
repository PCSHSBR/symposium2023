<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { networkStore } from 'svelte-legos';
	import LogoWithText from '$lib/components/LogoWithText.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { featureFlags } from '$lib/featureFlags';
	import { notify } from '$lib/notify';
	const networkInfo = networkStore();

	// function to close the menu, for using with use directive
	function closeMenu(_node?: HTMLElement) {
		_node?.addEventListener('click', () => {
			isMenuOpen = false;
		});
		return {
			destroy() {
				isMenuOpen = false;
			}
		};
	}

	onMount(() => {
		window.addEventListener('scroll', () => {
			isClearBanner = window.scrollY > window.innerHeight * 2;
		});
	});

	export let data = $page.data;

	let isNotShowLogin = !featureFlags.openForLogin || ['/login'].includes($page.url.pathname);
	let isMenuOpen: boolean;
	let isClearBanner: boolean;
	let isLogginout = !data.session;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await data.supabase.auth.signOut();
		if (result.error) {
			notify({
				message: result.error.message,
				type: 'error'
			});
		}
		isLogginout = false;
		if (!featureFlags.openForLogin) {
			return goto('/');
		}
		goto('/login');
	};

	let timeShow = {
		d: 0,
		h: 0,
		m: 0,
		s: 0
	};

	const targetDate = new Date('2023-09-04T08:00:00+07:00').getTime();
	function countdown() {
		const now = new Date().getTime();
		const distance = targetDate - now;
		timeShow.d = Math.floor(distance / (1000 * 60 * 60 * 24));
		timeShow.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		timeShow.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		timeShow.s = Math.floor((distance % (1000 * 60)) / 1000);
	}
	countdown();
	setInterval(countdown, 1000);
</script>

<nav
	class="navbar fixed z-[1000] h-14 justify-between border-neutral {isMenuOpen
		? 'bg-transparent'
		: 'bg-base-100/70'} backdrop-blur-sm"
>
	<div>
		<label>
			<button
				aria-label="เปิด/ปิดเมนู"
				type="button"
				class="btn btn-square btn-ghost swap swap-rotate md:hidden"
				on:click={() => {
					isMenuOpen = !isMenuOpen;
				}}
			>
				<input class="hidden" type="checkbox" bind:checked={isMenuOpen} />
				<Icon icon="mdi:menu" class="swap-off text-2xl" />
				<Icon icon="mdi:close" class="swap-on text-2xl" />
			</button>
		</label>
		<a class="btn btn-ghost text-xl normal-case" href="/">
			<LogoWithText class="hidden h-full w-full md:block" />
			<Logo class="block h-5/6 w-full md:hidden" />
		</a>
		<ul class="menu menu-horizontal hidden flex-row px-1 md:flex">
			<li>
				<a href="/" use:closeMenu>หน้าแรก</a>
			</li>
			<li>
				<details>
					<summary>ข้อมูลงาน</summary>
					<ul>
						<li>
							<a href="/#event-calendar" use:closeMenu>กำหนดการ</a>
						</li>
						<li>
							<a href="/#event-schedule" use:closeMenu>ตารางกิจกรรม</a>
						</li>
						<li>
							<a href="/#event-trip" use:closeMenu>ทัศนศึกษา</a>
						</li>
						<li>
							<a href="/#event-speaker" use:closeMenu>วิทยากร</a>
						</li>
						<li>
							<a href="/#event-document" use:closeMenu>ดาวโหลดเอกสาร</a>
						</li>
					</ul>
				</details>
			</li>
			<li>
				<details>
					<summary>โครงงาน</summary>
					<ul>
						<li>
							<a href="/projects" use:closeMenu>โครงงานพร้อมรหัสโครงงาน</a>
						</li>
						<li>
							<a href="/schedule" use:closeMenu>ลำดับการนำเสนอโครงงาน</a>
						</li>
					</ul>
				</details>
			</li>
			<!-- <li>
				<a href="/" use:closeMenu>ช่องทางติดต่อ</a>
			</li> -->
		</ul>
	</div>
	<div class="gap-4">
		<div class="">
			<a
				href="https://web.facebook.com/events/1148410762743328"
				class="countdown text-right font-mono font-semibold"
			>
				{#if timeShow.d > 0}
					<span style:--value={timeShow.d} />d
				{/if}
				{#if timeShow.h > 0 || timeShow.d > 0}
					<span style:--value={timeShow.h} />h
				{/if}
				{#if timeShow.m > 0 || timeShow.h > 0 || timeShow.d > 0}
					<span style:--value={timeShow.m} />m
				{/if}
				{#if timeShow.s > 0 || timeShow.m > 0 || timeShow.h > 0 || timeShow.d > 0}
					<span style:--value={timeShow.s} />s
				{/if}
			</a>
		</div>
		{#if !isNotShowLogin}
			{#if data.session}
				<!-- <a class="btn-primary btn" href="/dashboard">แดชบอร์ด</a> -->
				<div class="dropdown dropdown-end dropdown-hover">
					<button tabindex="0" class="btn btn-square btn-primary">
						<Icon icon="line-md:account" class="h-5 w-5" />
						<span class="sr-only">เปิดเครื่องมือผู้ใช้</span>
					</button>
					<ul class="menu dropdown-content rounded-box w-52 bg-base-200 shadow">
						{#if data.user_metadata?.firstname_th && data.user_metadata?.lastname_th}
							<li class="menu-title text-sm">
								ยินดีต้อนรับ, {data.user_metadata?.firstname_th}
								{data.user_metadata?.lastname_th}
							</li>
						{/if}
						<li>
							<a href="/dashboard">
								<Icon icon="mdi:view-dashboard" class="h-5 w-5" />
								เครื่องมือ
							</a>
						</li>
						{#if data.role === 'teacher' || data.role === 'school-contact' || data.role === 'staff'}
							<li>
								<a href="/manage/invite">
									<Icon icon="mdi:account-multiple-plus" class="h-5 w-5" />
									ส่งคำเชิญ
								</a>
							</li>
							<li>
								<a href="/projects">
									<Icon icon="mdi:arrow-projectile-multiple" class="h-5 w-5" />
									รายการโครงงาน
								</a>
							</li>
						{/if}
						{#if data.user_metadata?.role === 'student-team-contact'}
							<li>
								<a href="/my-project">
									<Icon icon="mdi:account-group" class="h-5 w-5" />
									จัดการโครงงานของฉัน
								</a>
							</li>
						{/if}
						<li>
							<a href="/auth/list-of-invited">
								<Icon icon="mdi:email-search" class="h-5 w-5" />
								อีเมลที่ได้รับเชิญแล้ว
							</a>
						</li>
						<li>
							<a href="/account">
								<Icon icon="mdi:account" class="h-5 w-5" />
								บัญชีของฉัน
							</a>
						</li>
						<li>
							<a
								href="/logout"
								class="g_id_signout btn-error btn-outline"
								on:click|preventDefault={handleSignOut}
							>
								<Icon icon="mdi:logout" class="h-5 w-5" />
								ออกจากระบบ</a
							>
						</li>
					</ul>
				</div>
			{:else}
				<a class="btn btn-primary" href="/login">เข้าสู่ระบบ</a>
			{/if}
		{/if}
	</div>
</nav>

{#if isMenuOpen}
	<div
		class="fixed z-[999] h-screen w-screen bg-base-200 md:hidden"
		transition:slide|local={{ duration: 500 }}
	>
		<div
			class="sidemenu absolute left-0 top-[4rem] z-[999] h-[calc(100vh-4rem)] max-h-screen w-screen overflow-y-auto bg-base-200 shadow-xl md:w-[300px]"
		>
			<ul class="menu w-full px-1">
				<li>
					<a href="/" use:closeMenu>หน้าแรก</a>
				</li>
				<li>
					<a href="/#event-document" use:closeMenu>ดาวน์โหลดเอกสาร</a>
				</li>
				<li>
					<details>
						<summary>ข้อมูลงาน</summary>
						<ul>
							<li>
								<a href="/#event-calendar" use:closeMenu>กำหนดการ</a>
							</li>
							<li>
								<a href="/#event-schedule" use:closeMenu>ตารางงาน</a>
							</li>
							<li>
								<a href="/#event-trip" use:closeMenu>ทัศนศึกษา</a>
							</li>
							<li>
								<a href="/#event-speaker" use:closeMenu>วิทยากร</a>
							</li>
							<li>
								<a href="/#event-document" use:closeMenu>เอกสาร</a>
							</li>
						</ul>
					</details>
				</li>
				<li>
					<details>
						<summary>โครงงาน</summary>
						<ul>
							<li>
								<a href="/projects" use:closeMenu>โครงงานพร้อมรหัสโครงงาน</a>
							</li>
							<li>
								<a href="/schedule" use:closeMenu>ลำดับการนำเสนอโครงงาน</a>
							</li>
						</ul>
					</details>
				</li>
				<!-- <li>
					<a href="/" use:closeMenu>ช่องทางติดต่อ</a>
				</li> -->
			</ul>
		</div>
	</div>
{/if}

<style lang="scss">
	.sidemenu a,
	.sidemenu summary {
		@apply flex h-16 justify-between text-base;
	}
</style>
