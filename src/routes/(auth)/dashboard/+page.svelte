<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { toThai } from '$lib/langUtils';
	export let data: PageData;
	let { supabase } = data;

	let isLogginout = false;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await supabase.auth.signOut();
		// TODO: refacto here
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

<section>
	<h1>ยินดีต้อนรับ</h1>
	<p>คุณกำลังเข้าสู่ระบบในฐานะ{toThai(data.role)} ({data.session?.user.email})</p>
	<div class="flex flex-row flex-wrap gap-2 pt-4">
		<a href="/account">
			<button class="btn">การตั้งค่าบัญชี</button>
		</a>
		<button class="btn-error btn" on:click={handleSignOut} disabled={isLogginout}>
			{isLogginout ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
		</button>
	</div>
</section>

<section class="card">
	{#if data.role === 'staff'}
		<h2>เครื่องมือสำหรับเจ้าหน้าที่</h2>
		<div class="">
			<a href="/manage">
				<button class="btn-primary btn">จัดการโครงงาน</button>
			</a>
			<a href="/manage/invite">
				<button class="btn">ส่งคำเชิญสร้างบัญชีใหม่</button>
			</a>
		</div>
	{/if}
</section>
