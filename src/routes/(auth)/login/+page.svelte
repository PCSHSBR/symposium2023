<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { fromJSON } from 'postcss';
	import type { PageData } from './$types.js';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '@iconify/svelte';

	export let form: FormData;
	export let data: PageData;

	const { form: sForm, errors, constraints } = superForm(data.form);

	let isLoading = false;

	if (data.session) {
		goto('/auth');
	}
</script>

<svelte:head>
	<title>เข้าสู่ระบบเพื่อดำเนินการต่อ</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="m-auto max-w-[calc(100%-32px)]">
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
			class="flex w-[400px] flex-col gap-4"
		>
			<h1 class="text-4xl">เข้าสู่ระบบ</h1>
			<input
				class="input-bordered input w-[100%]"
				placeholder="Email"
				name="email"
				value={$sForm.email ?? ''}
			/>
			<input
				class="input-bordered input w-[100%]"
				placeholder="Password"
				type="password"
				name="password"
				required
			/>
			{#if ($errors && $errors.email) || form?.message}
				<div class="alert alert-error justify-start">
					<Icon icon="mdi:error" class="swap-on text-2xl" />
					<span>{$errors.email ?? $errors.password ?? form?.message}</span>
				</div>
			{/if}
			<button class="btn-primary btn" disabled={isLoading}>
				{#if isLoading}
					<span class="loading loading-spinner" />
				{:else}
					เข้าสู่ระบบ
				{/if}</button
			>
			<a class="link w-full" href="/auth/reset-password">ลืมรหัสผ่าน</a>
		</form>
	</div>
</section>
