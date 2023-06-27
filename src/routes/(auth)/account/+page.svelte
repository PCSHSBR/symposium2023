<script lang="ts">
	import type { Session, User } from '@supabase/supabase-js';
	import type { PageData } from './$types';
	import { z } from 'zod';
	import TickCross from './TickCross.svelte';
	import type { Roles } from '$lib/types';
	export let data: PageData;

	(async () => {
		await data.supabase.auth.refreshSession();
	})();
	const emailSchema = z.string().email();

	let isEditing = {
		email: false,
		password: false
	};
	let editingValue = {
		email: '',
		password1: '',
		password2: ''
	};

	let editingState = {
		email: [false, ''],
		password: [false, '']
	};

	let errors = {
		email: '',
		password: ''
	};

	let isFieldValid = {
		email: false,
		password: false
	};

	async function changeEmail() {
		const { error, data: result } = await data.supabase.auth.updateUser({
			email: editingValue.email
		});
		if (error) return (errors.email = error.message);
		editingState.email = [true, 'ส่งอีเมลสำหรับการยืนยันการแก้ไขอีเมลเรียบร้อยแล้ว'];
	}

	$: {
		isPasswordPassRequirements.length.pass = editingValue.password1.length >= 6;
		isPasswordPassRequirements.uppercase.pass = /[A-Z]/.test(editingValue.password1);
		isPasswordPassRequirements.lowercase.pass = /[a-z]/.test(editingValue.password1);
		isPasswordPassRequirements.number.pass = /[0-9]/.test(editingValue.password1);
		isPasswordPassRequirements.special.pass = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
			editingValue.password1
		);
		isPasswordPassRequirements.match.pass =
			editingValue.password1 === editingValue.password2 && editingValue.password1 !== '';
		isFieldValid.password = Object.values(isPasswordPassRequirements).every(({ pass }) => pass);
	}

	async function changePassword() {
		const { error, data: result } = await data.supabase.auth.updateUser({
			password: editingValue.password2
		});
		if (error) return (errors.password = error.message);
		editingState.password = [true, 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'];
	}

	let isPasswordPassRequirements = {
		length: {
			pass: false,
			label: 'ความยาวไม่น้อยกว่า 6 ตัวอักษร'
		},
		uppercase: {
			pass: false,
			label: 'มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'
		},
		lowercase: {
			pass: false,
			label: 'มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'
		},
		number: {
			pass: false,
			label: 'มีตัวเลขอย่างน้อย 1 ตัว'
		},
		special: {
			pass: false,
			label: 'มีอักขระพิเศษอย่างน้อย 1 ตัว'
		},
		match: {
			pass: false,
			label: 'รหัสผ่านทั้งสองต้องตรงกัน'
		}
	};

	export const rolesDescription: Record<Roles, string | undefined> = {
		'school-contact': 'ผู้ติดต่อโรงเรียน',
		'student-team-contact': 'นักเรียนตัวแทนติดต่อโครงงาน',
		staff: 'เจ้าหน้าที่',
		teacher: 'ครูที่ปรึกษาโครงงาน',
		anon: 'บุคคลทั่วไป'
	};
</script>

<svelte:head>
	<title>บัญชีผู้ใช้ | ระบบจัดการโครงงาน</title>
</svelte:head>

<h1>บัญชีผู้ใช้</h1>
<h2>ข้อมูลทั่วไป</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-[200px_auto]">
	<b>บทบาท</b>
	<div>
		<span class="rounded bg-base-content px-2 text-base-200"
			>{rolesDescription[data.session?.user.user_metadata.role || 'anon']}</span
		>
		<span class="label-text-alt">หากต้องการแก้ไขบทบาท โปรดติดต่อผู้ดูแล</span>
	</div>
	<b>เชิญโดย</b>
	<span>{data.session?.user.user_metadata.invited_by}</span>
</div>

<h2>อีเมล</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-[200px_auto]">
	<b class="w-40">อีเมลปัจจุบัน</b>
	<span class=""
		>{data.session?.user.email}
		<button
			class="btn-secondary btn-xs btn"
			on:click|preventDefault={() => {
				isEditing.email = !isEditing.email;
			}}
			>{#if isEditing.email}ยกเลิกการ{/if}แก้ไข</button
		></span
	>{#if isEditing.email}
		<label class="w-40" for="new-email">เปลี่ยนเป็น</label>
		<div>
			<div class="input-group">
				<input
					id="new-email"
					type="email"
					class="{!isFieldValid.email ? 'input-error' : ''} input input-sm w-full"
					placeholder="อีเมลใหม่"
					autocomplete="email"
					bind:value={editingValue.email}
					on:input|preventDefault={() => {
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
	{#if editingState.email[0]}
		<div class="alert alert-success col-span-2">
			{editingState.email[1]}
		</div>
	{/if}
</div>

<h2>รหัสผ่าน</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-[200px_auto]">
	<b class="w-40">รหัสผ่านปัจจุบัน</b>
	<span class=""
		>********
		<button
			class="btn-secondary btn-xs btn"
			on:click|preventDefault={() => {
				isEditing.password = !isEditing.password;
				if (!isEditing.password) {
					editingValue.password1 = '';
					editingValue.password2 = '';
				}
			}}
			>{#if isEditing.password}ยกเลิกการ{/if}แก้ไข</button
		></span
	>
	{#if isEditing.password}
		<label class="w-40" for="new-password">เปลี่ยนเป็น</label>
		<input
			class="input input-sm"
			id="new-password"
			type="password"
			autocomplete="new-password"
			bind:value={editingValue.password1}
		/>
		<label class="row-span-4" for="retype-password">พิมพ์อีกครั้ง</label>
		<input
			class="input input-sm"
			id="retype-password"
			type="password"
			autocomplete="new-password"
			bind:value={editingValue.password2}
		/>
		<div class="alert">
			<div class="w-full">
				<h3 class="mb-2">เงื่อนไขรหัสผ่าน</h3>
				<div class="grid grid-cols-[25px_auto] items-center text-sm">
					{#each Object.entries(isPasswordPassRequirements) as [_, { pass, label }]}
						<TickCross {pass} {label} />
					{/each}
				</div>
			</div>
		</div>
		{#if errors.password}
			<div class="alert alert-error">
				{errors.password}
			</div>
		{/if}
		{#if editingState.password[0]}
			<div class="alert alert-success">
				{editingState.password[1]}
			</div>
		{/if}
		<button
			class="btn-primary btn-sm btn"
			disabled={!isFieldValid.password}
			on:click|preventDefault={changePassword}
		>
			บันทึกรหัสผ่าน</button
		>
	{/if}
</div>

<style lang="postcss">
	label {
		@apply font-bold;
	}
</style>
