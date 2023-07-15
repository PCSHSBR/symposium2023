<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>ยืนยัน</title>
</svelte:head>

<section
	class="mx-auto flex h-[calc(100vh-4rem)] w-[calc(100%-20px)] max-w-2xl flex-col items-center justify-center align-middle"
>
	<a
		href="https://immxnldrjsqvmbiucgyk.supabase.co/auth/v1/verify?token={data.token}&type={data.type}"
	>
		<button class="btn-primary btn"> ยืนยัน </button>
	</a>
</section>
