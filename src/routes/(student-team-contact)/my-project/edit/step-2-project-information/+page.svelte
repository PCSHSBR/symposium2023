<script lang="ts">
	import type { PageData } from './$types';
	import DOMPurify from 'isomorphic-dompurify';
	import { enhance } from '$app/forms';
	import StudentMember from './StudentMember.svelte';
	import AdvisorMember from './AdvisorMember.svelte';
	import SpecialAdvisor from './SpecialAdvisor.svelte';
	import BottomChevron from '../BottomChevron.svelte';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	import { get } from 'svelte/store';
	export let data: PageData;
	import { notify } from '$lib/notify';
	const { form, errors } = superForm(data.form, {
		dataType: 'json',
		scrollToError: 'smooth',
		onError({ message, result }) {
			notify({
				message: result.error.message,
				type: 'error'
			});
		}
	});
	let projectName = {
		th: get(form).project_title_th,
		en: get(form).project_title_en
	};
	let displayProjectName = {
		th: '',
		en: ''
	};
	$: displayProjectName.th = DOMPurify.sanitize(projectName.th, {
		ALLOWED_TAGS: ['i', 'b']
	});
	$: displayProjectName.en = DOMPurify.sanitize(projectName.en, {
		ALLOWED_TAGS: ['i', 'b']
	});

	let numberOfStudent = 1;
	let numberOfAdvisor = 1;
	let numberOfSpecialAdvisor = 0;

	let projectDataInput = {};
</script>

<pre
	class="text-base/40 max-w-screen fixed bottom-0 right-0 z-50 h-32 w-full overflow-scroll break-words bg-base-100/40 text-xs">{JSON.stringify(
		$form,
		null,
		2
	)}</pre>
<div class="mt-4 flex flex-row justify-between gap-5 md:flex-row-reverse md:justify-end">
	<h1>แก้ไขข้อมูลโครงงาน</h1>
	<div>
		<div
			class="text-display flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white"
		>
			2
		</div>
	</div>
</div>

<form
	use:enhance={({}) => {
		return async ({ update }) => {};
	}}
	method="post"
>
	<div class="">
		<h2>ประเภทการนำเสนอ</h2>
		<div class="form-control ml-5">
			{#each ['ภาคบรรยาย ภาษาไทย (Oral presentation)', 'ภาคบรรยาย ภาษาอังกฤษ (English Oral presentation)', 'โปสเตอร์ ภาษาไทย (Poster presentation)'] as type_label, type_id}
				<label class="label flex flex-row gap-3">
					<input
						on:change={(e) => {
							$form.presentation_type = +e.currentTarget.value;
						}}
						checked={get(form).presentation_type === type_id}
						type="radio"
						class="radio"
						name="presentationType"
						value={type_id + 1}
					/>
					<span>{type_label}</span>
				</label>
			{/each}
		</div>
	</div>
	<div class="">
		<h2>สาขาโครงงาน</h2>
		<div class="form-control ml-5">
			<label class="label flex flex-row gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="1"
					checked={get(form).project_field == 1}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>ฟิสิกส์และดาราศาสตร์</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="2"
					checked={get(form).project_field == 2}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>เคมีและวัสดุศาสตร์</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="3"
					checked={get(form).project_field == 3}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>ชีววิทยาและสิ่งแวดล้อม</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="4"
					checked={get(form).project_field == 4}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>คอมพิวเตอร์และเทคโนโลยี</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="5"
					checked={get(form).project_field == 5}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>คณิตศาสตร์</span>
			</label>
			<label class="label flex flex-row items-center gap-3">
				<input
					type="radio"
					class="radio"
					name="project_field"
					value="6"
					checked={get(form).project_field == 6}
					on:change={(e) => {
						$form.project_field = +e.currentTarget.value;
					}}
				/>
				<span>วิศวกรรมศาสตร์</span>
			</label>
		</div>
	</div>
	<div class="">
		<h2>ชื่อโครงงาน</h2>
		<div class="form-control">
			<label class="label mb-0 flex-row justify-between" for="thai_project_name">
				<span class="label-text">ชื่อโครงงานภาษาไทย</span>
				<span
					class="tooltip tooltip-left"
					data-tip="คุณสามารถใช้ตัวเอียงได้ด้วย <i>ตัวเอียง</i> และตัวหนาด้วย <b>ตัวหนา</b>"
					><Icon icon="mdi:info" class="h-4 w-4" /></span
				>
			</label>
			<input
				type="text"
				class="backlit input-bordered input"
				id="thai_project_name"
				name="project_name_th"
				bind:value={projectName.th}
				on:input={(e) => {
					$form.project_title_th = displayProjectName.th;
				}}
			/>
			<span class="label-text-alt mt-2 {!displayProjectName.th ? 'invisible' : ''}"
				>แสดงผลเป็น: "<RenderStyledText content={displayProjectName.th} />"</span
			>
		</div>
		<div class="form-control">
			<label class="label mb-0 flex-row justify-between" for="eng_project_name">
				<span class="label-text">ชื่อโครงงานภาษาอังกฤษ</span>
				<span
					class="tooltip tooltip-left"
					data-tip="คุณสามารถใช้ตัวเอียงได้ด้วย <i>ตัวเอียง</i> และตัวหนาด้วย <b>ตัวหนา</b>"
					><Icon icon="mdi:info" class="h-4 w-4" /></span
				>
			</label>
			<input
				type="text"
				class="input-bordered input"
				id="eng_project_name"
				name="project_name_en"
				bind:value={projectName.en}
				on:input={() => {
					$form.project_title_en = displayProjectName.en;
				}}
			/>
			<span class="label-text-alt mt-2 {!displayProjectName.en ? 'invisible' : ''}"
				>แสดงผลเป็น: "<RenderStyledText content={displayProjectName.en} />"</span
			>
		</div>
	</div>
	<div>
		<h2 id="select_school_label">โรงเรียน</h2>
		<div class="form-control w-full">
			<div class="xs:input-group xs:input xs:h-auto xs:w-full xs:p-0">
				<span class="xs:h-auto xs:w-full">โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย</span>
				<select
					name="school"
					aria-labelledby="select_school_label"
					class="select-bordered select select-sm xs:select-md"
					bind:value={$form.school}
				>
					<option value={0} disabled>โปรดเลือก</option>
					<option value={1}>ชลบุรี</option>
					<option value={2}>เชียงราย</option>
					<option value={3}>ตรัง</option>
					<option value={4}>นครศรีธรรมราช</option>
					<option value={5}>บุรีรัมย์</option>
					<option value={6}>ปทุมธานี</option>
					<option value={7}>พิษณุโลก</option>
					<option value={8}>เพชรบุรี</option>
					<option value={9}>มุกดาหาร</option>
					<option value={10}>ลพบุรี</option>
					<option value={11}>เลย</option>
					<option value={12}>สตูล</option>
				</select>
			</div>
		</div>
	</div>
	<div>
		<h2>สมาชิกในทีม</h2>
		<StudentMember
			sectionTitle="สมาชิกที่ 1 (ตัวแทนติดต่อของทีม)"
			idx={1}
			remove={() => {
				numberOfStudent -= 1;
			}}
			bind:value={$form.student_members[0]}
		/>
		{#each Array(numberOfStudent - 1) as _, i}
			<StudentMember
				sectionTitle={`สมาชิกที่ ${i + 2}`}
				idx={i + 2}
				remove={() => {
					numberOfStudent -= 1;
				}}
				bind:value={$form.student_members[i + 1]}
			/>
		{/each}
		{#if numberOfStudent < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-block btn mx-auto my-3"
				on:click={() => (numberOfStudent += 1)}
			>
				เพิ่มสมาชิกในทีม
			</button>
		{/if}
	</div>
	<div>
		<h2>ครูที่ปรึกษาโครงงาน</h2>
		{#each Array(numberOfAdvisor) as _, i}
			<AdvisorMember
				sectionTitle={`ครูที่ปรึกษาที่ ${i + 1}`}
				idx={i}
				removeAdvisor={() => {
					numberOfAdvisor -= 1;
				}}
			/>
		{/each}
		{#if numberOfAdvisor < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-block btn mx-auto my-3"
				on:click={() => (numberOfAdvisor += 1)}
			>
				เพิ่มครูที่ปรึกษา
			</button>
		{/if}
	</div>
	<div>
		<h2>ที่ปรึกษาพิเศษ</h2>
		{#each Array(numberOfSpecialAdvisor) as _, i}
			<SpecialAdvisor
				sectionTitle={`ที่ปรึกษาพิเศษ ${i + 1}`}
				removeAdvisor={() => {
					numberOfSpecialAdvisor -= 1;
				}}
			/>
		{/each}
		{#if numberOfSpecialAdvisor < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-block btn mx-auto my-3"
				on:click={() => (numberOfSpecialAdvisor += 1)}
			>
				เพิ่มที่ปรึกษาพิเศษ (ถ้ามี)
			</button>
		{/if}
	</div>
	<div>
		<h2>ภาพถ่ายหมู่สมาชิกโครงงาน</h2>
		<label
			for="team-image-upload"
			class="mx-auto my-3 flex aspect-video max-w-sm cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-base-300 duration-300 hover:bg-base-200 dark:border-gray-500"
			title="ลากแล้ววางหรือกดเพื่อเลือกภาพ"
		>
			<div class="flex flex-col items-center justify-center text-sm text-base-content">
				<Icon icon="mdi:account-group" class="h-12 w-12" />
				<span>ลากแล้ววางหรือคลิกที่นี่</span>
				<span>เพื่ออัปโหลดภาพถ่ายหมู่สมาชิกโครงงาน</span>
			</div>
		</label>
		<input type="file" id="team-image-upload" class="hidden" />
	</div>

	<button class="btn-primary btn-block btn mt-5">บันทึก</button>
	<BottomChevron nextHref="step-3-abstract" nextPage="บทคัดย่อ" />
</form>

<style lang="postcss">
	.label {
		@apply w-full justify-start;
	}
	.label-text {
		@apply w-full;
	}
	.input[type='text'] {
		@apply w-full;
	}

	h1,
	h2 {
		@apply font-bold;
	}
</style>
