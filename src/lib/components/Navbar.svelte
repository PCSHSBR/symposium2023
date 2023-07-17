<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { networkStore } from 'svelte-legos';
	import LogoWithText from '$lib/components/LogoWithText.svelte';
	import Logo from '$lib/components/Logo.svelte';
	const networkInfo = networkStore();

	// function to close the menu, for using with use directive
	function closeMenu(_node?: HTMLElement) {
		return {
			destroy() {
				isMenuOpen = false;
			}
		};
	}

	onMount(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > window.innerHeight * 2) {
				isClearBanner = true;
			} else {
				isClearBanner = false;
			}
		});
	});

	export let data = $page.data;

	let isNotShowLogin = ['/login'].includes($page.url.pathname);
	let isMenuOpen: boolean;
	let isClearBanner: boolean;
	let isLogginout = !data.session;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await data.supabase.auth.signOut();
		// TODO: refacto here
		if (result.error) {
			alert(result.error.message);
		}
		isLogginout = false;
		goto('/login');
	};
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
				class="swap btn-ghost swap-rotate btn-square btn md:hidden"
				on:click={() => {
					isMenuOpen = !isMenuOpen;
				}}
			>
				<input class="hidden" type="checkbox" bind:checked={isMenuOpen} />
				<Icon icon="mdi:menu" class="swap-off text-2xl" />
				<Icon icon="mdi:close" class="swap-on text-2xl" />
			</button>
		</label>
		<a class="btn-ghost btn text-xl normal-case" href="/">
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
							<a href="/#event-schedule" use:closeMenu>ตารางงาน</a>
						</li>
						<li>
							<a href="/#event-trip" use:closeMenu>ฟิวทริป</a>
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
				<a href="/" use:closeMenu>ช่องทางติดต่อ</a>
			</li>
		</ul>
	</div>
	<div class="gap-4">
		{#if !$networkInfo.isOnline}
			<div class="flex flex-row gap-3 text-warning">
				<Icon icon="mdi:wifi-alert" class="h-6 w-6" />
				<span class="hidden xs:inline"> คุณไม่ได้เชื่อมต่ออินเตอร์เน็ต </span>
			</div>
		{/if}
		{#if !isNotShowLogin}
			{#if data.session}
				<!-- <a class="btn-primary btn" href="/dashboard">แดชบอร์ด</a> -->
				<div class="dropdown-end dropdown-hover dropdown">
					<button tabindex="0" class="btn-primary btn-square btn">
						<Icon icon="line-md:account" class="h-5 w-5" />
						<span class="sr-only">เปิดเครื่องมือผู้ใช้</span>
					</button>
					<ul class="dropdown-content menu rounded-box w-52 bg-base-200 shadow">
						<li class="menu-title text-sm">
							ยินดีต้อนรับ, {data.user_metadata?.firstname_th}
							{data.user_metadata?.lastname_th}
						</li>
						<li>
							<a href="/dashboard">
								<Icon icon="mdi:view-dashboard" class="h-5 w-5" />
								เครื่องมือ
							</a>
						</li>
						{#if data.user_metadata?.role === 'student-team-contact'}
							<li>
								<a href="/my-project">
									<Icon icon="mdi:account-group" class="h-5 w-5" />
									จัดการโครงงาน
								</a>
							</li>
						{/if}
						<li>
							<a href="/account">
								<Icon icon="mdi:account" class="h-5 w-5" />
								บัญชีของฉัน
							</a>
						</li>
						<li>
							<a href="/logout" class="btn-error btn-outline">
								<Icon icon="mdi:logout" class="h-5 w-5" />
								ออกจากระบบ</a
							>
						</li>
					</ul>
				</div>
			{:else}
				<a class="btn-primary btn" href="/login">เข้าสู่ระบบ</a>
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
			class="sidemenu absolute left-0 top-[4rem] z-[999] h-[calc(100vh-4rem)] w-screen bg-base-200 shadow-xl md:w-[300px]"
		>
			<ul class="menu w-full px-1">
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
								<a href="/#event-schedule" use:closeMenu>ตารางงาน</a>
							</li>
							<li>
								<a href="/#event-trip" use:closeMenu>ฟิวทริป</a>
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
					<a href="/" use:closeMenu>ช่องทางติดต่อ</a>
				</li>
				<li>
					<a href="/faq" use:closeMenu>FAQ</a>
				</li>
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
