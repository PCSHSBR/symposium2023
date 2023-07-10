<script lang="ts">
	import Icon from '@iconify/svelte';
	export let sectionTitle = 'คนที่ 1';
	import TextInput from './TextInput.svelte';
	import type { TeacherAdvisor, teacherAdvisor } from '$lib/formSchemas';
	import type { InputConstraints } from 'sveltekit-superforms';
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
	export let constraints: InputConstraints<typeof teacherAdvisor>;
</script>

<div class="relative mt-5 rounded-sm border p-4">
	<h3 class="absolute -top-3 bg-base-100 px-3 font-bold">{sectionTitle}</h3>
	<div class="absolute right-0 top-0 p-2">
		{#if idx > 0}
			<button class="btn-sm btn" type="reset" on:click|preventDefault={removeAdvisor}>
				<Icon icon="mdi:delete-forever" class="h-5 w-5" />
				ลบ</button
			>
		{/if}
	</div>

	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="คำนำหน้า" bind:value={value.title_th} {...constraints.title_th} />
		<TextInput label="Title (อังกฤษ)" bind:value={value.title_en} {...constraints.title_en} />
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="ชื่อ" bind:value={value.firstname_th} {...constraints.firstname_th} />
		<TextInput
			label="Firstname (อังกฤษ)"
			bind:value={value.firstname_en}
			{...constraints.firstname_en}
		/>
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="นามสกุล" bind:value={value.lastname_th} {...constraints.lastname_th} />
		<TextInput
			label="Lastname (อังกฤษ)"
			bind:value={value.lastname_en}
			{...constraints.lastname_en}
		/>
	</div>
	<TextInput
		label="หมายเลขโทรศัพท์"
		bind:value={value.phone_number}
		{...constraints.phone_number}
	/>
	<TextInput
		label="ที่อยู่อีเมล"
		bottomLeftLabel="หากครูที่ปรึกษามีบัญชีลงทะเบียนที่ใช้อีเมลนี้ ที่ปรึกษาจะสามารถแก้ไขรายละเอียดโครงงานนี้ได้"
		bind:value={value.email}
		{...constraints.email}
	/>
</div>
