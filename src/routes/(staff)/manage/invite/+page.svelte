<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';
	import FormMessage from '$lib/components/FormMessage.svelte';
	import { featureFlags } from '$lib/featureFlags';

	export let form: ActionData;
	export let data: PageData;
	let isLoading: boolean = false;
	let sForm = {
		email: ''
	};
	let errors = {
		email: ''
	};
</script>

<svelte:head>
	<title>ส่งคำเชิญสร้างบัญชี</title>
</svelte:head>
<div
	class="mx-auto flex max-w-2xl flex-col items-center justify-center p-5 text-center align-middle"
>
	<form
		method="post"
		use:enhance={({ data }) => {
			isLoading = true;
			form = {};
			return ({ update }) => {
				isLoading = false;
				update({ reset: true });
			};
		}}
		class="flex flex-col gap-4"
	>
		<h1 class="mb-3 mt-5 text-4xl">ส่งคำเชิญให้สร้างบัญชี</h1>
		{#if featureFlags.disableInviteNewUser}
			<div class="alert alert-warning">
				<Icon icon="mdi:alert-circle-outline" class="inline-block h-6 w-6 text-warning-content" />
				ขณะนี้ระบบปิดการเชิญผู้ใช้ใหม่แล้ว หากต้องการเชิญผู้ใช้ใหม่ กรุณาติดต่อทีมงาน
			</div>
		{/if}
		<label for="emails" class="label">
			<span class="label-text"> อีเมล </span>
			<textarea
				disabled={featureFlags.disableInviteNewUser || isLoading}
				id="emails"
				class="textarea textarea-bordered w-full resize-y"
				name="email"
				autocomplete="email"
				data-invalid={!!errors.email}
				value={sForm.email}
				required
			/>
			<span class="label-text-alt mt-2"
				>สามารถใส่หลายอีเมลพร้อมกันได้โดยขึ้นบรรทัดใหม่ อย่าใส่มากกว่า 2 บัญชี
				ดูบััญชีที่ได้รับเชิญและสถานะการเชิญแต่ละบััญชีได้ที่ <a href="/auth/list-of-invited"
					>หน้ารายการอีเมลที่ได้รับเชิญแล้ว
				</a></span
			>
			<span class="label-text-alt text-red-500">{errors.email}</span>
		</label>
		<label class="label">
			<span class="label-text"> บทบาทของผู้ใช้คนนี้ </span>
			<select
				class="select select-bordered"
				name="role"
				required
				disabled={featureFlags.disableInviteNewUser}
			>
				<option value="" disabled selected>- โปรดเลือก -</option>
				{#if data.role === 'staff'}
					<option value="staff">ทีมงาน</option>
					<option value="school-contact">ผู้ประสานงานโรงเรียน</option>
					<option value="teacher">ครู</option>
					<option value="student-team-contact">นักเรียน</option>
				{/if}
				{#if data.role === 'school-contact'}
					<option value="student-team-contact">นักเรียน</option>
					<option value="teacher">ครู</option>
				{/if}
				{#if data.role === 'teacher'}
					<option value="student-team-contact">นักเรียน</option>
				{/if}
			</select>
		</label>
		<FormMessage {form} />
		<button
			type="submit"
			class="btn btn-primary"
			disabled={featureFlags.disableInviteNewUser || isLoading}
		>
			{#if isLoading}
				<span class="loading loading-spinner" />
			{:else}
				ส่งคำเชิญ
			{/if}
		</button>
		<p class="text-sm italic">
			ผู้ได้รับเชิญจะสามารถตั้งค่ารหัสผ่านและข้อมูลของบัญชีได้ผ่านลิงก์ที่ส่งไปยังอีเมล
		</p>
	</form>
</div>

<style lang="scss">
	.label {
		@apply flex-col;
	}
</style>
