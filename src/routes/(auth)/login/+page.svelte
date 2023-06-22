<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '@iconify/svelte';
	import { textListFormatter, toThai } from '$lib/langUtils';

	export let form: ActionData;
	export let data: PageData;

	const { form: sForm, errors, constraints } = superForm(data.form);

	let isLoading = false;
	let showPassword = false;

	$: if (data.session) {
		goto('/auth');
	}
</script>

<svelte:head>
	<title>เข้าสู่ระบบเพื่อดำเนินการต่อ</title>
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
			class="flex w-full max-w-md flex-col gap-1"
		>
			<h1 class="mb-3 text-4xl">เข้าสู่ระบบ</h1>
			<label class="label">
				<span class="label-text"> อีเมล </span>
				<input
					class="input-bordered input w-full"
					placeholder="อีเมล"
					name="email"
					autocomplete="email"
					data-invalid={$errors.email ?? false}
					{...$constraints.email}
					value={$sForm.email ?? ''}
				/>
			</label>
			<label class="label relative">
				<span class="label-text"> รหัสผ่าน </span>
				<input
					class="input-bordered input w-full"
					placeholder="รหัสผ่าน"
					type={showPassword ? 'text' : 'password'}
					name="password"
					autocomplete="current-password"
					data-invalid={$errors.password ?? false}
					{...$constraints.password}
					required
				/>
				<div class="absolute bottom-[16px] right-1 flex items-center px-2">
					<input class="hidden" id="show_password" type="checkbox" bind:checked={showPassword} />
					<button
						type="button"
						class="swap btn-sm btn cursor-pointer rounded px-2 py-1 text-sm"
						class:swap-active={showPassword}
						aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
						on:click|preventDefault={() => (showPassword = !showPassword)}
					>
						<Icon icon="mdi:eye" class="swap-on text-2xl" />
						<Icon icon="mdi:hide" class="swap-off text-2xl" />
					</button>
				</div>
			</label>
			{#if $errors.email || $errors.password || form?.message}
				<div class="alert alert-error justify-start">
					<Icon icon="mdi:error" class="swap-on text-2xl" />
					<span
						>{textListFormatter($errors.email) ||
							textListFormatter($errors.password) ||
							toThai(form?.message)}</span
					>
				</div>
			{/if}
			<button class="btn-primary btn" disabled={isLoading} type="submit">
				{#if isLoading}
					<span class="loading loading-spinner" aria-label="กำลังโหลด" />
				{:else}
					เข้าสู่ระบบ
				{/if}</button
			>
			<a class="link mt-4 w-full" href="/reset-password">ลืมรหัสผ่าน</a>
		</form>
	</div>
</section>
