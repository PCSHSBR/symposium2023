<script lang="ts">
	import BottomChevron from '../BottomChevron.svelte';
	import Upload from '../Upload.svelte';
	import { textareaAutosizeAction, focusAction } from 'svelte-legos';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { notify } from '$lib/notify';
	import { sanitizeHTML } from '$lib/utils';
	import { dateTimeFormatter } from '$lib/langUtils';

	let abstractContent = '';
	let abstractContentBeforeEdit = '';
	let isDisplayPreview = false;
	let abstractFile: File | null = null;
	let abstractStagedFilesDoc: FileList;
	let abstractStagedFilesPDF: FileList;
	let abstractFileInput: HTMLInputElement;

	export let data: PageData;

	let uploadError = {
		text: '',
		document: '',
		pdf: ''
	};
	let uploadSuccess = {
		text: '',
		document: '',
		pdf: ''
	};
	let uploading = {
		text: false,
		document: false,
		pdf: false
	};
	let lastUploadFile = {
		document: {
			lastUpdateDate: '',
			url: ''
		},
		pdf: {
			lastUpdateDate: '',
			url: ''
		}
	};

	async function saveAbstractText() {
		uploading.text = true;
		const { data: projectdata, error } = await data.supabase
			.from('projects')
			.update({ abstract: sanitizeHTML(abstractContent) })
			.eq('team_contact_user_id', data.session?.user.id);
		if (error) {
			console.error(error);
			uploadError.text = error.message;
			uploading.text = false;
			return notify({
				message: error.message,
				type: 'error'
			});
		}
		await data.supabase
			.from('project_status')
			.update({
				is_add_text_abstract: true
			})
			.eq('team_contact_user_id', data.session?.user.id);
		uploadSuccess.text = 'บันทึกสำเร็จ';
		uploading.text = false;
	}

	async function uploadDocxAbstract() {
		uploading.document = true;
		const result = await data.supabase.storage
			.from('abstracts')
			.upload(
				`${data.session?.user.id}/abstract.${abstractStagedFilesDoc[0].name.split('.').pop()}`,
				abstractStagedFilesDoc[0],
				{
					cacheControl: '3600',
					upsert: true
				}
			);
		if (result.error) {
			console.error(result.error);
			uploadError.document = result.error.message;
			uploading.document = false;
			return notify({
				message: result.error.message,
				type: 'error'
			});
		}
		if (result.data) {
			uploadSuccess.document = 'อัปโหลดสำเร็จ';
			uploading.document = false;
		}
	}
	async function uploadPDFAbstract() {
		uploading.pdf = true;
		const result = await data.supabase.storage
			.from('abstracts')
			.upload(`${data.session?.user.id}/abstract.pdf`, abstractStagedFilesPDF[0], {
				cacheControl: '3600',
				upsert: true
			});
		if (result.error) {
			console.error(result.error);
			uploadError.pdf = result.error.message;
			uploading.pdf = false;
			return notify({
				message: result.error.message,
				type: 'error'
			});
		}
		if (result.data) {
			uploadSuccess.pdf = 'อัปโหลดสำเร็จ';
			uploading.pdf = false;
		}
	}

	function uploadAbstract() {
		if (abstractContent !== abstractContentBeforeEdit) {
			uploadError.text = '';
			uploadSuccess.text = '';
			saveAbstractText();
		}
		if (abstractStagedFilesDoc) {
			uploadError.document = '';
			uploadSuccess.document = '';
			uploadDocxAbstract();
		}
		if (abstractStagedFilesPDF) {
			uploadError.pdf = '';
			uploadSuccess.pdf = '';
			uploadPDFAbstract();
		}
	}

	(async () => {
		const { data: projectdata, error } = await data.supabase
			.from('projects')
			.select('abstract')
			.eq('team_contact_user_id', data.session?.user.id)
			.limit(1)
			.order('created_at', { ascending: false })
			.single();
		if (error) {
			console.error(error);
			return notify({
				message: error.message
			});
		}
		if (projectdata) {
			abstractContent = projectdata.abstract || '';
			abstractContentBeforeEdit = projectdata.abstract || '';
		}
	})();
	(async () => {
		await data.supabase.storage
			.from('abstracts')
			.list(`${data.session?.user.id}/`)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return notify({
						message: result.error.message,
						type: 'error'
					});
				}
				if (result.data) {
					result.data.forEach((file) => {
						if (file.name.endsWith('.docx')) {
							lastUploadFile.document.lastUpdateDate = file.updated_at;
							lastUploadFile.document.url = data.supabase.storage
								.from('abstracts')
								.getPublicUrl(`${data.session?.user.id}/${file.name}`).data.publicUrl;
						}
						if (file.name.endsWith('.pdf')) {
							lastUploadFile.pdf.lastUpdateDate = file.updated_at;
							lastUploadFile.pdf.url = data.supabase.storage
								.from('abstracts')
								.getPublicUrl(`${data.session?.user.id}/${file.name}`).data.publicUrl;
						}
					});
					if (lastUploadFile.pdf.url && lastUploadFile.document.url) {
						data.supabase
							.from('project_status')
							.update({
								is_uploaded_abstract: true
							})
							.eq('team_contact_user_id', data.session?.user.id)
							.then((result) => {
								if (result.error) {
									console.error(result.error);
									return notify({
										message: result.error.message,
										type: 'error'
									});
								}
							});
					}
				}
			});
	})();
</script>

<div class="mt-4 flex flex-row justify-between gap-5 md:flex-row-reverse md:justify-end">
	<h1>อัปโหลดบทคัดย่อ</h1>
	<div>
		<div
			class="text-display flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white"
		>
			3
		</div>
	</div>
</div>

<div class="rounded-2xl bg-base-200 p-4">
	<h2>รูปแบบบทคัดย่อ</h2>
	<p>
		คุณสามารถดูตัวอย่างบทคัดย่อได้ที่<a
			target="_blank"
			href="https://drive.google.com/drive/folders/1P1nfoJ9mBKbJOENBbHmm_Om46doDjJHZ?usp=drive_link"
			>โฟลเดอร์รวมตัวอย่างเอกสาร</a
		>
	</p>
	<div class="">
		<h2>1. เนื้อหาบทคัดย่อ</h2>
		<p>เพื่อความสะดวกในการอ้างอิงและสืบค้น โปรดใส่เนื้อหาบทคัดย่อโครงงานที่นี่ด้วยอีกจุดหนึ่ง</p>
		<textarea
			class="textarea w-full"
			use:textareaAutosizeAction
			use:focusAction
			spellcheck="true"
			bind:value={abstractContent}
			disabled={isDisplayPreview}
			title={isDisplayPreview ? 'ไม่สามารถแก้ไขได้เนื่องจากกำลังแสดงตัวอย่าง' : ''}
			placeholder="ใส่บทคัดย่อที่นี่"
		/>
		{#if isDisplayPreview}
			<p class="text-sm text-warning">
				<b>กำลังแสดงตัวอย่าง:</b> โปรดปิดการแสดงตัวอย่างเพื่อแก้ไขเนื้อหาบทคัดย่อ
			</p>
		{/if}
		<p class="text-sm text-inherit text-opacity-10">
			<b>หมายเหตุ:</b> ใช้ <code>&lt;i&gt;ตัวเอียง&lt;/i&gt;</code> รอบข้อความสำหรับ<i>ตัวเอียง</i>
			และ <code>&lt;b&gt;ตัวหนา&lt;/b&gt;</code> สำหรับ<b>ตัวหนา</b>
		</p>
		<div>
			<div class="collapse-arrow collapse bg-base-100 p-0">
				<input type="checkbox" bind:checked={isDisplayPreview} class="peer" />
				<div class="collapse-title flex items-center text-sm">ดูตัวอย่างการแสดงผล</div>
				<div class="collapse-content text-sm">
					<p class="rounded-sm bg-base-300 p-2 text-base-content">
						{#if abstractContent === ''}
							ยังไม่มีเนื้อหาบทคัดย่อ
						{:else}
							<RenderStyledText content={abstractContent} />
						{/if}
					</p>
				</div>
			</div>
		</div>
		{#if uploading.text}
			<div>
				<span class="loading loading-spinner" />
				<span>กำลังบันทึก</span>
			</div>
		{/if}
		{#if uploadError.text}
			<div class="alert alert-error">
				<Icon icon="mdi:alert-circle" class="h-6 w-6" />
				<span>เกิดข้อผิดพลาด: {uploadError.text}</span>
			</div>
		{/if}
		{#if uploadSuccess.text}
			<div class="alert alert-success my-3">
				<Icon icon="mdi:check-circle" class="h-6 w-6" />
				<span>{uploadSuccess.text}</span>
			</div>
		{/if}
	</div>
	<div class="">
		<h2>2. อัปโหลดบทคัดย่อรูปแบบ Document</h2>
		{#if lastUploadFile.document.lastUpdateDate}
			<p class="text-sm text-inherit text-opacity-10">
				อัปโหลดล่าสุดเมื่อ {dateTimeFormatter(new Date(lastUploadFile.document.lastUpdateDate))}
				<a href={lastUploadFile.document.url} target="_blank">ดาวน์โหลด</a>
			</p>
		{/if}
		<!-- .docx -->
		<Upload
			accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			bind:fileInput={abstractFileInput}
			bind:files={abstractStagedFilesDoc}
			class="relative my-4 {abstractStagedFilesDoc &&
				'border-green-600 bg-green-500/10 dark:border-green-400'}"
		>
			<svelte:fragment slot="label">
				{#if abstractStagedFilesDoc}
					<Icon
						icon="mdi:file-document-check"
						class="h-8 w-8 text-success-content dark:text-success"
					/>
					<span class="text-sm text-success-content dark:text-success">
						เลือกไฟล์ {abstractStagedFilesDoc[0].name}
					</span>
				{:else}
					<Icon icon="mdi:upload" class="h-8 w-8" />
					<span class="text-center">เลือกไฟล์บทคัดย่อรูปแบบเอกสารแก้ไขได้</span>
					<small class="text-center"> .docx </small>
				{/if}
			</svelte:fragment>
		</Upload>
		{#if uploading.document}
			<span>
				<span class="loading loading-spinner" /> กำลังอัปโหลด...
			</span>
		{/if}
		{#if uploadError.document}
			<div class="alert alert-error">
				<Icon icon="mdi:alert-circle" class="h-6 w-6" />
				<span>{uploadError.document}</span>
			</div>
		{/if}
		{#if uploadSuccess.document}
			<div class="alert alert-success my-3">
				<Icon icon="mdi:check-circle" class="h-6 w-6" />
				<span>{uploadSuccess.document}</span>
			</div>
		{/if}
	</div>
	<div class="">
		<h2>3. อัปโหลดบทคัดย่อรูปแบบ PDF</h2>
		{#if lastUploadFile.pdf.lastUpdateDate}
			<p class="text-sm text-inherit text-opacity-10">
				อัปโหลดล่าสุดเมื่อ {dateTimeFormatter(new Date(lastUploadFile.pdf.lastUpdateDate))}
				<a href={lastUploadFile.pdf.url} target="_blank">ดาวน์โหลด</a>
			</p>
		{/if}
		<Upload
			accept="application/pdf"
			bind:files={abstractStagedFilesPDF}
			class="relative my-4 {abstractStagedFilesPDF &&
				'border-green-700 bg-green-500/10 dark:border-green-400'}"
		>
			<svelte:fragment slot="label">
				{#if abstractStagedFilesPDF}
					<Icon
						icon="mdi:file-document-check"
						class="h-8 w-8 text-success-content dark:text-success"
					/>
					<span class="text-center text-sm text-success-content dark:text-success">
						เลือกไฟล์ {abstractStagedFilesPDF[0].name}
					</span>
				{:else}
					<Icon icon="mdi:upload" class="h-8 w-8" />
					<span>เลือกไฟล์บทคัดย่อรูปแบบ PDF</span>
					<small class="text-center"> .pdf </small>
				{/if}
			</svelte:fragment>
		</Upload>
		{#if uploading.pdf}
			<span>
				<span class="loading loading-spinner" /> กำลังอัปโหลด...
			</span>
		{/if}
		{#if uploadError.pdf}
			<div class="alert alert-error">
				<Icon icon="mdi:alert-circle" class="h-6 w-6" />
				<span>{uploadError.pdf}</span>
			</div>
		{/if}
		{#if uploadSuccess.pdf}
			<div class="alert alert-success my-3">
				<Icon icon="mdi:check-circle" class="h-6 w-6" />
				<span>{uploadSuccess.pdf}</span>
			</div>
		{/if}
	</div>
	<div>
		<button
			disabled={abstractContentBeforeEdit === abstractContent &&
				!abstractStagedFilesDoc &&
				!abstractStagedFilesPDF}
			class="btn-primary btn-block btn"
			on:click={uploadAbstract}
		>
			<Icon icon="mdi:content-save" class="h-6 w-6" />
			บันทึก/อัปโหลดบทคัดย่อ
		</button>
	</div>
</div>

<BottomChevron
	nextHref="step-4-article"
	nextPage="อัปโหลดบทความ"
	prevHref="step-2-project-information"
	prevPage="ข้อมูลโครงงาน"
/>

<style lang="scss">
	h2 {
		@apply mt-5 text-xl font-bold;
	}
</style>
