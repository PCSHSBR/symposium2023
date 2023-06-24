<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from '../../../user-infomation/$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '@iconify/svelte';
	import { textListFormatter, toThai } from '$lib/langUtils';

	export let form: ActionData;
	export let data: PageData;

	const { form: sForm, errors, constraints } = superForm(data.form);

	let isLoading = false;
</script>

<svelte:head>
	<title>แก้ไข</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="m-auto w-[calc(100%-64px)]">
	<div class="flex h-screen items-center justify-center text-center align-middle">
		<form
			method="post"
			use:enhance={({ formElement, formData, action, cancel, submitter }) => {
				isLoading = true;
				return async ({ result, update }) => {
					isLoading = false;
					update({ reset: false });
				};
			}}
			class="flex w-full max-w-md flex-col gap-4"
		>
			<h1 class="mb-3 text-4xl">ใส่ข้อมูลของคุณ</h1>
			<input
				class="input-bordered input w-full"
				placeholder="ชื่อ"
				type="text"
				name="name"
				autocomplete="name"
			/>
			<input
				class="input-bordered input w-full"
				placeholder="นามสกุล"
				type="text"
				name="sirname"
				autocomplete="cc-name"
				required
			/>
			<input
				class="input-bordered input w-full"
				placeholder="โรงเรียน"
				type="text"
				name="school"
				required
			/>
			<input
				class="input-bordered input w-full"
				placeholder="เบอร์มือถือ"
				type="number"
				name="phone"
        autocomplete="tel"
				required
			/>
      <input
				class="input-bordered input w-full"
				placeholder="Email"
				type="email"
				name="email"
        autocomplete="email"
				required
			/>
			<button class="btn-primary btn" disabled={isLoading}>
				{#if isLoading}
					<span class="loading loading-spinner" />
				{:else}
					เข้าสู่ระบบ
				{/if}</button
			>
			<a class="link w-full" href="/reset-password">ลืมรหัสผ่าน</a>
		</form>
	</div>
</section>
