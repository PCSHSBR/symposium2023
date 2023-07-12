<script lang="ts">
	import Icon from '@iconify/svelte';
	export let sectionTitle = 'คนที่ 1';
	import TextInput from './TextInput.svelte';
	import type { TeacherAdvisor, teacherAdvisor } from '$lib/formSchemas';
	import type { InputConstraints, ValidationErrors } from 'sveltekit-superforms';
	export let idx = 1;
	export let removeAdvisor: () => void;
	export let value: TeacherAdvisor = {
		title_th: '',
		title_en: '',
		firstname_th: '',
		firstname_en: '',
		lastname_th: '',
		lastname_en: '',
		phone_number: '',
		email: ''
	};
	export let errors: ValidationErrors<typeof teacherAdvisor>;
	export let constraints: InputConstraints<typeof teacherAdvisor>;
	export let isEnglishPresentation: boolean;

	let titleToThMap: Record<string, string> = {
		นางสาว: 'Miss',
		นาย: 'Mr.',
		นาง: 'Mrs.'
	};

	let suggestedTitle = '';
	$: if (titleToThMap[value.title_th]) {
		suggestedTitle = titleToThMap[value.title_th];
	} else {
		suggestedTitle = '';
	}
</script>

<div class="relative mt-5 rounded-sm border border-gray-700 p-4 dark:border-gray-400">
	<h3 class="absolute -top-3 bg-base-200 px-3 font-bold">{sectionTitle}</h3>
	<div class="absolute right-0 top-0 p-2">
		{#if idx > 0}
			<button class="btn-sm btn" type="reset" on:click|preventDefault={removeAdvisor}>
				<Icon icon="mdi:delete-forever" class="h-5 w-5" />
				ลบ</button
			>
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput
			label="คำนำหน้า"
			error={errors.title_th}
			bind:value={value.title_th}
			{...constraints.title_th}
		/>
		{#if isEnglishPresentation}
			<TextInput
				label="Title (อังกฤษ)"
				bind:value={value.title_en}
				suggestValue={suggestedTitle}
				{...constraints.title_en}
			/>
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
				label="Firstname (อังกฤษ)"
				error={errors.firstname_en}
				bind:value={value.firstname_en}
				{...constraints.firstname_en}
			/>
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput
			label="นามสกุล"
			error={errors.lastname_th}
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
		label="หมายเลขโทรศัพท์"
		error={errors.phone_number}
		bind:value={value.phone_number}
		{...constraints.phone_number}
		bottomLeftLabel="ใช้รูปแบบ 0XXXXXXXXX"
	/>
	<TextInput
		label="ที่อยู่อีเมล"
		error={errors.email}
		bottomLeftLabel="หากครูที่ปรึกษามีบัญชีลงทะเบียนที่ใช้อีเมลนี้ ที่ปรึกษาจะสามารถแก้ไขรายละเอียดโครงงานนี้ได้"
		bind:value={value.email}
		{...constraints.email}
	/>
</div>
