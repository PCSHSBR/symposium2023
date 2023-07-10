<!-- @ts-ignore: Object is possibly 'null'. -->

<script lang="ts">
	import Icon from '@iconify/svelte';
	import TextInput from './TextInput.svelte';
	import type { StudentMembers, studentMembers } from '$lib/formSchemas';
	import type { InputConstraints } from 'sveltekit-superforms';
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
	let titleToThMap: Record<string, string> = {
		นางสาว: 'Miss',
		นาย: 'Mr.',
		เลือกคำนำหน้า: 'เลือกคำนำหน้า'
	};

	$: value!.title_en = titleToThMap[value!.title_th];
</script>

<div class="relative mt-5 rounded-sm border p-4">
	<h3 class="absolute -top-3.5 mb-3 bg-base-100 px-3 font-bold">{sectionTitle}</h3>
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
					class="select-bordered select w-full"
					name="title_th"
					{...constraints.title_th}
				>
					<option value="" disabled>เลือกคำนำหน้า</option>
					<option value="นางสาว">นางสาว</option>
					<option value="นาย">นาย</option>
				</select>
			</label>
		</div>
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">title</span>
				<select
					class="select-bordered select w-full"
					bind:value={value.title_en}
					name="title_en"
					{...constraints.title_en}
				>
					<option value="" disabled>เลือกคำนำหน้า</option>
					<option value="Miss">Miss</option>
					<option value="Mr.">Mr.</option>
				</select>
			</label>
		</div>
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
	<TextInput type="email" label="ที่อยู่อีเมล" bind:value={value.email} {...constraints.email} />
</div>
