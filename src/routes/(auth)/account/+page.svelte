<script lang="ts">
	import type { PageData } from './$types';
	import { z } from 'zod';
	import type { Roles } from '$lib/types';
	import PasswordRequirementsBox from '$lib/components/PasswordRequirementsBox.svelte';
	import { isPropertyExist } from '$lib/utils';
	import Icon from '@iconify/svelte';
	export let data: PageData;

	(async () => {
		await data.supabase.auth.refreshSession();
	})();

	const emailSchema = z.string().email();
	// thai phone number
	const phoneSchema = z.string().regex(/^0[0-9]{9}$/);

	let isEditing = {
		email: false,
		password: false,
		name_th: false,
		name_en: false,
		phone: false
	};

	let editingValue = {
		email: '',
		password1: '',
		password2: '',
		title_th: '',
		firstname_th: '',
		lastname_th: '',
		title_en: '',
		firstname_en: '',
		lastname_en: '',
		phone: ''
	};

	let editingState = {
		email: [false, ''],
		password: [false, ''],
		name_th: [false, ''],
		name_en: [false, ''],
		phone: [false, '']
	};

	let errors = {
		email: '',
		password: '',
		name_th: '',
		name_en: '',
		phone: ''
	};

	let isFieldValid = {
		email: false,
		password: false
	};

	let displayUserInfo = {
		name_th: '',
		name_en: '',
		phone: ''
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

	async function updateNameTh() {
		const result = await data.supabase.auth.updateUser({
			data: {
				title_th: editingValue.title_th,
				firstname_th: editingValue.firstname_th,
				lastname_th: editingValue.lastname_th
			}
		});

		if (result.error) return (errors.name_th = result.error.message);
		editingState.name_th = [true, 'อัปเดตชื่อเรียบร้อยแล้ว'];
		displayUserInfo.name_th = `${editingValue.title_th}${editingValue.firstname_th} ${editingValue.lastname_th}`;
	}

	async function updateNameEn() {
		const result = await data.supabase.auth.updateUser({
			data: {
				title_en: editingValue.title_en,
				firstname_en: editingValue.firstname_en,
				lastname_en: editingValue.lastname_en
			}
		});

		if (result.error) return (errors.name_en = result.error.message);
		editingState.name_en = [true, 'อัปเดตชื่อเรียบร้อยแล้ว'];
		displayUserInfo.name_en = `${editingValue.title_en}${editingValue.firstname_en} ${editingValue.lastname_en}`;
	}

	async function updatePhone() {
		const result = await data.supabase.auth.updateUser({
			data: {
				phone: editingValue.phone
			}
		});

		if (result.error) return (errors.phone = result.error.message);
		editingState.phone = [true, 'อัปเดตเบอร์โทรศัพท์เรียบร้อยแล้ว'];
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

	const isUserMetadataAllSet = isPropertyExist(data.user_metadata, [
		'title_th',
		'firstname_th',
		'lastname_th',
		'title_en',
		'firstname_en',
		'lastname_en',
		'phone'
	]);
</script>

<svelte:head>
	<title>บัญชีผู้ใช้ | ระบบจัดการโครงงาน</title>
</svelte:head>

<h1>บัญชีผู้ใช้</h1>
<h2>ข้อมูลทั่วไป</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-[200px_auto]">
	{#if !isUserMetadataAllSet}
		<div class="alert alert-warning" role="alert">
			<Icon icon="mdi:alert-circle-outline" class="h-6 w-6" />
			<span>
				กรุณาเพิ่มข้อมูลของคุณในหน้า <a href="/welcome"> ยินดีต้อนรับ </a>
			</span>
		</div>
	{/if}
	<b> ชื่อไทย </b>
	<div>
		{#if displayUserInfo.name_th}
			{displayUserInfo.name_th}
		{:else}
			{data.user_metadata?.title_th}{data.user_metadata?.firstname_th}
			{data.user_metadata?.lastname_th}
		{/if}
		<button
			class="btn-ghost btn-secondary btn-xs btn"
			on:click={() => {
				editingValue.title_th = data.user_metadata?.title_th ?? '';
				editingValue.firstname_th = data.user_metadata?.firstname_th ?? '';
				editingValue.lastname_th = data.user_metadata?.lastname_th ?? '';
				isEditing.name_th = !isEditing.name_th;
			}}
		>
			{#if isEditing.name_th}ยกเลิกการ{/if}แก้ไข
		</button>
		{#if isEditing.name_th}
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-1">
					<label for="title_th">คำนำหน้าชื่อ</label>
					<select id="title_th" class="select" bind:value={editingValue.title_th}>
						<option value="นาย">นาย</option>
						<option value="นางสาว">นางสาว</option>
						<option value="นาง">นาง</option>
					</select>
				</div>
				<div class="flex flex-col gap-1">
					<label for="firstname_th">ชื่อ</label>
					<input
						required
						id="firstname_th"
						class="input-bordered input"
						bind:value={editingValue.firstname_th}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="lastname_th">นามสกุล</label>
					<input
						id="lastname_th"
						required
						class="input-bordered input"
						bind:value={editingValue.lastname_th}
					/>
				</div>
				{#if errors.name_th}
					<div class="alert alert-error" role="alert">
						<Icon icon="mdi:alert-circle-outline" class="h-6 w-6" />
						<span>{errors}</span>
					</div>
				{:else}
					<!-- save done -->
					{#if editingState.name_th[1]}
						<div class="alert alert-success" role="alert">
							<Icon icon="mdi:check-circle-outline" class="h-6 w-6" />
							<span>บันทึกข้อมูลเรียบร้อย</span>
						</div>
					{/if}
				{/if}
				<div class="flex justify-end gap-2">
					<button class="btn-primary btn" on:click={updateNameTh}> บันทึก </button>
					<button class="btn-ghost btn-secondary btn" on:click={() => (isEditing.name_th = false)}>
						ยกเลิก
					</button>
				</div>
			</div>
		{/if}
	</div>
	<b> ชื่ออังกฤษ </b>
	<div>
		{#if displayUserInfo.name_en}
			{displayUserInfo.name_en}
		{:else}
			{data.user_metadata?.title_en}
			{data.user_metadata?.firstname_en}
			{data.user_metadata?.lastname_en}
		{/if}
		<button
			class="btn-ghost btn-secondary btn-xs btn"
			on:click={() => {
				editingValue.title_en = data.user_metadata?.title_en ?? '';
				editingValue.firstname_en = data.user_metadata?.firstname_en ?? '';
				editingValue.lastname_en = data.user_metadata?.lastname_en ?? '';
				isEditing.name_en = !isEditing.name_en;
			}}
		>
			{#if isEditing.name_en}ยกเลิกการ{/if}แก้ไข
		</button>
		{#if isEditing.name_en}
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-1">
					<label for="title_en">คำนำหน้าชื่อ</label>
					<select id="title_en" class="select" bind:value={editingValue.title_en}>
						<option value="Mr.">Mr.</option>
						<option value="Miss">Miss</option>
						<option value="Ms.">Ms.</option>
						<option value="Mrs.">Mrs.</option>
					</select>
				</div>
				<div class="flex flex-col gap-1">
					<label for="firstname_en">ชื่อ</label>
					<input
						required
						id="firstname_en"
						class="input-bordered input"
						bind:value={editingValue.firstname_en}
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="lastname_en">นามสกุล</label>
					<input
						required
						id="lastname_en"
						class="input-bordered input"
						bind:value={editingValue.lastname_en}
					/>
				</div>
				{#if errors.name_en}
					<div class="alert alert-error" role="alert">
						<Icon icon="mdi:alert-circle-outline" class="h-6 w-6" />
						<span>{errors}</span>
					</div>
				{/if}
				{#if editingState.name_en[0]}
					<div class="alert alert-success" role="alert">
						<Icon icon="mdi:check-circle-outline" class="h-6 w-6" />
						<span>บันทึกข้อมูลเรียบร้อย</span>
					</div>
				{/if}
				<div class="flex justify-end gap-2">
					<button class="btn-primary btn" on:click={updateNameEn}> บันทึก </button>
					<button class="btn-ghost btn-secondary btn" on:click={() => (isEditing.name_en = false)}>
						ยกเลิก
					</button>
				</div>
			</div>
		{/if}
	</div>
	<b>หมายเลขโทรศัพท์</b>
	<div>
		{data.user_metadata?.phone}
		<button
			class="btn-ghost btn-secondary btn-xs btn"
			on:click={() => {
				editingValue.phone = data.user_metadata?.phone ?? '';
				isEditing.phone = !isEditing.phone;
			}}
		>
			{#if isEditing.phone}ยกเลิกการ{/if}แก้ไข
		</button>
		{#if isEditing.phone}
			<div class="flex flex-col gap-2">
				<div class="flex flex-col gap-1">
					<label for="phone">หมายเลขโทรศัพท์</label>
					<input
						required
						id="phone"
						class="input-bordered input"
						bind:value={editingValue.phone}
						on:input={() => {
							editingValue.phone = editingValue.phone.replace(/\D/g, '');
							const safeParsed = phoneSchema.safeParse(editingValue.phone);
							if (!safeParsed.success) errors.phone = safeParsed.error.message[0].message;
							else errors.phone = '';
						}}
					/>
				</div>
				{#if errors.phone}
					<div class="alert alert-error">{errors.phone}</div>
				{/if}
				{#if editingState.phone[0]}
					<div class="alert alert-success">
						{editingState.phone[1]}
					</div>
				{/if}
				<div class="flex justify-end gap-2">
					<button class="btn-primary btn" on:click={updatePhone}> บันทึก </button>
					<button class="btn-ghost btn-secondary btn" on:click={() => (isEditing.phone = false)}>
						ยกเลิก
					</button>
				</div>
			</div>
		{/if}
	</div>
	<b>อีเมล</b>
	<span>{data.session?.user.email}</span>
	<b>บทบาท</b>
	<div>
		<span class="rounded bg-base-content px-2 text-base-200"
			>{rolesDescription[data.session?.user.user_metadata.role || 'anon']}</span
		>
		<span class="label-text-alt">หากต้องการแก้ไขบทบาท โปรดติดต่อผู้ดูแล</span>
	</div>
	<b>ถูกเชิญโดย</b>
	<span>{data.session?.user.user_metadata.invited_by}</span>
</div>

<h2>อีเมล</h2>
<div class="grid gap-3 rounded-md bg-base-300 p-4 lg:grid-cols-[200px_auto]">
	<b class="w-40">อีเมลปัจจุบัน</b>
	<span class=""
		>{data.session?.user.email}
		<button
			class="btn-ghost btn-secondary btn-xs btn"
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
					required
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
		<div role="alert" class="alert alert-error col-span-2">
			{errors.email}
		</div>
	{/if}
	{#if editingState.email[0]}
		<div role="alert" class="alert alert-success col-span-2">
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
			class="btn-ghost btn-secondary btn-xs btn"
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
			required
			type="password"
			autocomplete="new-password"
			bind:value={editingValue.password1}
		/>
		<label class="row-span-4" for="retype-password">พิมพ์อีกครั้ง</label>
		<input
			class="input input-sm"
			id="retype-password"
			type="password"
			required
			autocomplete="new-password"
			bind:value={editingValue.password2}
		/>
		<PasswordRequirementsBox
			password={editingValue.password1}
			confirmPassword={editingValue.password2}
			bind:isPass={isFieldValid.password}
		/>
		{#if errors.password}
			<div role="alert" class="alert alert-error">
				{errors.password}
			</div>
		{/if}
		{#if editingState.password[0]}
			<div role="alert" class="alert alert-success">
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

<style lang="scss">
	label {
		@apply font-bold;
	}
</style>
