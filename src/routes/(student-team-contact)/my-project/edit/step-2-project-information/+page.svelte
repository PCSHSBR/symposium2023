<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	import { enhance } from '$app/forms';
	import StudentMember from './StudentMember.svelte';
	import AdvisorMember from './AdvisorMember.svelte';
	import SpecialAdvisor from './SpecialAdvisor.svelte';
	import BottomChevron from '../BottomChevron.svelte';
	import Icon from '@iconify/svelte';
	import RenderStyledText from '$lib/componant/RenderStyledText.svelte';
	let projectName = {
		th: '',
		en: ''
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
</script>

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

<form use:enhance method="post">
	<div class="">
		<h2>ประเภทการนำเสนอ</h2>
		<div class="form-control ml-5">
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="presentationType" value="1" />
				<span>ภาคบรรยาย ภาษาไทย (Oral presentation)</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="presentationType" value="2" />
				ภาคบรรยาย ภาษาอังกฤษ (English Oral presentation)
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="presentationType" value="3" />
				โปสเตอร์ ภาษาไทย (Poster presentation)
			</label>
		</div>
	</div>
	<div class="">
		<h2>สาขาโครงงาน</h2>
		<div class="form-control ml-5">
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="project_field" value="1" />
				<span>ฟิสิกส์และดาราศาสตร์</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="project_field" value="2" />
				<span>เคมีและวัสดุศาสตร์</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="project_field" value="3" />
				<span>ชีววิทยาและสิ่งแวดล้อม</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="project_field" value="4" />
				<span>คอมพิวเตอร์และเทคโนโลยี</span>
			</label>
			<label class="label flex flex-row gap-3">
				<input type="radio" class="radio" name="project_field" value="5" />
				<span>คณิตศาสตร์</span>
			</label>
			<label class="label flex flex-row items-center gap-3">
				<input type="radio" class="radio" name="project_field" value="6" />
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
			/>
			<span class="label-text-alt mt-2 {!displayProjectName.en ? 'invisible' : ''}"
				>แสดงผลเป็น: "<RenderStyledText content={displayProjectName.en} />"</span
			>
		</div>
	</div>
	<div>
		<h2>โรงเรียน</h2>
		<div class="form-control w-full">
			<div class="input-group input h-auto w-full p-0">
				<span class="h-auto w-full">โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย</span>
				<select name="school" class="select-bordered select">
					<option value="1">ชลบุรี</option>
					<option value="2">เชียงราย</option>
					<option value="3">ตรัง</option>
					<option value="4">นครศรีธรรมราช</option>
					<option value="5">บุรีรัมย์</option>
					<option value="6">ปทุมธานี</option>
					<option value="7">พิษณุโลก</option>
					<option value="8">เพชรบุรี</option>
					<option value="9">มุกดาหาร</option>
					<option value="10">ลพบุรี</option>
					<option value="11">เลย</option>
					<option value="12">สตูล</option>
				</select>
			</div>
		</div>
	</div>
	<div>
		<h2>สมาชิกในทีม</h2>
		<StudentMember
			sectionTitle="คนที่ 1 (ตัวแทนติดต่อของทีม)"
			idx={1}
			remove={() => {
				numberOfStudent -= 1;
			}}
		/>
		{#each Array(numberOfStudent - 1) as _, i}
			<StudentMember
				sectionTitle={`คนที่ ${i + 2}`}
				idx={i + 2}
				remove={() => {
					numberOfStudent -= 1;
				}}
			/>
		{/each}
		{#if numberOfStudent < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-wide btn mx-auto my-3"
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
				class="btn-accent btn-outline btn-wide btn mx-auto my-3"
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
				class="btn-accent btn-outline btn-wide btn mx-auto my-3"
				on:click={() => (numberOfSpecialAdvisor += 1)}
			>
				เพิ่มที่ปรึกษาพิเศษ (ถ้ามี)
			</button>
		{/if}
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
</style>
