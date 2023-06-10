<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	export let form: ActionData;
	// Client API:
	const { form: sForm, errors, constraints } = superForm(data.form);
	let isLoading: boolean = false;
</script>

<svelte:head>
	<title>รีเซ็ตรหัสผ่านใหม่</title>
</svelte:head>

<div class="flex h-screen items-center justify-center text-center align-middle">
	<form
		method="post"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			isLoading = true;
			return async ({ update, result }) => {
				isLoading = false;
				update({ reset: false });
			};
		}}
		class="flex max-w-md flex-col gap-4"
	>
		<h1 class="mb-3 text-4xl">รีเซ็ตรหัสผ่าน</h1>
		<input
			class="input-bordered input w-full"
			placeholder="ที่อยู่อีเมล"
			name="email"
			autocomplete="email"
			data-invalid={$errors.email}
			value={$sForm.email ?? ''}
			{...$constraints.email}
		/>
		{#if $errors.email ?? form?.message}
			<div class="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{toThai(textListFormatter($errors.email) ?? form?.message)}</span>
			</div>
		{/if}
		{#if form?.ok}
			<div class="item-start just alert alert-success flex flex-row">
				<Icon icon="mdi:success-bold" />
				ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านใหม่เรียบร้อยแล้ว หากที่อยู่อีเมลที่คุณให้มีอยู่จริง
			</div>
		{/if}
		<button class="btn-primary btn" disabled={isLoading}>
			{#if isLoading}
				<span class="loading loading-spinner" />
			{:else}
				รีเซ็ตรหัสผ่าน
			{/if}
		</button>
		<a class="w-full" href="/login">กลับหน้าเข้าสู่ระบบ</a>
		<p class="text-sm italic">
			หากที่อยู่อีเมลที่คุณให้มีอยู่จริง อีเมลสำหรับการตั้งรหัสผ่านใหม่จะถูกส่งไปยังอีเมลนั้น
		</p>
	</form>
</div>
