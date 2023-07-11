<script lang="ts">
	import Icon from '@iconify/svelte';
	export let sectionTitle = 'คนที่ 1';
	import TextInput from './TextInput.svelte';
	import type { SpecialAdvisor, specialAdvisor } from '$lib/formSchemas';
	import type { InputConstraints } from 'sveltekit-superforms';
	export let removeAdvisor: () => void;
	export let constraints: InputConstraints<typeof specialAdvisor> | undefined;
	export let value: SpecialAdvisor = {
		title_th: '',
		title_en: '',
		firstname_th: '',
		firstname_en: '',
		lastname_th: '',
		lastname_en: '',
		institution: '',
		institution_address: '',
		academic_ranks: '',
		email: ''
	};
	export let isEnglishPresentation: boolean;

	let titleToThMap: Record<string, string> = {
		นางสาว: 'Miss',
		นาย: 'Mr.',
		นาง: 'Mrs.',
		ศาสตราจารย์: 'Prof.',
		รองศาสตราจารย์: 'Assoc. Prof.',
		ผู้ช่วยศาสตราจารย์: 'Asst. Prof.',
		'ดร.': 'Dr.'
	};

	$: value!.title_en = titleToThMap[value!.title_th];
</script>

<div class="relative mt-5 border border-gray-700 p-4 dark:border-gray-400">
	<h3 class="absolute -top-3 bg-base-200 px-3 font-bold">{sectionTitle}</h3>
	<div class="absolute right-0 top-0 p-2">
		<button
			class="btn-sm btn"
			type="reset"
			on:click|preventDefault={() => {
				value = {
					title_th: '',
					title_en: '',
					firstname_th: '',
					firstname_en: '',
					lastname_th: '',
					lastname_en: '',
					institution: '',
					institution_address: '',
					academic_ranks: '',
					email: ''
				};
				removeAdvisor();
			}}
		>
			<Icon icon="mdi:delete-forever" class="h-5 w-5" />
			ลบ</button
		>
	</div>

	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="คำนำหน้า" bind:value={value.title_th} {...constraints?.title_th} />
		{#if isEnglishPresentation}
			<TextInput label="Title (อังกฤษ)" bind:value={value.title_en} {...constraints?.title_en} />
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="ชื่อ" bind:value={value.firstname_th} {...constraints?.firstname_th} />

		{#if isEnglishPresentation}
			<TextInput
				label="Firstname (อังกฤษ)"
				bind:value={value.firstname_en}
				{...constraints?.firstname_en}
			/>
		{/if}
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="นามสกุล" bind:value={value.lastname_th} {...constraints?.lastname_th} />

		{#if isEnglishPresentation}
			<TextInput
				label="Lastname (อังกฤษ)"
				bind:value={value.lastname_en}
				{...constraints?.lastname_en}
			/>
		{/if}
	</div>
	<TextInput
		label="ตำแหน่งทางวิชาการ (ถ้ามี)"
		bind:value={value.academic_ranks}
		{...constraints?.academic_ranks}
	/>
	<TextInput label="สถาบัน" bind:value={value.institution} {...constraints?.institution} />
	<TextInput
		label="ที่อยู่สถาบัน"
		bind:value={value.institution_address}
		{...constraints?.institution_address}
	/>
	<TextInput label="ที่อยู่อีเมล (ถ้ามี)" bind:value={value.email} {...constraints?.email} />
</div>
