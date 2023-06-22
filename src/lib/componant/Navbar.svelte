<script lang="ts">
	import Icon from '@iconify/svelte';
	import postcss from 'postcss';
	import { slide, fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let isNotShowLogin = ['/login', '/controls/dashboard'].includes($page.url.pathname);
	console.log(isNotShowLogin);

	let isMenu: boolean;
</script>

<nav
	class="navbar absolute z-20
 justify-between border-neutral {isMenu ? 'bg-transparent' : 'bg-base-100/70'} backdrop-blur-sm"
>
	<div>
		<label class="swap btn-ghost swap-rotate btn-square btn md:hidden">
			<input type="checkbox" bind:checked={isMenu} />
			<Icon icon="material-symbols:menu" class="swap-off text-2xl" />
			<Icon icon="material-symbols:close" class="swap-on text-2xl" />
		</label>
		<a class="btn-ghost btn text-xl normal-case" href="/">Symp2023</a>
		<ul class="menu menu-horizontal hidden flex-row px-1 md:flex">
			<li>
				<a
					href="/"
					on:click={() => {
						isMenu = !isMenu;
					}}>หน้าแรก</a
				>
			</li>
			<li>
				<details>
					<summary>ข้อมูลงาน</summary>
					<ul>
						<li>
							<a
								href="/"
								on:click={() => {
									isMenu = !isMenu;
								}}>แผนที่งาน</a
							>
						</li>
						<li>
							<a
								href="/"
								on:click={() => {
									isMenu = !isMenu;
								}}>ตารางงาน</a
							>
						</li>
					</ul>
				</details>
			</li>
			<li>
				<a
					href="/"
					on:click={() => {
						isMenu = !isMenu;
					}}>ช่องทางติดต่อ</a
				>
			</li>
			<li>
				<a
					href="/faq"
					on:click={() => {
						isMenu = !isMenu;
					}}>FAQ</a
				>
			</li>
		</ul>
	</div>
	<div>
		{#if !isNotShowLogin}
			{#if data.session}
				<a class="btn-primary btn" href="/auth">แดร์ชบอร์ด</a>
			{:else}
				<a class="btn-primary btn" href="/login">เข้าสู่ระบบ</a>
			{/if}
		{/if}
	</div>
</nav>

{#if isMenu}
	<div
		class="absolute h-screen w-screen bg-base-200 md:hidden"
		transition:slide|local={{ duration: 500 }}
	>
		<div
			class="sidemenu absolute left-0 top-[4rem] z-[101] h-[calc(100vh-4rem)] w-screen bg-base-200 shadow-xl md:w-[300px]"
		>
			<ul class="menu w-full px-1">
				<li>
					<a
						href="/"
						on:click={() => {
							isMenu = !isMenu;
						}}>หน้าแรก</a
					>
				</li>
				<li>
					<details>
						<summary>ข้อมูลงาน</summary>
						<ul>
							<li>
								<a
									href="/"
									on:click={() => {
										isMenu = !isMenu;
									}}>แผนที่งาน</a
								>
							</li>
							<li>
								<a
									href="/"
									on:click={() => {
										isMenu = !isMenu;
									}}>ตารางงาน</a
								>
							</li>
						</ul>
					</details>
				</li>
				<li>
					<a
						href="/"
						on:click={() => {
							isMenu = !isMenu;
						}}>ช่องทางติดต่อ</a
					>
				</li>
				<li>
					<a
						href="/faq"
						on:click={() => {
							isMenu = !isMenu;
						}}>FAQ</a
					>
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
