<script lang="ts">
	import { goto } from '$app/navigation';
	import type { SupabaseClient } from '@supabase/supabase-js';

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

<section class="m-auto w-[calc(100%-64px)] pt-[calc(6rem)]">
	<div class="flex w-full flex-row flex-wrap justify-between">
		<p class="text-xl">
			{data.session
				? `ยินดีต้อนรับ ${data.session.user.email}`
				: 'คุณยังไม่เข้าสู่ระบบ โปรดเข้าสู่ระบบ'}
		</p>
		<div>
			{#if data.session}
			<a href="/user-infomation" class="btn-primary btn">แก้ไขข้อมูล</a>
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
</section>
