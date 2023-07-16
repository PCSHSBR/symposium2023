<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';
	import { notify } from '$lib/notify';
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
	<h1>ยินดีต้อนรับ {data.user_metadata?.firstname_th ?? ''}!</h1>
	<div class="md:grid md:grid-cols-2">
		<p>คุณกำลังเข้าสู่ระบบในฐานะ{toThai(data.role)} ({data.session?.user.email})</p>
		<div class="flex flex-row flex-wrap gap-2 pt-4">
			<a href="/account">
				<button class="btn-sm btn">การตั้งค่าบัญชี</button>
			</a>
			<button class="btn-error btn-sm btn" on:click={handleSignOut} disabled={isLogginout}>
				{isLogginout ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
			</button>
		</div>
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

	{#if data.role === 'student-team-contact'}
		<h2>เครื่องมือสำหรับทีมโครงงานนักเรียน</h2>
		<div class="flex flex-col">
			<a href="/my-project">
				<button class="btn-primary btn-block btn">
					<Icon icon="mdi:arrow-projectile-multiple" class="h-5 w-5" />
					จัดการโครงงานของฉัน
				</button>
			</a>
		</div>
	{/if}
	{#if data.role === 'teacher'}
		<h2>เครื่องมือสำหรับครู</h2>
		<div class="">
			<a href="/manage/invite">
				<button class="btn">ส่งคำเชิญให้นักเรียน</button>
			</a>
		</div>
	{/if}
	{#if data.role === 'school-contact'}
		<h2>เครื่องมือสำหรับผู้ประสารงาน</h2>
		<div class="">
			<a href="/manage/invite">
				<button class="btn">ส่งคำเชิญให้ครู</button>
			</a>
		</div>
	{/if}
</section>
