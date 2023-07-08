<script lang="ts">
	import Icon from '@iconify/svelte';
	export let sectionTitle = 'คนที่ 1';
	import TextInput from './TextInput.svelte';
	export let removeAdvisor: () => void;
</script>

<div class="relative mt-5 border p-4">
	<h3 class="absolute -top-3 bg-base-100 px-3 font-bold">{sectionTitle}</h3>
	<div class="absolute right-0 top-0 p-2">
		<button class="btn-sm btn" type="reset" on:click|preventDefault={removeAdvisor}>
			<Icon icon="mdi:delete-forever" class="h-5 w-5" />
			ลบ</button
		>
	</div>

	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="คำนำหน้า" />
		<TextInput label="Title" />
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="ชื่อ" />
		<TextInput label="Firstname" />
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="นามสกุล" />
		<TextInput label="Lastname" />
	</div>
	<TextInput label="ตำแหน่งทางวิชาการ" />
	<TextInput label="สถาบัน" />
	<TextInput label="ที่อยู่สถาบัน" />
	<TextInput label="ที่อยู่อีเมล" />
</div>
