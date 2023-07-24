<script lang="ts">
	import Icon from '@iconify/svelte';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { notify } from '$lib/notify';
	import type { StyledText } from '$lib/types';
	import { textListFormatter } from '$lib/langUtils';
	export let data: PageData;
	interface ProjectData {
		data?: {
			project_title_th: StyledText;
			project_title_en: StyledText;
			field: string;
			presentation_type: string;
			school: string;
			members: string[];
			teachers: string[];
			special_advisors: string[];
			teamImageUrl: string;
			abstract: string;
		};
		isProjectDataAvailable?: boolean;
		isLoadingData?: boolean;
	}

	let projectData: ProjectData = {};

	async function getAndSetImage() {
		if (projectData.data?.teamImageUrl) return;
		const teamImageResult = await data.supabase.storage
			.from('teamImages')
			.list(data.session?.user.id, {
				limit: 1,
				sortBy: {
					// newest first
					column: 'updated_at',
					order: 'desc'
				}
			});
		if (teamImageResult.error) {
			notify({
				message: `${teamImageResult.error.message}`,
				type: 'error'
			});
			return;
		}
		if (teamImageResult.data?.length !== 0) {
			const {
				data: { publicUrl }
			} = data.supabase.storage
				.from('teamImages')
				.getPublicUrl(`${data.session?.user.id}/${teamImageResult.data[0].name}`, {});
			projectData.data.teamImageUrl = publicUrl + '?width=400&height=300';
			stepData.step2.isDone = true;
		}
	}

	async function getProjectData(d) {
		function getName({ title_en, firstname_en, lastname_en, title_th, firstname_th, lastname_th }) {
			const isEn = d.presentation_type.id === 2;
			if (isEn) {
				return ` ${title_en} ${firstname_en} ${lastname_en}`;
			} else {
				return `${title_th}${firstname_th} ${lastname_th}`;
			}
		}
		getAndSetImage();
		projectData.data = {
			field: d.field.name,
			presentation_type: d.presentation_type.type,
			school: `วิทยาศาสตร์จุฬาภรณราชวิทยาลัย ${d.school.province}`,
			project_title_en: d.title_en,
			project_title_th: d.title_th,
			members: d.student_members.map(getName),
			teachers: d.teacher_advisor.map(getName),
			special_advisors: d.special_advisor.map(getName),
			abstract: d.abstract
		};
		stepData.step3.text = d.abstract;
		projectData.isLoadingData = false;
	}

	onMount(async () => {
		projectData.isLoadingData = true;
		const currentUserProjectIDResult = await data.supabase
			.from('projects')
			.select(
				`
				title_en,
				title_th,
				code,
				field (
					id,
					name
				),
				presentation_type (
					id,
					type,
					description,
					is_onsite
				), 
				school (
					id,
					province
				),
				special_advisor,
				student_members,
				teacher_advisor,
				abstract
			`
			)
			.eq('team_contact_user_id', data.session?.user.id)
			.limit(1);
		if (currentUserProjectIDResult.error) {
			notify({
				message: `${currentUserProjectIDResult.error.message} <br/><small>${currentUserProjectIDResult.error.hint}</small>`,
				type: 'error'
			});
			return;
		}
		if (currentUserProjectIDResult.data?.length !== 0) {
			projectData.isProjectDataAvailable = true;
			getProjectData(currentUserProjectIDResult.data[0]);
		}
	});

	let stepData = {
		step1: {
			isDone: true
		},
		step2: {
			isDone: !!projectData.data?.teamImageUrl
		},
		step3: {
			isDone: !!projectData.data?.abstract,
			text: projectData.data?.abstract,
			docUrl: '',
			pdfUrl: ''
		},
		step4: {
			isDone: false,
			docUrl: '',
			pdfUrl: ''
		}
	};

	(async () => {
		await data.supabase.storage
			.from('abstracts')
			.list(data.session?.user.id, {
				limit: 2,
				sortBy: {
					column: 'updated_at',
					order: 'desc'
				}
			})
			.then(async (result) => {
				if (result.error) {
					notify({
						message: `${result.error.message}`,
						type: 'error'
					});
					return;
				}
				if (result.data?.length !== 0) {
					const abstract = result.data[0];
					const {
						data: { publicUrl }
					} = data.supabase.storage
						.from('abstracts')
						.getPublicUrl(`${data.session?.user.id}/${abstract.name}`, {});
					stepData.step3.docUrl = publicUrl;
					stepData.step3.pdfUrl = publicUrl.replace('.docx', '.pdf');
					stepData.step3.isDone = true;
				}
			});
	})();

	(async () => {
		await data.supabase.storage
			.from('articles')
			.list(data.session?.user.id, {
				limit: 2,
				sortBy: {
					column: 'updated_at',
					order: 'desc'
				}
			})
			.then(async (result) => {
				if (result.error) {
					notify({
						message: `${result.error.message}`,
						type: 'error'
					});
					return;
				}
				if (result.data?.length !== 0) {
					const abstract = result.data[0];
					const {
						data: { publicUrl }
					} = data.supabase.storage
						.from('abstracts')
						.getPublicUrl(`${data.session?.user.id}/${abstract.name}`, {});
					stepData.step4.docUrl = publicUrl;
					stepData.step4.pdfUrl = publicUrl.replace('.docx', '.pdf');
					stepData.step4.isDone = true;
				}
			});
	})();
</script>

<svelte:head>
	<title>โครงงานของฉัน</title>
</svelte:head>

<section class="m-auto w-[calc(100%-64px)] pt-[calc(6rem)]">
	<h1>โครงงานของฉัน</h1>
	<div class="custom-steps step1 mt-4">
		<div
			class="custom-step"
			class:custom-step-onprogress={true}
			class:custom-step-primary={stepData.step1.isDone}
		>
			<span>
				{#if stepData.step1.isDone}
					<Icon icon="mdi:check" class="h-8 w-8" />
				{:else}
					1
				{/if}
			</span>
			<span />
		</div>
		<div>
			<h2 class="flex flex-row">
				สร้างบัญชี {#if !stepData.step1.isDone}<span class="text-warning">
						<Icon icon="mdi:account-alert" class="ml-4 h-8 w-8" /></span
					>{/if}
			</h2>
			<p>
				{#if stepData.step1.isDone}
					คุณตั้งค่าข้อมูลเกี่ยวกับบัญชีของคุณเรียบร้อยแล้ว
				{:else}
					<span class="text-warning"
						>คุณยังเพิ่มข้อมูลบัญชีของคุณไม่เรียบร้อย โปรดไปที่ <a href="/welcome">หน้าต้อนรับ</a> เพื่อดำเนินการต่อให้เสร็จสิ้น</span
					>
				{/if}
			</p>
			<a href="/account" class="tooltip tooltip-bottom" data-tip="ไปยังหน้าการตั้งค่าบัญชี">
				<button class="btn-sm btn my-2 mt-3"
					><Icon icon="mdi:edit" class="h-4 w-4" /> แก้ไขข้อมูลบัญชี</button
				>
			</a>
		</div>
	</div>
	<div class="custom-steps step2">
		<div
			class="custom-step"
			class:custom-step-onprogress={stepData.step1.isDone}
			class:custom-step-primary={stepData.step2.isDone}
		>
			<span>
				{#if stepData.step2.isDone}
					<Icon icon="mdi:check" class="h-8 w-8" />
				{:else}
					2
				{/if}
			</span>
			<span />
		</div>
		<div>
			<h2>
				ข้อมูลโครงงาน
				{#if projectData.isLoadingData}
					<span class="loading loading-spinner loading-sm" />
				{/if}
			</h2>
			<p>
				{#if stepData.step1.isDone && !stepData.step2.isDone}เพิ่ม{/if}รายละเอียดต่าง ๆ ของโครงงาน
			</p>
			{#if projectData.isProjectDataAvailable}
				<ul class="mt-2 w-full rounded-md bg-base-200 p-3 text-sm leading-6">
					<li>
						<b>ชื่อโครงงาน (ไทย):</b>
						<RenderStyledText content={projectData.data?.project_title_th} />
					</li>
					<li>
						<b>ชื่อโครงงาน (อังกฤษ):</b>
						<RenderStyledText content={projectData.data?.project_title_en} />
					</li>
					<li>
						<b>สาขา:</b>
						{projectData.data?.field}
					</li>
					<li>
						<b>รูปแบบการนำเสนอ:</b>
						{projectData.data?.presentation_type}
					</li>
					<li>
						<b>โรงเรียน:</b>
						{projectData.data?.school}
					</li>
					<li>
						<b>สมาชิกในทีม:</b>
						{textListFormatter((projectData.data?.members || []).map((t) => `${t} `))}
					</li>
					<li>
						<b>ครูที่ปรึกษาโครงงาน:</b>
						{textListFormatter((projectData.data?.teachers || []).map((t) => `${t} `))}
					</li>
					<li>
						<b>ที่ปรึกษาพิเศษ:</b>
						{#if projectData.data?.special_advisors.length > 0}
							{#if projectData.data?.special_advisors[0].trim() !== ''}
								{textListFormatter((projectData.data?.special_advisors || []).map((t) => `${t} `))}
							{:else}
								- ไม่มี -
							{/if}
						{:else}
							- ไม่มี -
						{/if}
					</li>
					<li class="mt-2">
						<b>ภาพหมู่: </b>
						<div
							class="relative flex aspect-[4/3] w-full max-w-xs flex-col justify-center rounded-md border text-center align-middle {projectData
								.data?.teamImageUrl
								? 'border-gray-600 dark:border-gray-400'
								: 'border-warning shadow-md shadow-warning/25'} mt-2 border-dashed"
						>
							{#if projectData.data?.teamImageUrl}
								<img
									alt="ภาพกลุ่มโครงงาน"
									src={projectData.data?.teamImageUrl}
									class="absolute h-full w-full rounded-md object-cover"
								/>
							{:else}
								<div class="flex flex-col items-center justify-center gap-2 text-center">
									<Icon icon="mdi:image-off" class="h-8 w-8 text-warning" />
									<span class="text-warning">ยังไม่ได้อัปภาพ</span>
								</div>
							{/if}
						</div>
					</li>
				</ul>
			{/if}
			{#if stepData.step1.isDone}
				<a href="/my-project/edit/step-2-project-information">
					<button class="btn-primary btn-sm btn mt-3" title="แก้ไขข้อมูลโครงงาน"
						><Icon icon="mdi:edit" class="h-4 w-4" /> แก้ไข</button
					>
				</a>
			{/if}
		</div>
	</div>
	<div class="custom-steps step3">
		<div
			class="custom-step"
			class:custom-step-onprogress={stepData.step2.isDone}
			class:custom-step-primary={stepData.step3.isDone}
		>
			<span>
				{#if stepData.step3.isDone}
					<Icon icon="mdi:check" class="h-8 w-8" />
				{:else}
					3
				{/if}
			</span>
			<span />
		</div>
		<div>
			<h2>อัปโหลดบทคัดย่อ</h2>
			<p>บทคัดย่อของโครงงาน</p>
			{#if stepData.step3.text}
				<div class="rounded-md bg-base-200 p-3 leading-4">
					<div class="line-clamp-4">
						<b>เนื้อหาบทคัดย่อ:</b>
						<RenderStyledText content={stepData.step3.text} />
					</div>
				</div>
			{/if}
			<ul>
				{#if stepData.step3.docUrl}
					<li><a href={stepData.step3.docUrl}>ดาวน์โหลด DOCX</a></li>
				{/if}
				{#if stepData.step3.pdfUrl}
					<li><a href={stepData.step3.pdfUrl}>ดาวน์โหลด PDF</a></li>
				{/if}
			</ul>
			{#if stepData.step2.isDone}
				<a href="/my-project/edit/step-3-abstract">
					<button class="{!stepData.step3.isDone ? 'btn-primary' : ''} btn-sm btn my-2 mt-3"
						><Icon icon="mdi:upload" class="h-4 w-4" /> อัปโหลด{stepData.step3.isDone
							? 'ใหม่อีกครั้ง'
							: ''}
					</button>
				</a>
			{/if}
		</div>
	</div>
	<div class="custom-steps step4">
		<div
			class="custom-step custom-step-last"
			class:custom-step-onprogress={stepData.step3.isDone}
			class:custom-step-primary={stepData.step4.isDone}
		>
			<span>
				{#if stepData.step4.isDone}
					<Icon icon="mdi:check" class="h-8 w-8" />
				{:else}
					4
				{/if}
			</span>
			<span />
		</div>
		<div>
			<h2>อัปโหลดบทความวิชาการ</h2>
			<p>บทความเชิงวิชาการของโครงงาน</p>
			<ul>
				{#if stepData.step3.docUrl}
					<li><a href={stepData.step4.docUrl}>ดาวน์โหลด DOCX</a></li>
				{/if}
				{#if stepData.step3.pdfUrl}
					<li><a href={stepData.step4.pdfUrl}>ดาวน์โหลด PDF</a></li>
				{/if}
			</ul>
			{#if stepData.step3.isDone}
				<a href="/my-project/edit/step-4-article">
					<button class="{!stepData.step4.isDone ? 'btn-primary' : ''} btn-sm btn my-2 mt-3"
						><Icon icon="mdi:upload" class="h-4 w-4" /> อัปโหลด{stepData.step4.isDone
							? 'ใหม่อีกครั้ง'
							: ''}
					</button>
				</a>
			{/if}
		</div>
	</div>
</section>

{#if stepData.step1.isDone && stepData.step2.isDone && stepData.step3.isDone && stepData.step4.isDone}
	<div class="alert mx-3 box-border h-auto w-auto bg-success text-success-content">
		<Icon icon="icon-park-solid:success" class="h-11 w-11" />
		<h2 class="text-2xl font-bold">คุณส่งโครงงานเรียบร้อยแล้ว!</h2>
	</div>
{/if}

<style lang="scss">
	h2 {
		@apply my-2 text-2xl font-bold;
	}
	.custom-steps {
		@apply relative mt-8 flex flex-row;
	}
	.custom-step {
		@apply z-10 m-10 flex flex-col items-center font-display text-2xl font-bold;
	}
	.custom-step span:first-child {
		@apply absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-base-200 text-base-content;
	}
	.custom-step span:last-child {
		@apply absolute left-5 -z-10 h-full w-2 bg-base-200;
	}

	.custom-step-primary span:first-child,
	.custom-step-primary span:last-child {
		@apply bg-primary text-primary-content;
	}

	.custom-step-last span:last-child {
		@apply hidden;
	}
	.custom-step-onprogress span:first-child {
		content: '';
		@apply bg-primary text-primary-content;
	}
</style>
