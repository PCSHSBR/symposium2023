<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import Icon from '@iconify/svelte';

	export let data;
	let { supabase } = data;

	let isLogginout = false;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await supabase.auth.signOut();
		if (result.error) {
			alert(result.error.message);
		}
		isLogginout = false;
		goto('/login');
	};
</script>

<svelte:head>
	<title>แดชบอร์ด</title>
</svelte:head>

<section class="m-auto w-[calc(100%-64px)] pt-[calc(6rem)]">
	<div class="flex w-full flex-row flex-wrap items-center justify-between">
		<div>
			<p class="text-2xl">
				<b> {data.session ? `ยินดีต้อนรับ` : 'คุณยังไม่เข้าสู่ระบบ โปรดเข้าสู่ระบบ'}</b>
			</p>
			<p class="text-xl">{data.session?.user.email ?? 'โปรดเข้าสู่ระบบ'}</p>
		</div>
		<div>
			{#if data.session}
				<a href="/controls/user-infomation" class="btn-primary btn">ข้อมูลส่วนตัว</a>
				<button class="btn-primary btn" on:click={handleSignOut} disabled={isLogginout}>
					{#if isLogginout}
						<span class="loading loading-spinner" />
					{:else}
						ออกจากระบบ
					{/if}
				</button>
			{:else}
				<a href="/login" class="btn-primary btn">เข้าสู่ระบบ</a>
			{/if}
		</div>
	</div>
	<div class="mt-5 flex flex-row flex-wrap items-center">
		<div
			class="flex w-full flex-col items-center justify-center rounded-lg bg-base-200 p-2 align-middle shadow-sm md:flex-row md:justify-between"
		>
			<div class="flex flex-col items-center md:flex-row">
				<Icon icon="mdi:close" class="m-10 text-5xl" />
				<div class="flex flex-col">
					<h2 class="text-xl">ยังไม่ส่งโครงงาน</h2>
					<p class="whitespace-pre-line">สามารถส่งได้ถึง 25/07/2023</p>
				</div>
			</div>
			<a href="/send" class="btn-primary btn m-10">ส่งโครงงาน</a>
		</div>
	</div>
</section>
