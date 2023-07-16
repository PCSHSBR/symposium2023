<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';
	import FormMessage from '$lib/components/FormMessage.svelte';

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
		<label for="emails" class="label">
			<span class="label-text"> อีเมล </span>
			<textarea
				id="emails"
				class="input textarea-bordered w-full"
				name="email"
				autocomplete="email"
				data-invalid={!!errors.email}
				value={sForm.email}
				required
			/>
			<span class="label-text-alt mt-2">สามารถใส่หลายอีเมลพร้อมกันได้โดยขึ้นบรรทัดใหม่</span>
			<span class="label-text-alt text-red-500">{errors.email}</span>
		</label>
		<label class="label">
			<span class="label-text"> บทบาทของผู้ใช้คนนี้ </span>
			<select class="select-bordered select" name="role" required>
				<option value="" disabled selected>- โปรดเลือก -</option>
				{#if data.role === 'staff'}
					<option value="staff">ทีมงาน</option>
					<option value="school-contact">ผู้ประสานงานโรงเรียน</option>
				{/if}
				{#if data.role === 'school-contact'}
					<option value="teacher">ครู</option>
				{/if}
				{#if data.role === 'teacher'}
					<option value="student-team-contact">นักเรียน</option>
				{/if}
			</select>
		</label>
		<FormMessage {form} />
		<button type="submit" class="btn-primary btn" disabled={isLoading}>
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
