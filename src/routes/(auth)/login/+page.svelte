<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import Icon from '@iconify/svelte';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { notify } from '$lib/notify';

	export let form: ActionData;
	export let data: PageData;

	const { form: sForm, errors, constraints } = superForm(data.form);

	let isLoading = false;
	let showPassword = false;

	$: if (data.session) {
		goto($page.url.searchParams.get('redirect') || '/auth');
	}

	async function handleSignInWithGoogle(response) {
		const { data: _data, error } = await data.supabase.auth.signInWithIdToken({
			token: response.credential,
			provider: 'google'
		});
		if (error && error.message !== 'Internal Server Error')
			notify({
				message: toThai(error.message),
				type: 'error'
			});
		if (error && error.message === 'Internal Server Error' && !_data.user) {
			notify({
				message: 'ไม่พบคุณในระบบ คุณต้องได้รับคำเชิญก่อนจึงสามารถเข้าใช้งานระบบได้',
				initial: 0
			});
		}
	}

	onMount(() => {
		window.handleSignInWithGoogle = handleSignInWithGoogle;
	});
</script>

<svelte:head>
	<title>เข้าสู่ระบบเพื่อดำเนินการต่อ</title>
	<meta name="robots" content="noindex, nofollow" />
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<section class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
	<div class="flex h-full w-96 flex-col items-center justify-center text-center align-middle">
		<form
			method="post"
			use:enhance={() => {
				isLoading = true;
				return async ({ update }) => {
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
				<div class="absolute bottom-[16px] right-0 flex items-center px-2">
					<input class="hidden" id="show_password" type="checkbox" bind:checked={showPassword} />
					<button
						type="button"
						class="swap btn-neutral btn-sm btn cursor-pointer rounded px-2 py-1 text-sm"
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
				<div role="alert" class="alert alert-error justify-start">
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
		<div class="divider">หรือ</div>
		<div
			id="g_id_onload"
			data-client_id="430296940905-hs3h8t91t4q9k5aj5uu6q7it9gdnj70t.apps.googleusercontent.com"
			data-context="signin"
			data-ux_mode="popup"
			data-callback="handleSignInWithGoogle"
			data-itp_support="true"
		/>

		<div
			class="g_id_signin"
			data-type="standard"
			data-shape="pill"
			data-theme="outline"
			data-text="signin_with"
			data-size="large"
			data-locale="th"
			data-logo_alignment="left"
			data-width="350"
		/>
		<span class="mt-3 text-sm">
			หากคุณได้รับคำเชิญแล้วแต่ยังไม่ได้ตั้งค่ารหัสผ่าน คุณยังสามารถเข้าสู่ระบบได้ด้วยบัญชี Google
			อีเมลเดียวกัน
		</span>
		<!-- <button class="btn btn-circle btn-block btn-outline">
			<Icon icon="mdi:google" class="text-2xl" />
			เข้าสู่ระบบด้วย Google
		</button> -->
	</div>
</section>

<style lang="scss">
	.label {
		@apply flex-col;
	}
</style>
