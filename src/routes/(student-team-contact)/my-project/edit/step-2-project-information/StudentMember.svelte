<script lang="ts">
	import Icon from '@iconify/svelte';
	import TextInput from './TextInput.svelte';

	export let sectionTitle = 'คนที่ 1 (ตัวแทนติดต่อกลุ่ม)';
	export let idx = 1;
	export let remove: () => void;
</script>

<div class="relative mt-5 border p-4">
	<h3 class="absolute -top-3 bg-base-100 px-3">{sectionTitle}</h3>
	{#if idx > 1}
		<div class="absolute right-0 top-0 p-2">
			<button class="btn-sm btn" type="reset" on:click|preventDefault={remove}>
				<Icon icon="mdi:delete-forever" class="h-5 w-5" />
				ลบออก</button
			>
		</div>
	{/if}
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">คำนำหน้า</span>
				<select class="select-bordered select w-full" name="title1">
					<option value="" selected>เลือกคำนำหน้า</option>
					<option value="นางสาว">นางสาว</option>
					<option value="นาย">นาย</option>
				</select>
			</label>
		</div>
		<div class="form-control w-full">
			<label class="label w-full flex-col">
				<span class="label-text">title</span>
				<select class="select-bordered select w-full" name="title1">
					<option value="" selected>เลือกคำนำหน้า</option>
					<option value="Miss">Miss</option>
					<option value="Mr.">Mr.</option>
				</select>
			</label>
		</div>
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="ชื่อ" />
		<TextInput label="Firstname" />
	</div>
	<div class="flex flex-col sm:flex-row sm:gap-5">
		<TextInput label="นามสกุล" />
		<TextInput label="Lastname" />
	</div>
	<TextInput label="หมายเลขโทรศัพท์" />
	<TextInput label="ที่อยู่อีเมล" />
</div>
