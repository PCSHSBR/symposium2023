<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	export let form: ActionData;
	let isLoading: boolean = false;
	let new_passowrd: string = '';
	let conf_password: string = '';
</script>

<svelte:head>
	<title>ตั่งค่ารหัสผ่านใหม่</title>
</svelte:head>
<section class="m-auto w-[calc(100%-64px)]">
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
			class="flex w-[768px] max-w-md flex-col gap-4"
		>
			<h1 class="mb-3 text-4xl">ตั้งรหัสผ่านใหม่</h1>
			<div class="form-control w-full">
				<label for="new-passwd" class="label-text">รหัสผ่านใหม่</label>
				<input
					class="input-bordered input w-full"
					placeholder="รหัสผ่านใหม่"
					name="password"
					id="new-passwd"
					bind:value={new_passowrd}
					type="password"
					autocomplete="new-password"
				/>
			</div>
			<div class="form-control w-full">
				<label for="confirm-passwd" class="label-text">ยืนยันรหัสผ่านใหม่</label>
				<input
					class="input-bordered input w-full"
					placeholder="ยืนยันรหัสผ่านใหม่"
					name="password-conf"
					type="password"
					id="confirm-passwd"
					bind:value={conf_password}
					autocomplete="new-password"
				/>
			</div>

			{#if new_passowrd.length > 7}
				<p class="flex items-center text-left">
					<Icon icon="mdi:check" class="mr-5" />
					รหัสผ่านอย่างน้อย 8 ตัวอักษร
				</p>
			{:else}
				<p class="flex items-center text-left">
					<Icon icon="mdi:close" class="mr-5" />
					รหัสผ่านอย่างน้อย 8 ตัวอักษร
				</p>
			{/if}
			{#if new_passowrd === conf_password && new_passowrd.length > 7}
				<p class="flex items-center text-left">
					<Icon icon="mdi:check" class="mr-5" />
					รหัสผ่านตรงกัน
				</p>
			{:else}
				<p class="flex items-center text-left">
					<Icon icon="mdi:close" class="mr-5" />
					รหัสผ่านตรงกัน
				</p>
			{/if}

			{#if form?.ok && form?.message}
				<div class="item-start just alert alert-success flex flex-row">
					<Icon icon="mdi:success-bold" width={25} height={25} />
					{form?.message}
				</div>
			{/if}
			{#if !form?.ok && form?.message}
				<div class="alert alert-error">
					<Icon icon="mdi:error" />
					<span>{toThai(form?.message)}</span>
				</div>
			{/if}
			<button class="btn-primary btn" disabled={isLoading}>
				{#if isLoading}
					<span class="loading loading-spinner" />
				{:else}
					บันทึกรหัสผ่านใหม่
				{/if}
			</button>
			<a class="w-full" href="/login">กลับหน้าเข้าสู่ระบบ</a>
		</form>
	</div>
</section>
