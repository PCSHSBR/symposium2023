<script lang="ts">
	import type { Roles, RoleDescription } from '$lib/types';
	import { thai_titlt_to_en_title } from '$lib/common';
	import type { ActionData, PageData } from './$types';
	import TextInput from '../../(student-team-contact)/my-project/edit/step-2-project-information/TextInput.svelte';
	import Icon from '@iconify/svelte';
	import PasswordRequirementsBox from '$lib/components/PasswordRequirementsBox.svelte';
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import { goto } from '$app/navigation';
	export let data: PageData;
	export let form: ActionData;
	const { form: formStore, errors: formErrors, constraints } = superForm(data.form);

	const roleData: Record<Roles, RoleDescription> = {
		anon: {
			name: 'ผู้เข้าร่วมงาน',
			desc: 'คุณได้รับเชิญในฐานะผู้เข้าร่วมงาน'
		},
		'student-team-contact': {
			name: 'นักเรียนผู้ร่วมนำเสนอ',
			desc: 'เพิ่มรายละเอียดของโครงงานในนามตัวแทนทีมโครงงาน แต่ละกลุ่มจะมีเพียงคนเดียวเรียกว่าตัวแทนติดต่อของกลุ่มสำหรับการจัดการข้อมูลรายละเอียดต่าง ๆ ของโครงงาน'
		},
		teacher: {
			name: 'ครูที่ปรึกษาโครงงาน',
			desc: 'เชิญนักเรียนเพื่อให้สร้างบััญชีบนเว็บไซต์ และสามารถติดตามความคืบหน้าการอัปโหลดข้อมูลโครงงานและร่วมแก้ไขรายละเอียดโครงงานที่เป็นที่ปรึกษาได้ (โดยอีเมลที่นักเรียนกรอกในรายเอียดโครงงานต้องตรงกับบัญชีของครู)'
		},
		'school-contact': {
			name: 'ตัวแทนติดต่อของแต่ละโรงเรียน',
			desc: 'เชิญครูหรือนัักเรียนเพื่อสร้างบััญชีบนเว็ปไซต์ได้ และสามารถตรวจสอบและแก้ไขรายละเอียดบางประการของโครงงานนักเรียนได้ รวมทั้งตรวจสอบรายชื่อนักเรียนที่ลงทะเบียนโครงงานในนามโรงเรียน'
		},
		staff: {
			name: 'เจ้าหน้าที่',
			desc: 'เชิญเจ้าหน้าที่ ตัวแทนติดต่อโรงเรียน และนักเรียนได้ทั้งหมด และสามารถจัดการผู้ใช้ที่ลงทะเบียนแล้วบนเว็บไซต์ได้'
		}
	};

	let isFieldValid = {
		title_th: true,
		firstname_th: true,
		lastname_th: true,
		title_en: true,
		firstname_en: true,
		lastname_en: true,
		phone: true,
		password: true
	};

	let isSubmitting = false;
</script>

<svelte:head>
	<title>สวัสดี ยินดีต้อนรับ เรามาตั้งค่าบัญชีของคุณกันเถอะ</title>
</svelte:head>

<h1>ยินดีต้อนรับ 👋</h1>
{#if data.isUserSetupDoneAlready}
	<div class="alert alert-warning my-5" role="presentation">
		<Icon icon="mdi:alert-circle-outline" class="mr-2 inline-block h-6 w-6" />
		<span
			>คุณตั้งค่าบัญชีเรียบร้อยแล้ว หากต้องการแก้ไขข้อมูลโปรดไปที่<a href="/account"
				>การตั้งค่าบัญชี</a
			></span
		>
	</div>
{/if}
<p>มาตั้งค่าบัญชีของคุณกัน {data.session?.user.email}</p>
<form
	class="flex flex-col gap-8"
	method="post"
	use:enhance={() => {
		isSubmitting = true;
		return ({ update }) => {
			isSubmitting = false;
			update({ reset: false });
		};
	}}
>
	<section>
		<h2>ก่อนอื่น...</h2>
		<p>เราคิดว่าข้อมูลเหล่านี้น่าจะเป็นประโยชน์กับคุณ</p>
		<ul class="my-3 ml-6 list-outside list-decimal">
			<li>คุณได้รับเชิญโดย <b>{data.user_metadata?.invited_by}</b></li>
			<li>คุณได้รับเชิญในฐานะ <b>{roleData[data.role].name}</b></li>
			<li>คุณสามารถ "{roleData[data.role].desc}"</li>
		</ul>
		<p>หากข้อมูลข้อใดไม่ถูกต้อง โปรดติดต่อผู้ดูแลระบบโดยเร็ว</p>
	</section>

	<section>
		<h2>ข้อมูลเบื้องต้น</h2>
		<p>เราจะเรียกคุณอย่างไรดี</p>
		{#if data.role === 'student-team-contact'}
			<div role="alert" class="alert alert-info my-4 text-sm">
				<Icon icon="mdi:information" class="h-5 w-5" />
				<span>ข้อมูลนี้จะถูกนำไปใช้ในหน้ารายละเอียดโครงงานของคุณด้วย </span>
			</div>
		{/if}
		<div class="flex flex-col sm:flex-row sm:gap-5">
			<div class="form-control w-full">
				<label class="label w-full flex-col">
					<span class="label-text">คำนำหน้า</span>
					<select
						name="title_th"
						class="select-bordered select w-full"
						aria-invalid={$formErrors.title_th ? 'true' : undefined}
						bind:value={$formStore.title_th}
						{...$constraints.title_th}
						on:change={() => {
							$formStore.title_en = thai_titlt_to_en_title[$formStore.title_th] ?? '';
						}}
					>
						<option value="" selected={!$formStore.title_th} disabled>เลือกคำนำหน้า</option>
						{#each ['นาย', 'นางสาว', 'นาง'] as name_title}
							<option value={name_title} selected={name_title === $formStore.title_th}
								>{name_title}</option
							>
						{/each}
					</select>
				</label>
			</div>
			<div class="form-control w-full">
				<label class="label w-full flex-col">
					<span class="label-text">Title</span>
					<select
						name="title_en"
						autocomplete="honorific-prefix"
						class="select-bordered select w-full"
						aria-invalid={$formErrors.title_en ? 'true' : undefined}
						bind:value={$formStore.title_en}
						{...$constraints.title_en}
					>
						<option value="" selected={!$formStore.title_en} disabled>เลือกคำนำหน้า</option>
						{#each ['Mr.', 'Miss', 'Ms.', 'Mrs.'] as name_title}
							<option value={name_title} selected={name_title === $formStore.title_en}
								>{name_title}</option
							>
						{/each}
					</select>
				</label>
			</div>
		</div>
		<div class="flex flex-col sm:flex-row sm:gap-5">
			<TextInput
				label="ชื่อ"
				name="firstname_th"
				autocomplete="given-name"
				bind:value={$formStore.firstname_th}
				arai-invalid={$formErrors.firstname_th ? 'true' : undefined}
				{...$constraints.firstname_th}
			/>
			<TextInput
				label="Firstname"
				name="firstname_en"
				autocomplete="given-name"
				bottomLeftLabel="ชื่อภาษาอังกฤษ"
				required
				bind:value={$formStore.firstname_en}
				aria-invalid={$formErrors.firstname_en ? 'true' : undefined}
				{...$constraints.firstname_en}
			/>
		</div>
		<div class="flex flex-col sm:flex-row sm:gap-5">
			<TextInput
				label="นามสกุล"
				name="lastname_th"
				bind:value={$formStore.lastname_th}
				autoComplete="family-name"
				aria-invalid={$formErrors.lastname_th ? 'true' : undefined}
				{...$constraints.lastname_th}
			/>
			<TextInput
				label="Lastname"
				autocomplete="family-name"
				name="lastname_en"
				bottomLeftLabel="นามสกุลภาษาอังกฤษ"
				required
				bind:value={$formStore.lastname_en}
				aria-invalid={$formErrors.lastname_en ? 'true' : undefined}
				{...$constraints.lastname_en}
			/>
		</div>
		<TextInput
			label="หมายเลขโทรศัพท์"
			autocomplete="tel"
			bottomLeftLabel="เช่น 0812345678"
			name="phone"
			required
			bind:value={$formStore.phone}
			aria-invalid={$formErrors.phone ? 'true' : undefined}
			{...$constraints.phone}
		/>
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">ที่อยู่อีเมล</span>
				<input
					type="text"
					class="input-bordered input w-full"
					required
					value={data.session?.user.email}
					readonly
				/>
				<span class="label-text-alt"
					>คุณไม่สามารถแก้ไขได้เนื่องจากเชื่อมโยงกับบัญชีของคุณ หากต้องการเปลี่ยนอีเมลสามารถทำได้ใน <a
						href="/account">การตั้งค่าบัญชี</a
					></span
				>
			</label>
		</div>
	</section>

	<section>
		<h2>รหัสผ่าน</h2>
		<p>โปรดตั้งรหัสผ่านสำหรับการเข้าใช้งานระบบ</p>
		<div class="flex flex-col">
			<TextInput
				name="password"
				label="รหัสผ่าน"
				autocomplete="new-password"
				required
				type="password"
				bind:value={$formStore.password}
				aria-invalid={$formErrors.password ? 'true' : undefined}
				{...$constraints.password}
			/>
			<TextInput
				label="ยืนยันรหัสผ่าน"
				type="password"
				required
				autoComplete="new-password"
				bind:value={$formStore.retype_password}
				name="retype_password"
				aria-invalid={$formErrors.retype_password ? 'true' : undefined}
				{...$constraints.retype_password}
			/>
			<PasswordRequirementsBox
				password={$formStore.password}
				confirmPassword={$formStore.retype_password}
				bind:isPass={isFieldValid.password}
			/>
		</div>
	</section>

	<!-- <section>
		<h2>นโยบายความเป็นส่วนตัวและข้อกำหนด</h2>
		<p>โปรดอ่านและยอมรับนโยบายความเป็นส่วนตัวและข้อกำหนดก่อนดำเนินการต่อ</p>
		<div class="form-control">
			<label class="label flex cursor-pointer items-center">
				<input
					type="checkbox"
					class="checkbox checkbox-lg"
					required
					bind:checked={formValues.agree}
				/>
				<span class="label-text ml-2"
					>ฉันยอมรับ<a href="/legal/privacy-and-terms">นโยบายความเป็นส่วนตัวและข้อกำหนดการใช้งาน</a
					></span
				>
			</label>
		</div>
	</section> -->

	<!-- <SuperDebug data={$formStore} /> -->

	<section class="mt-7 text-center">
		<p>
			หลังจากบันทึกแล้ว คุณยังสามารถแก้ไขข้อมูลได้ผ่านเมนูผู้ใช้ทางขวาบน และเลือกการตั้งค่าบัญชี
		</p>

		{#if form?.ok}
			<div class="alert alert-success">
				<Icon icon="mdi:check" class="alert-icon h-5 w-5" />
				<span>
					บันทึกข้อมูลเรียบร้อยแล้ว กำลังพาคุณไปที่แดชบอร์ด
					<span class="loading loading-dots loading-sm align-middle" />
				</span>
			</div>
		{/if}
		<button
			type="submit"
			class="btn-primary btn mx-auto mt-5 lg:btn-wide"
			disabled={!isFieldValid.password || isSubmitting}
		>
			{#if isSubmitting}
				<Icon icon="mdi:loading" class="loading loading-spinner" />
			{:else}
				<span>บันทึกข้อมูลและไปที่แดชบอร์ด</span>
			{/if}
		</button>
	</section>
</form>

<!-- <style lang="scss">
	input:invalid,
	[aria-invalid='true'] {
		@apply border-2 border-red-500;
	}
</style> -->
