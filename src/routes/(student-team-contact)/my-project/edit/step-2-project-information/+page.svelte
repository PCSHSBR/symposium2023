<script lang="ts">
	import type { PageData, Snapshot } from './$types';
	import DOMPurify from 'isomorphic-dompurify';
	import StudentMember from './StudentMember.svelte';
	import AdvisorMember from './AdvisorMember.svelte';
	import SpecialAdvisor from './SpecialAdvisor.svelte';
	import BottomChevron from '../BottomChevron.svelte';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	import { get } from 'svelte/store';
	import { notify } from '$lib/notify';
	import { dev } from '$app/environment';
	import { dateTimeFormatter } from '$lib/langUtils';
	export let data: PageData;
	const { form, errors, constraints, message, enhance, allErrors, capture, restore } = superForm(
		data.form,
		{
			dataType: 'json',
			scrollToError: 'smooth',
			autoFocusOnError: 'detect',
			taintedMessage: 'คุณยังไม่ได้บันทึกการเปลี่ยนแปลง ต้องการออกจากหน้านี้หรือไม่',
			onError({ message, result }) {
				notify({
					message: `<b>ข้อผิดพลาด:</b> ${result.error.message}`,
					type: 'error',
					initial: 0
				});
			},
			async onSubmit() {
				isLoading = true;
				if (teamImageTemp && teamImageTemp[0]) {
					await uploadTeamImage();
				}
			},
			onUpdated(event) {},
			onResult(event) {
				isLoading = false;
			},
			onUpdate(event) {
				isLoading = false;
			}
		}
	);

	export const snapshot: Snapshot = {
		capture,
		restore
	};

	let projectName = {
		th: $form.project_title_th,
		en: $form.project_title_en
	};
	let displayProjectName = projectName;
	$: displayProjectName.th = DOMPurify.sanitize(projectName.th, {
		ALLOWED_TAGS: ['i', 'b']
	});
	$: displayProjectName.en = DOMPurify.sanitize(projectName.en, {
		ALLOWED_TAGS: ['i', 'b']
	});

	let numberOfStudent = $form.student_members.length;
	let numberOfAdvisor = $form.teacher_advisor.length;
	let numberOfSpecialAdvisor = $form.special_advisor.length;
	let isLoading = false;
	let isOpenExampleImage = false;

	if (!$form.student_members[0]?.title_th) {
		$form.student_members[0] = {
			title_en: data.user_metadata?.title_en || '',
			title_th: data.user_metadata?.title_th || '',
			firstname_en: data.user_metadata?.firstname_en || '',
			firstname_th: data.user_metadata?.firstname_th || '',
			lastname_en: data.user_metadata?.lastname_en || '',
			lastname_th: data.user_metadata?.lastname_th || '',
			phone_number: data.user_metadata?.phone_number || '',
			email: data.session?.user.email || ''
		};
	}

	let isEnglishPresentation = get(form).presentation_type === 2;
	$: isEnglishPresentation = $form.presentation_type === 2;

	let teamImageTemp: FileList | null | undefined = null;
	let teamImageUrl = data.teamImageUrl || '';
	let teamImageError = '';
	$: if (teamImageTemp && teamImageTemp[0]) {
		teamImageError = teamImageTemp[0].size > 1024 * 1024 * 3 ? 'รูปภาพต้องมีขนาดไม่เกิน 3 MB' : '';
		if (!teamImageError) {
			teamImageUrl = URL.createObjectURL(teamImageTemp[0]);
		}
	}

	let isUploadingImage = false;
	let uploadTeamImageError = '';
	let uploadTeamImageSuccess = false;
	let isAddNewImage = false;

	async function uploadTeamImage() {
		if (!teamImageTemp || !teamImageTemp[0]) return;
		isUploadingImage = true;
		const teamImageUploadResult = await data.supabase.storage
			.from('teamImages')
			.upload(
				`${data.session?.user.id}/${new Date().getTime()}.${teamImageTemp[0].type.split('/')[1]}`,
				teamImageTemp[0],
				{
					cacheControl: '3600',
					upsert: true
				}
			);
		if (teamImageUploadResult.error) {
			uploadTeamImageError = teamImageUploadResult.error.message;
			uploadTeamImageSuccess = false;
		} else {
			uploadTeamImageError = '';
			teamImageUrl = data.supabase.storage
				.from('teamImages')
				.getPublicUrl(teamImageUploadResult.data.path).data.publicUrl;
			uploadTeamImageSuccess = true;
		}
		isUploadingImage = false;
	}

	function onTeamImageFileDrop(event: DragEvent) {
		if (!event.dataTransfer?.files) return;
		teamImageTemp = event.dataTransfer?.files;
	}

	function onTeamImageFileDragOver(event: DragEvent) {
		event.preventDefault();
	}

	function onTeamImageFileChange(event: Event) {
		event.preventDefault();
	}

	let isDragOver = false;

	function onTeamImageFileEnter(event: Event) {
		event.preventDefault();
		isDragOver = true;
	}

	function onTeamImageFileLeave(event: Event) {
		event.preventDefault();
		isDragOver = false;
	}
</script>

{#if dev}
	<pre
		class="text-base/40 max-w-screen fixed bottom-0 right-0 z-50 h-32 w-full overflow-scroll break-words bg-base-100/40 text-xs">{JSON.stringify(
			$form,
			null,
			2
		)}
	
{JSON.stringify($errors, null, 2)}</pre>
{/if}
<div class="mt-4 flex flex-row justify-between gap-5 md:flex-row-reverse md:justify-end">
	<h1>ลงทะเบียนโครงงาน</h1>
	<div>
		<div
			class="text-display flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white"
		>
			2
		</div>
	</div>
</div>

<form use:enhance method="post" class="rounded-md bg-base-200 p-4">
	<div class="">
		<h2>ประเภทการนำเสนอ</h2>
		<div class="form-control ml-5">
			{#each ['ภาคบรรยาย ภาษาไทย (Oral presentation)', 'ภาคบรรยาย ภาษาอังกฤษ (English Oral presentation)', 'โปสเตอร์ ภาษาไทย (Poster presentation)'] as type_label, type_id}
				<label class="label flex flex-row gap-3">
					<input
						on:change={(e) => {
							$form.presentation_type = +e.currentTarget.value;
						}}
						checked={get(form).presentation_type === type_id + 1}
						type="radio"
						class="radio"
						name="presentationType"
						value={type_id + 1}
					/>
					<span>{type_label}</span>
				</label>
			{/each}
			{#if $errors.presentation_type}
				<div class="alert alert-error">
					<Icon icon="mdi:alert" class="h-6 w-6" />
					{$errors.presentation_type.join(', ')}
				</div>
			{/if}
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
			{#if $errors.project_field && $errors.project_field[0]}
				<div class="alert alert-error">
					<Icon icon="mdi:alert" class="h-6 w-6" />
					{$errors.project_field[0]}
				</div>
			{/if}
		</div>
	</div>
	{#if isEnglishPresentation}
		<h2>หมายเหตุ</h2>
		<div class="alert alert-info">
			<Icon icon="mdi:info" class="h-6 w-6" />
			เนื่องจากเป็นการบรรยายภาคภาษาอังกฤษ ให้ช่องกรอกข้อมูลทั้งไทยและอังกฤษเท่าที่ทราบ
		</div>
	{/if}
	<div class="">
		<h2>ชื่อโครงงาน</h2>
		<div class="form-control mb-4">
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
				class="input {$errors.project_title_th ? 'input-error' : ''}"
				id="thai_project_name"
				name="project_name_th"
				bind:value={projectName.th}
				on:input={(e) => {
					$form.project_title_th = displayProjectName.th;
				}}
				{...$constraints.project_title_th}
			/>
			<span class="label-text-alt mt-2 {!displayProjectName.th ? 'invisible' : ''}">
				{#if $errors.project_title_th}
					<span class="text-xs text-error">{$errors.project_title_th}</span>
				{/if}
				แสดงผลเป็น: "<RenderStyledText content={displayProjectName.th} />"</span
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
				class="input"
				id="eng_project_name"
				name="project_name_en"
				bind:value={projectName.en}
				on:input={() => {
					$form.project_title_en = displayProjectName.en;
				}}
				{...$constraints.project_title_en}
			/>
			<span class="label-text-alt mt-2 {!displayProjectName.en ? 'invisible' : ''}">
				{#if $errors.project_title_en}
					<span class="text-xs text-error">{$errors.project_title_en}</span>
				{/if}
				แสดงผลเป็น: "<RenderStyledText content={displayProjectName.en} />"</span
			>
		</div>
	</div>
	<div>
		<h2 id="select_school_label">โรงเรียน</h2>
		<div class="form-control w-full">
			<div class="input-bordered xs:input-group xs:input xs:h-auto xs:w-full xs:p-0">
				<span class="xs:h-auto xs:w-full">โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย</span>
				<select
					name="school"
					aria-labelledby="select_school_label"
					class="select select-sm xs:select-md"
					bind:value={$form.school}
					{...$constraints.school}
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
			{#if $errors.school}
				<span class="label-text-alt mt-2">
					<span class="text-xs text-error">{$errors.school}</span>
				</span>
			{/if}
		</div>
	</div>
	<div>
		<h2>สมาชิกในทีม</h2>
		<StudentMember
			{isEnglishPresentation}
			errors={$errors.student_members ? $errors.student_members[0] : {}}
			sectionTitle="สมาชิกที่ 1 (ตัวแทนติดต่อของทีม)"
			idx={1}
			remove={() => {
				numberOfStudent -= 1;
			}}
			bind:value={$form.student_members[0]}
			constraints={$constraints.student_members || {}}
		/>
		{#each Array(numberOfStudent - 1) as _, i}
			<StudentMember
				{isEnglishPresentation}
				sectionTitle={`สมาชิกที่ ${i + 2}`}
				idx={i + 2}
				errors={$errors.student_members ? $errors.student_members[i + 1] : {}}
				remove={() => {
					$form.student_members = $form.student_members.filter(
						(a, idx) => a.title_th !== '' && idx !== 0
					);
					numberOfStudent -= 1;
				}}
				bind:value={$form.student_members[i + 1]}
				constraints={$constraints.student_members || {}}
			/>
		{/each}
		{#if numberOfStudent < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-block btn mx-auto my-3"
				on:click={() => {
					$form.student_members.push({
						title_th: '',
						title_en: '',
						firstname_th: '',
						firstname_en: '',
						lastname_th: '',
						lastname_en: '',
						phone_number: '',
						email: ''
					});
					numberOfStudent += 1;
				}}
			>
				เพิ่มสมาชิกในทีม
			</button>
		{/if}
	</div>
	<div>
		<h2>ครูที่ปรึกษาโครงงาน</h2>
		{#each Array(numberOfAdvisor) as _, i}
			<AdvisorMember
				{isEnglishPresentation}
				errors={$errors.teacher_advisor ? $errors.teacher_advisor[i] : {}}
				sectionTitle={`ครูที่ปรึกษาที่ ${i + 1}`}
				idx={i}
				removeAdvisor={() => {
					if (typeof $form.teacher_advisor === 'undefined' || $form.teacher_advisor === null) {
						$form.teacher_advisor = [];
					}
					$form.teacher_advisor = $form.teacher_advisor.filter(
						(a, idx) => a.title_th !== '' && idx !== 0
					);
					numberOfAdvisor -= 1;
				}}
				constraints={$constraints.teacher_advisor || {}}
				bind:value={$form.teacher_advisor[i]}
			/>
		{/each}
		{#if numberOfAdvisor < 3}
			<button
				type="button"
				class="btn-accent btn-outline btn-block btn mx-auto my-3"
				on:click={() => {
					$form.teacher_advisor.push({
						title_th: '',
						title_en: '',
						firstname_th: '',
						firstname_en: '',
						lastname_th: '',
						lastname_en: '',
						phone_number: '',
						email: ''
					});
					numberOfAdvisor += 1;
				}}
			>
				เพิ่มครูที่ปรึกษา
			</button>
		{/if}
	</div>
	<div>
		<h2>ที่ปรึกษาพิเศษ (ถ้ามี)</h2>
		{#each Array(numberOfSpecialAdvisor) as _, i}
			<SpecialAdvisor
				errors={$errors.special_advisor ? $errors.special_advisor[i] : {}}
				{isEnglishPresentation}
				sectionTitle={`ที่ปรึกษาพิเศษ ${i + 1}`}
				removeAdvisor={() => {
					numberOfSpecialAdvisor -= 1;
				}}
				bind:value={$form.special_advisor[i]}
				constraints={$constraints.special_advisor || {}}
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
		<div class="flex flex-col items-center justify-center">
			<label
				on:drop={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (!e.dataTransfer?.files[0]) return;
					if (!teamImageTemp) teamImageTemp = [];
					teamImageTemp[0] = e.dataTransfer?.files[0];
				}}
				on:dragover={onTeamImageFileDragOver}
				on:dragenter={onTeamImageFileEnter}
				on:dragleave={onTeamImageFileLeave}
				for="team-image-upload"
				class="relative mx-auto my-3 flex aspect-[4/3] w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-base-300 duration-300 hover:bg-base-200 dark:border-gray-500"
				title="ลากแล้ววางหรือกดเพื่อเลือกภาพ"
			>
				{#if teamImageUrl}
					<img
						src={teamImageUrl}
						class="absolute h-full w-full rounded-lg object-cover"
						alt="ภาพถ่ายหมู่สมาชิกโครงงาน"
					/>
					<!-- <span
						class="absolute flex aspect-video w-full items-end justify-end border-b-2 border-t-2 border-white/50 p-1 text-xs text-white drop-shadow-lg"
					>
						กรอบ 16:9 (สำหรับงานวิดีโอ)
					</span> -->
				{:else}
					<div class="flex flex-col items-center justify-center text-sm text-base-content">
						<Icon icon="mdi:account-group" class="h-12 w-12" />
						<span>ลากแล้ววางหรือคลิกที่นี่</span>
						<span>เพื่ออัปโหลดภาพถ่ายหมู่สมาชิกโครงงาน</span>
					</div>
				{/if}
			</label>
			<input
				bind:files={teamImageTemp}
				accept="image/*"
				type="file"
				id="team-image-upload"
				class="hidden"
			/>
			<small>ภาพอัตราส่วน 4:3 ขนาดไม่เกิน 3MB</small>
			{#if data.teamImageData}
				<small
					>อัปโหลดภาพเมื่อ {dateTimeFormatter(new Date(data.teamImageData.updated_at))} น.</small
				>
			{/if}
			<small class="">กดบันทึกเพื่ออัปโหลดภาพ</small>
			{#if teamImageError}
				<small class="text-error">{teamImageError}</small>
			{/if}
			<button
				class="btn-accent btn-xs btn m-3"
				on:click|preventDefault={() => (isOpenExampleImage = !isOpenExampleImage)}
				>ดูตัวอย่างภาพ</button
			>
			{#if isOpenExampleImage}
				<div class="card my-5 max-w-xs bg-base-100">
					<img
						height="450"
						class="m-5 aspect-[4/3] max-w-xs rounded-lg border border-base-300 bg-base-200 dark:border-gray-500"
						alt="ตัวอย่างภาพกลุ่มโครงงาน"
						srcset="https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=100 100w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=116 116w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=134 134w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=156 156w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=182 182w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=210 210w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=244 244w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=282 282w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=328 328w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=380 380w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=442 442w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=512 512w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=594 594w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=688 688w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=798 798w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=926 926w, https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?auto=format,compress&w=1074 1074w"
						src="https://pcshsbr-assets.imgix.net/sym2023/EF971A61-40A7-4E00-9C6B-925B0EEEFF16-cropped.jpg?ixembed=1689354837188&auto=format,compress"
					/>
					<div class="card-body text-sm">
						<h3 class="card-title">ภาพตัวอย่าง</h3>
						ตัวอย่างภาพอัตราส่วน 4:3 เน้นให้ใบหน้าอยู่บริเวณกลางภาพ อาจมีครูที่ปรึกษาร่วมอยู่ด้วยหรือไม่ก็ได้
						โดยภาพจะนำไปใช้ในสื่อประชาสัมพันธ์ของงาน
					</div>
				</div>
			{/if}
		</div>
	</div>
	<div class="my-3 flex flex-col gap-2">
		{#if $message}
			<div class="alert alert-success">
				<Icon icon="mdi:tick" class="h-6 w-6" />
				<span>{$message}</span>
			</div>
		{/if}
		{#if $message && isUploadingImage}
			<div class="alert alert-error">
				<span>
					<span class="loading loading-spinner" />
				</span>
				<span>อย่าเพิ่งไปไหน ไฟล์ยังอัปโหลดไม่เสร็จ!</span>
			</div>
		{/if}
		{#if teamImageError}
			<div class="alert alert-error">
				<Icon icon="mdi:alert-circle" class="h-6 w-6" />
				<span>{teamImageError}</span>
			</div>
		{/if}
		{#if uploadTeamImageSuccess}
			<div class="alert alert-success">
				<Icon icon="mdi:tick" class="h-6 w-6" />
				<span>อัปโหลดไฟล์เรียบร้อยแล้ว คุณสามารถออกจากหน้านี้ได้อย่างปลอดภัย</span>
			</div>
		{/if}

		{#if $allErrors.length > 0}
			<div class="alert alert-error">
				{#each $allErrors as { path, messages: fMessage }}
					<div class="flex items-center gap-2">
						<Icon icon="mdi:alert-circle" class="h-6 w-6" />
						<span><span class="text-mono">{path}</span>: {fMessage.join(', ')}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<button disabled={isLoading} class="btn-primary btn-block btn mt-5">
		{#if isLoading}
			<span class="loading loading-spinner loading-md" />
		{:else}
			บันทึกข้อมูล
		{/if}
	</button>
	<BottomChevron nextHref="step-3-abstract" nextPage="บทคัดย่อ" />
</form>

<style lang="scss">
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
