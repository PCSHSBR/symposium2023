<script lang="ts">
	import Icon from '@iconify/svelte';
	import TextInput from './TextInput.svelte';
	import type { StudentMembers } from '$lib/formSchemas';

	export let sectionTitle = 'คนที่ 1 (ตัวแทนติดต่อกลุ่ม)';
	export let idx = 1;
	export let remove: () => void;
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
</script>

<div class="relative mt-5 rounded-sm border p-4">
	<h3 class="absolute -top-3.5 mb-3 bg-base-100 px-3 font-bold">{sectionTitle}</h3>
	{#if idx > 1}
		<div class="absolute right-0 top-0 p-2">
			<button class="btn-ghost btn-error btn-sm btn" type="reset" on:click|preventDefault={remove}>
				<Icon icon="mdi:delete-forever" class="h-5 w-5" />
				ลบออก</button
			>
		</div>
	{/if}
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">คำนำหน้า</span>
				<select bind:value={value.title_th} class="select-bordered select w-full" name="title_th">
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
					bind:value={value.firstname_en}
					name="title_en"
				>
					<option value="" disabled>เลือกคำนำหน้า</option>
					<option value="Miss">Miss</option>
					<option value="Mr.">Mr.</option>
				</select>
			</label>
		</div>
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="ชื่อ" bind:value={value.firstname_th} />
		<TextInput label="Firstname" bind:value={value.firstname_en} />
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="นามสกุล" bind:value={value.lastname_th} />
		<TextInput label="Lastname" bind:value={value.lastname_en} />
	</div>
	<TextInput label="หมายเลขโทรศัพท์" bind:value={value.phone_number} />
	<TextInput label="ที่อยู่อีเมล" bind:value={value.email} />
</div>
