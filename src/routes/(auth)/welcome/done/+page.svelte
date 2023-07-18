<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { browser } from '$app/environment';
	export let data: PageData;
	(async () => {
		await data.supabase.auth.refreshSession();
	})();
	onMount(() => {
		setTimeout(() => {
			goto('/auth');
		}, 10000);
	});
	$: {
		if (browser && $page.data.user_metadata.firstname_th) {
			goto('/auth');
		}
	}

	let isShowlink = false;

	setTimeout(() => {
		isShowlink = true;
	}, 8000);
</script>

<div class="card flex max-w-3xl flex-row gap-5 text-primary-content">
	<span class="loading loading-ring loading-lg" />
	<div class="card-body">
		<h2 class="card-title">เรากำลังนำคุณไปที่หน้าถัดไป</h2>
		<p>โปรดรอสักครู่ขณะกำลังกำหนดค่าบัญชีของคุณ...</p>
		{#if isShowlink}
			<small in:fade={{ duration: 750 }}
				>หากคุณไม่ได้รับการเปลี่ยนเส้นทางไปที่หน้าถัดไปภายใน 10 วินาที
				<a href="/auth" class="btn-primary btn-xs btn">คลิกที่นี่</a>
			</small>
		{/if}
	</div>
</div>
