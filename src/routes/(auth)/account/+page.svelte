<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import type { PageData } from './$types';
	import { z } from 'zod';
	import Icon from '@iconify/svelte';
	export let data: PageData;
	const emailSchema = z.string().email();

	let isEditing = {
		email: false,
		password: false
	};
	let editingValue = {
		email: '',
		password: ''
	};

	let editingState = {
		email: [true, ''],
		password: [true, '']
	};

	let errors = {
		email: '',
		password: ''
	};

	let isFieldValid = {
		email: true,
		password: true
	};

	async function changeEmail() {
		const { error, data: result } = await data.supabase.auth.updateUser({
			email: editingValue.email
		});
		if (error) return (errors.email = error.message);
		editingState.email = [true, 'ส่งอีเมลสำหรับการยืนยันการเปลี่ยนรหัสผ่านเรียบร้อยแล้ว'];
	}

	async function changePassword() {
		const { error, data: result } = await data.supabase.auth.updateUser({
			password: editingValue.password
		});
		if (error) return (errors.password = error.message);
		editingState.password = [true, 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'];
	}

	let isShowPassword = false;
</script>

<svelte:head>
	<title>บัญชีผู้ใช้ | ระบบจัดการโครงงาน</title>
</svelte:head>

<h1>บัญชีผู้ใช้</h1>

<h2>อีเมล</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-2">
	<span class="w-40">อีเมลปัจจุบัน</span>
	<span class=""
		>{data.session?.user.email}
		<button
			class="btn-secondary btn-xs btn"
			on:click|preventDefault={() => {
				isEditing.email = !isEditing.email;
			}}
			>{#if isEditing.email}ยกเลิกการ{/if}แก้ไข</button
		></span
	>
	{#if isEditing.email}
		<label class="w-40" for="new-email">เปลี่ยนเป็น</label>
		<div>
			<div class="input-group">
				<input
					id="new-email"
					type="email"
					class="{!isFieldValid.email ? 'input-error' : ''} input input-sm w-full"
					placeholder="อีเมลใหม่"
					bind:value={editingValue.email}
					on:change|preventDefault={() => {
						const { success } = emailSchema.safeParse(editingValue.email);
						isFieldValid.email = success;
					}}
				/>
				<button
					class="btn-primary btn-sm btn"
					disabled={!isFieldValid.email}
					on:click|preventDefault={changeEmail}
				>
					ยืนยันอีเมล
				</button>
			</div>
			{#if !isFieldValid.email}
				<span class="label-text text-error">โปรดตรวจสอบอีเมลว่าอยู่ในรูปแบบที่ถูกต้อง</span>
			{/if}
		</div>
	{/if}
	{#if errors.email}
		<div class="alert alert-error col-span-2">
			{errors.email}
		</div>
	{/if}
</div>

<h2>รหัสผ่าน</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-2">
	<span class="w-40">รหัสผ่านปัจจุบัน</span>
	<span class=""
		>********
		<button
			class="btn-secondary btn-xs btn"
			on:click|preventDefault={() => {
				isEditing.password = !isEditing.password;
				if (!isEditing.password) {
					editingValue.password = '';
					isShowPassword = false;
				}
			}}
			>{#if isEditing.password}ยกเลิกการ{/if}แก้ไข</button
		></span
	>
	{#if isEditing.password}
		<label class="w-40" for="new-password">เปลี่ยนเป็น</label>
		<div class="input-group">
			{#if !isShowPassword}
				<input
					id="new-password"
					type="password"
					class="input input-sm w-full"
					placeholder="รหัสผ่านใหม่"
					bind:value={editingValue.password}
					on:change|preventDefault={() => {
						const { success } = z.string().min(8).safeParse(editingValue.password);
						isFieldValid.password = success;
					}}
				/>
			{:else}
				<input
					id="new-password"
					type="text"
					class="input input-sm w-full {isFieldValid.password ? '' : 'input-error'}"
					placeholder="รหัสผ่านใหม่"
					bind:value={editingValue.password}
					on:change|preventDefault={() => {
						const { success } = z.string().min(8).safeParse(editingValue.password);
						isFieldValid.password = success;
					}}
				/>
			{/if}
			<button
				on:click|preventDefault={() => {
					isShowPassword = !isShowPassword;
				}}
				class="swap btn-sm btn {isShowPassword ? 'swap-active' : ''}"
			>
				<span class="sr-only">{isShowPassword ? 'แสดง' : 'ซ่อน'}รหัสผ่าน</span>
				<Icon class="swap-on" icon="mdi:eye" />
				<Icon class="swap-off" icon="mdi:eye-off" />
			</button>
			<button
				class="btn-primary btn-sm btn"
				disabled={!isFieldValid.password}
				on:click|preventDefault={changePassword}
			>
				บันทึก
			</button>
		</div>
		{#if !isFieldValid.password}
			<span class="label-text text-error">รหัสผ่านต้องยาวอย่างน้อย 8 ตัวอักษร</span>
		{/if}
	{/if}
</div>
