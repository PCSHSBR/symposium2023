<!-- @ts-ignore: Object is possibly 'null'. -->

<script lang="ts">
	import Icon from '@iconify/svelte';
	import TextInput from './TextInput.svelte';
	import type { StudentMembers, studentMembers } from '$lib/formSchemas';
	import type { InputConstraints, ValidationErrors } from 'sveltekit-superforms';
	export let sectionTitle = 'คนที่ 1 (ตัวแทนติดต่อกลุ่ม)';
	export let idx = 1;
	export let remove: () => void;
	export let constraints: InputConstraints<typeof studentMembers>;
	export let value: StudentMembers = {
		title_th: '',
		title_en: '',
		firstname_th: '',
		firstname_en: '',
		lastname_th: '',
		lastname_en: '',
		phone_number: '',
		email: ''
	};
	export let errors: ValidationErrors<typeof studentMembers> = {};
	export let isEnglishPresentation: boolean;
	let titleToThMap: Record<string, string> = {
		นางสาว: 'Miss',
		นาย: 'Mr.',
		เลือกคำนำหน้า: 'เลือกคำนำหน้า'
	};

	$: {
		if (value.title_th) value.title_en = titleToThMap[value.title_th];
		else value.title_en = '';
	}
</script>

<div class="relative mt-5 rounded-sm border border-gray-700 p-4 dark:border-gray-400">
	<h3 class="absolute -top-3.5 mb-3 bg-base-200 px-3 font-bold">{sectionTitle}</h3>
	{#if idx > 1}
		<div class="absolute right-0 top-0 p-2">
			<button
				class="btn-error btn-ghost btn-sm btn"
				type="reset"
				on:click|preventDefault={() => {
					value = {
						title_th: '',
						title_en: '',
						firstname_th: '',
						firstname_en: '',
						lastname_th: '',
						lastname_en: '',
						phone_number: '',
						email: ''
					};
					remove();
				}}
			>
				<Icon icon="mdi:delete-forever" class="h-5 w-5" />
				ลบออก</button
			>
		</div>
	{/if}
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">คำนำหน้า</span>
				<select
					bind:value={value.title_th}
					class="select w-full {errors.title_th ? 'input-error' : ''}"
					name="title_th"
					{...constraints.title_th}
				>
					<option value="" disabled>เลือกคำนำหน้า</option>
					<option value="นางสาว">นางสาว</option>
					<option value="นาย">นาย</option>
				</select>
			</label>
			{#if errors.title_th}
				<span class="text-xs text-error">{errors.title_th}</span>
			{/if}
		</div>
		{#if isEnglishPresentation}
			<div class="form-control w-full">
				<label class="label w-full flex-col">
					<span class="label-text">Title (อังกฤษ)</span>
					<select
						class="select w-full {errors.title_en ? 'input-error' : ''}"
						bind:value={value.title_en}
						name="title_en"
						{...constraints.title_en}
					>
						<option value="" disabled>เลือกคำนำหน้า</option>
						<option value="Miss">Miss</option>
						<option value="Mr.">Mr.</option>
					</select>
				</label>
				{#if errors.title_en}
					<span class="text-xs text-error">{errors.title_en}</span>
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput
			error={errors.firstname_th}
			label="ชื่อ"
			bind:value={value.firstname_th}
			{...constraints.firstname_th}
		/>

		{#if isEnglishPresentation}
			<TextInput
				error={errors.firstname_en}
				label="Firstname (อังกฤษ)"
				bind:value={value.firstname_en}
				{...constraints.firstname_en}
			/>
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput
			error={errors.lastname_th}
			label="นามสกุล"
			bind:value={value.lastname_th}
			{...constraints.lastname_th}
		/>
		{#if isEnglishPresentation}
			<TextInput
				error={errors.lastname_en}
				label="Lastname (อังกฤษ)"
				bind:value={value.lastname_en}
				{...constraints.lastname_en}
			/>
		{/if}
	</div>
	<TextInput
		type="tel"
		error={errors.phone_number}
		label="หมายเลขโทรศัพท์"
		bind:value={value.phone_number}
		{...constraints.phone_number}
		bottomLeftLabel="ใช้รูปแบบ 0XXXXXXXXX"
	/>
	<TextInput
		error={errors.email}
		type="email"
		label="ที่อยู่อีเมล"
		bind:value={value.email}
		{...constraints.email}
	/>
</div>
