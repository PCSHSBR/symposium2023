<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide, fade } from 'svelte/transition';
	import { page } from '$app/stores';

	// function to close the menu, for using with use directive
	function closeMenu(_node?: HTMLElement) {
		return {
			destroy() {
				isMenuOpen = false;
			}
		};
	}

	export let data = $page.data;

	let isNotShowLogin = ['/login', '/controls/dashboard'].includes($page.url.pathname);
	let isMenuOpen: boolean;
</script>

<nav
	class="navbar fixed z-20 h-14 justify-between border-neutral {isMenuOpen
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
		<a class="btn-ghost btn text-xl normal-case" href="/">Symp2023</a>
		<ul class="menu menu-horizontal hidden flex-row px-1 md:flex">
			<li>
				<a href="/" use:closeMenu>หน้าแรก</a>
			</li>
			<li>
				<details>
					<summary>ข้อมูลงาน</summary>
					<ul>
						<li>
							<a href="/" use:closeMenu>แผนที่งาน</a>
						</li>
						<li>
							<a href="/" use:closeMenu>ตารางงาน</a>
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
	<div>
		{#if !isNotShowLogin}
			{#if data.session}
				<a class="btn-primary btn" href="/dashboard">แดชบอร์ด</a>
			{:else}
				<a class="btn-primary btn" href="/login">เข้าสู่ระบบ</a>
			{/if}
		{/if}
	</div>
</nav>

{#if isMenuOpen}
	<div
		class="fixed z-10 h-screen w-screen bg-base-200 md:hidden"
		transition:slide|local={{ duration: 500 }}
	>
		<div
			class="sidemenu absolute left-0 top-[4rem] z-[101] h-[calc(100vh-4rem)] w-screen bg-base-200 shadow-xl md:w-[300px]"
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
								<a href="/" use:closeMenu>แผนที่งาน</a>
							</li>
							<li>
								<a href="/" use:closeMenu>ตารางงาน</a>
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

<style lang="postcss">
	.sidemenu a,
	.sidemenu summary {
		@apply flex h-16 justify-between text-base;
	}
</style>
