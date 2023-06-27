<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { toThai } from '$lib/langUtils.ts';
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

<h1>ยินดีต้อนรับ</h1>
<p>คุณกำลังเข้าสู่ระบบในฐานะ {toThai(data.role)}</p>
<a href="/account">
	<button class="btn">การตั้งค่าบัญชี</button>
</a>
<button class="btn-error btn" on:click={handleSignOut} disabled={isLogginout}>
	{isLogginout ? 'กำลังออกจากระบบ...' : 'ออกจากระบบ'}
</button>
