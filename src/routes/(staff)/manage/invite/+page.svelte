<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { textListFormatter, toThai } from '$lib/langUtils';
	import Icon from '@iconify/svelte';
	import FormMessage from '$lib/components/FormMessage.svelte';

	export let form: ActionData;
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
<div class="mx-auto flex flex-col items-center justify-center text-center align-middle">
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
		<label class="label">
			<span class="label-text"> อีเมล </span>
			<input
				class="input-bordered input w-full"
				name="email"
				type="email"
				autocomplete="email"
				data-invalid={!!errors.email}
				value={sForm.email}
				required
			/>
		</label>
		<label class="label">
			<span class="label-text"> บทบาทของผู้ใช้คนนี้ </span>
			<select class="select-bordered select" name="role" required>
				<option value="" disabled selected>- โปรดเลือก -</option>
				<option value="staff">ทีมงาน</option>
				<option value="teacher">ครู</option>
				<option value="student-team-contact">นักเรียน</option>
				<option value="school-contact">ผู้ประสานงานโรงเรียน</option>
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

<style lang="postcss">
	.label {
		@apply flex-col;
	}
</style>
