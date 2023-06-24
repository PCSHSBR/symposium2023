<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { d } from '$lib/langUtils.js';
	import type { PageData } from '$lib/types';

	export let data: PageData;
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
			{#if data.session}
				<p class="text-xl">
					{data.session?.user?.user_metadata?.full_name ?? 'โปรดเพิ่มข้อมูลส่วนตัวของคุณ'}
				</p>
			{/if}
		</div>
		<div>
			{#if data.session}
				<a href="/controls/user-infomation" class="btn-primary btn">ข้อมูลส่วนตัว</a>
				<button class="btn" on:click={handleSignOut} disabled={isLogginout}>
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
</section>
