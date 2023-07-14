<script lang="ts">
	import Icon from '@iconify/svelte';
	import BottomChevron from '../BottomChevron.svelte';
	import Upload from '../Upload.svelte';
	import { dateTimeFormatter } from '$lib/langUtils';
	import type { PageData } from './$types';
	import { notify } from '$lib/notify';

	let articleFile: File | null = null;
	let articleStagedFilesDoc: FileList;
	let articleStagedFilesPDF: FileList;

	export let data: PageData;

	let uploadError = {
		document: '',
		pdf: ''
	};
	let uploadSuccess = {
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

	async function uploadDocx() {
		uploading.document = true;
		const result = await data.supabase.storage
			.from('articles')
			.upload(
				`${data.session?.user.id}/article.${articleStagedFilesDoc[0].name.split('.').pop()}`,
				articleStagedFilesDoc[0],
				{
					cacheControl: '3600',
					upsert: true
				}
			);
		if (result.error) {
			uploadError.document = result.error.message;
			uploading.document = false;
			return notify({
				message: result.error.message,
				type: 'error'
			});
		}
		uploadSuccess.document = 'อัปโหลดเรียบร้อย';
		uploading.document = false;
		lastUploadFile.document.lastUpdateDate = new Date().toISOString();
	}

	async function uploadPDF() {
		uploading.pdf = true;
		const result = await data.supabase.storage
			.from('articles')
			.upload(
				`${data.session?.user.id}/article.${articleStagedFilesPDF[0].name.split('.').pop()}`,
				articleStagedFilesPDF[0],
				{
					cacheControl: '3600',
					upsert: true
				}
			);
		if (result.error) {
			uploadError.pdf = result.error.message;
			uploading.pdf = false;
			return notify({
				message: result.error.message,
				type: 'error'
			});
		}
		uploadSuccess.pdf = 'อัปโหลดเรียบร้อย';
		uploading.pdf = false;
		lastUploadFile.pdf.lastUpdateDate = new Date().toISOString();
		data.supabase
			.from('project_status')
			.update({
				is_uploaded_article: true
			})
			.eq('team_contact_user_id', data.session?.user.id);
	}

	async function uploadArticle() {
		if (!articleStagedFilesDoc && !articleStagedFilesPDF) {
			return;
		}
		if (articleStagedFilesDoc) {
			uploadError.document = '';
			uploadSuccess.document = '';
			uploadDocx();
		}
		if (articleStagedFilesPDF) {
			uploadError.pdf = '';
			uploadSuccess.pdf = '';
			uploadPDF();
		}
	}

	(async () => {
		data.supabase.storage
			.from('articles')
			.list(`${data.session?.user.id}/`)
			.then((result) => {
				console.log(result);
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
								.from('articles')
								.getPublicUrl(`${data.session?.user.id}/${file.name}`).data.publicUrl;
						}
						if (file.name.endsWith('.pdf')) {
							lastUploadFile.pdf.lastUpdateDate = file.updated_at;
							lastUploadFile.pdf.url = data.supabase.storage
								.from('articles')
								.getPublicUrl(`${data.session?.user.id}/${file.name}`).data.publicUrl;
						}
					});
				}
			});
	})();
</script>

<div class="mt-4 flex flex-row justify-between gap-5 sm:flex-row-reverse sm:justify-end">
	<h1>อัปโหลดบทความวิชาการ</h1>
	<div>
		<div
			class="text-display flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white"
		>
			4
		</div>
	</div>
</div>

<div>
	<h2>รูปแบบบทความ</h2>
	<p>
		คุณสามารถดูตัวอย่างบทความได้ที่<a
			target="_blank"
			href="https://drive.google.com/drive/folders/1P1nfoJ9mBKbJOENBbHmm_Om46doDjJHZ?usp=drive_link"
			>โฟลเดอร์รวมตัวอย่างเอกสาร</a
		>
	</p>

	<div class="">
		<h2>1. อัปโหลดบทคัดย่อรูปแบบ Document</h2>
		{#if lastUploadFile.document.lastUpdateDate}
			<p class="text-sm text-inherit text-opacity-10">
				อัปโหลดล่าสุดเมื่อ {dateTimeFormatter(new Date(lastUploadFile.document.lastUpdateDate))}
				<a href={lastUploadFile.document.url} target="_blank">ดาวน์โหลด</a>
			</p>
		{/if}
		<!-- .docx -->
		<Upload
			accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
			bind:files={articleStagedFilesDoc}
			class="relative my-4 {articleStagedFilesDoc &&
				'border-green-600 bg-green-500/10 dark:border-green-400'}"
		>
			<svelte:fragment slot="label">
				{#if articleStagedFilesDoc}
					<Icon
						icon="mdi:file-document-check"
						class="h-8 w-8 text-success-content dark:text-success"
					/>
					<span class="text-sm text-success-content dark:text-success">
						เลือกไฟล์ {articleStagedFilesDoc[0].name}
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
		<h2>2. อัปโหลดบทคัดย่อรูปแบบ PDF</h2>
		{#if lastUploadFile.pdf.lastUpdateDate}
			<p class="text-sm text-inherit text-opacity-10">
				อัปโหลดล่าสุดเมื่อ {dateTimeFormatter(new Date(lastUploadFile.pdf.lastUpdateDate))}
				<a href={lastUploadFile.pdf.url} target="_blank">ดาวน์โหลด</a>
			</p>
		{/if}
		<Upload
			accept="application/pdf"
			bind:files={articleStagedFilesPDF}
			class="relative my-4 {articleStagedFilesPDF &&
				'border-green-700 bg-green-500/10 dark:border-green-400'}"
		>
			<svelte:fragment slot="label">
				{#if articleStagedFilesPDF}
					<Icon
						icon="mdi:file-document-check"
						class="h-8 w-8 text-success-content dark:text-success"
					/>
					<span class="text-center text-sm text-success-content dark:text-success">
						เลือกไฟล์ {articleStagedFilesPDF[0].name}
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
			disabled={!articleStagedFilesDoc && !articleStagedFilesPDF}
			class="btn-primary btn-block btn"
			on:click={uploadArticle}
		>
			<Icon icon="mdi:content-save" class="h-6 w-6" />
			อัปโหลดบทความวิชาการ
		</button>
	</div>
</div>

<BottomChevron prevHref="step-3-abstract" prevPage="บทคัดย่อ" />

<style lang="scss">
	h2 {
		@apply mt-5 text-xl font-bold;
	}
</style>
