<script lang="ts">
	import { page } from '$app/stores';
	import PasswordRequirementsBox from '$lib/components/PasswordRequirementsBox.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { toThai } from '$lib/langUtils';
	import { goto } from '$app/navigation';
	export let data: PageData;

	let formValue = {
		password: '',
		confirmPassword: ''
	};
	let errorMessage: string | undefined;
	let doneMessage: string | undefined;
	let isPasswordOK = false;
	let isLoading = false;
	const redirect = $page.url.searchParams.get('redirect') || '/login';

	async function handleSubmit() {
		isLoading = true;
		if (!isPasswordOK) return;
		const { error } = await data.supabase.auth.updateUser({
			password: formValue.password
		});
		isLoading = false;
		if (error) {
			errorMessage = toThai(`${error.name}: ${error.message}`);
			return;
		}
		doneMessage = `ตั้งค่ารหัสผ่านใหม่สำหรับ ${$page.data.session?.user.email} เรียบร้อยแล้ว`;
	}
</script>

<!-- https://symposium2023.vercel.app/
#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg3OTgyODQyLCJpYXQiOjE2ODc5NzkyNDIsInN1YiI6ImFhNjE2NmFhLWE4Y2MtNDc0Ny1hMmI1LTc4OTc5OTA2MDBlYSIsImVtYWlsIjoibWFucGF0c2Fnb3JueStzdGFmZkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7Imludml0ZWRfYnkiOiJtYW5wYXRzYWdvcm55QGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTY4Nzk3OTI0Mn1dLCJzZXNzaW9uX2lkIjoiOTQ0NmVhM2ItZDdlMy00NTA5LThlZTYtMTQ0NGRmZTU3YjA4In0.FT-b3UVL9HjXzWA9Y_WMP85Ixe9XbAFffHpypdsphzg
&expires_in=3600 
&refresh_token=NNnVhBWplPw4COXOvABGAA 
&token_type=bearer 
&type=recovery -->

<svelte:head>
	<title>ตั้งค่ารหัสผ่านใหม่ของคุณ | ระบบจัดการโครงงาน</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1>ตั้งค่ารหัสผ่านใหม่ของคุณ</h1>
<div class="alert">
	<Icon icon="mdi:account" class="mr-2 h-6 w-6" />
	<span>คุณกำลังตั้งค่ารหัสผ่านในฐานะ {$page.data.session?.user.email}</span>
</div>
<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
	<label class="label flex-col">
		<span class="label-text">รหัสผ่านใหม่</span>
		<input
			type="password"
			autocomplete="new-password"
			class="input-bordered input w-full"
			bind:value={formValue.password}
		/>
	</label>
	<label class="label flex-col">
		<span class="label-text">ยืนยันรหัสผ่านใหม่อีกครั้ง</span>
		<input
			type="password"
			class="input-bordered input w-full"
			autocomplete="new-password"
			bind:value={formValue.confirmPassword}
		/>
	</label>
	<PasswordRequirementsBox
		password={formValue.password}
		confirmPassword={formValue.confirmPassword}
		bind:isPass={isPasswordOK}
	/>
	{#if errorMessage || doneMessage}
		<div class="alert {doneMessage ? 'alert-success' : 'alert-error'}">
			{#if doneMessage}
				<Icon icon="mdi:check" class="h-6 w-6" />
			{:else}
				<Icon icon="mdi:alert-circle" class="h-6 w-6" />
			{/if}
			<span>{errorMessage || doneMessage}</span>
		</div>
	{/if}
	<button type="submit" class="btn-primary btn-block btn" disabled={!isPasswordOK || isLoading}>
		{#if isLoading}
			<span class="loading-spinner" />
		{:else}
			ตั้งค่ารหัสผ่านใหม่
		{/if}
	</button>
</form>
