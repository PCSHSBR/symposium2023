<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	export let form: FormData;
	// Client API:
	const { form: sForm, errors, constraints } = superForm(data.form);
	let isLoading: boolean = false;
</script>

<div class="h-screen flex justify-center align-middle items-center text-center">
	<form
		method="post"
		use:enhance={({ formElement, formData, action, cancel, submitter }) => {
			isLoading = true;
			return async ({ result, update }) => {
				isLoading = false;
				update({ result });
			};
		}}
		class="flex flex-col w-[400px] gap-4"
	>
		<h1 class="text-4xl">รีเซ็ตรหัสผ่าน</h1>
		<input
			class="input input-bordered w-[100%]"
			placeholder="Email"
			name="email"
			value={$sForm.email ?? ''}
		/>
		{#if ($errors && $errors.email) || form?.message}
			<div class="alert alert-error justify-start">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{$errors.email ?? form?.message}</span>
			</div>
		{/if}
		<button class="btn btn-primary" disabled={isLoading}>
			{#if isLoading}
				<span class="loading loading-spinner" />
				{:else}
				รีเซ็ตรหัสผ่าน
			{/if}
		</button>
		<a class="w-full link" href="/login">กลับหน้าหลัก</a>
	</form>
</div>
