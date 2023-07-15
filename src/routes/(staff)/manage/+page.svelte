<script lang="ts">
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	import Icon from '@iconify/svelte';
	import { notify } from '$lib/notify';
	import type { StudentMembers, StudentRegisterProjectFormSchema } from '$lib/formSchemas';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	import type { PostgrestResponse } from '@supabase/supabase-js';
	export let data: PageData;
	let tableData: Awaited<ReturnType<typeof getAllProject>> = [];
	let tableKeys = [
		'รหัสโครงงาน',
		'สถานะ',
		'สาขา',
		'รูปแบบการนำเสนอ',
		'ชื่อโครงงาน (ไทย)',
		'ชื่อโครงงาน (อังกฤษ)',
		'จังหวัด',
		'ผู้พัฒนาโครงงาน',
		'ครูที่ปรึกษา',
		'ที่ปรึกษาพิเศษ'
	];

	let isLoading = false;
	let abstractUploaded: string[] = [];
	let articleUploaded: string[] = [];

	async function getAllProject({ start = 0, end = 25 }: { start?: number; end?: number } = {}) {
		const results = await data.supabase
			.from('projects')
			.select(
				`
				id,
				created_at,
				team_contact_user_id,
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
			.order('school', { ascending: true });
		// .range(start, end);
		if (results.error) {
			notify({ message: results.error.message, type: 'error' });
			return [];
		}
		return results.data;
	}

	async function getUploadedAbstract() {
		const res = await data.supabase.storage.from('abstracts').list('');
		if (res.error) {
			notify({ message: res.error.message, type: 'error' });
			return [];
		}
		return res.data.map((f) => f.name);
	}

	async function getUploadedArticle() {
		const res = await data.supabase.storage.from('articles').list('');
		if (res.error) {
			notify({ message: res.error.message, type: 'error' });
			return [];
		}
		return res.data.map((f) => f.name);
	}

	(async () => {
		isLoading = true;
		tableData = await getAllProject();
		abstractUploaded = await getUploadedAbstract();
		articleUploaded = await getUploadedArticle();
		isLoading = false;
	})();

	function formatMembers(studentMembers: StudentMembers[]) {
		return studentMembers.map((studentMember) => {
			return `${studentMember.title_th}${studentMember.firstname_th} ${studentMember.lastname_th}`;
		});
	}

	function projectStatus(user_id: string) {
		console.log({ abstractUploaded });
		console.log({ articleUploaded });
		console.log(user_id, abstractUploaded.includes(user_id), articleUploaded.includes(user_id));
		return [
			{
				label: '3',
				isDone: abstractUploaded.includes(user_id)
			},
			{
				label: '4',
				isDone: articleUploaded.includes(user_id)
			}
		];
	}
</script>

<svelte:head>
	<title>รายการโครงงานทั้งหมดพร้อมสถานะ</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<h1>รายการโครงงาน</h1>
<div class="overflow-x-auto">
	{#if isLoading}
		<span class="loading loading-spinner loading-sm" /> กำลังโหลด...
	{/if}
	<table class="table-pin-rows table">
		<thead>
			<tr>
				{#each tableKeys as key}
					<th>{key}</th>
				{/each}</tr
			>
		</thead>
		<tbody>
			<!-- <pre>{JSON.stringify(tableData, null, 2)}</pre> -->
			{#each tableData as row}
				<tr>
					<td class="flex justify-center text-center"
						>{#if row.code == null}
							<Icon
								icon="mdi:help-rhombus"
								class="h-5 w-5 opacity-30"
								title="ยังไม่ได้จัดรหัสโครงงาน"
							/>
						{:else}
							{row.code}
						{/if}</td
					>
					<td class="flex flex-row gap-2"
						><button
							class="block h-6 w-6 rounded-full {abstractUploaded.includes(row.team_contact_user_id)
								? 'bg-success text-success-content'
								: 'bg-base-300'}"
						>
							{#if abstractUploaded.includes(row.team_contact_user_id)}
								<Icon icon="mdi:tick" class="h-3 w-3" />
							{:else}
								3
							{/if}
						</button><button
							class="block h-6 w-6 rounded-full {articleUploaded.includes(row.team_contact_user_id)
								? 'bg-success text-success-content'
								: 'bg-base-300'}"
						>
							{#if articleUploaded.includes(row.team_contact_user_id)}
								<Icon icon="mdi:tick" class="h-3 w-3" />
							{:else}
								4
							{/if}</button
						>
					</td>
					<td>{row.field?.name}</td>
					<td class="whitespace-nowrap">{row.presentation_type?.type}</td>
					<td>
						<RenderStyledText content={row.title_th} />
					</td>
					<td><RenderStyledText content={row.title_en} /></td>
					<td>{row.school?.province}</td>
					<td>
						<ul>
							{#each formatMembers(row.student_members) as p}
								<li class="whitespace-nowrap">
									{p.trim()}
								</li>
							{/each}
						</ul>
					</td>
					<td>
						<ul>
							{#each formatMembers(row.teacher_advisor) as p}
								<li class="whitespace-nowrap">
									{p.trim()}
								</li>
							{/each}
						</ul></td
					>
					<td>
						<ul>
							{#each formatMembers(row.special_advisor) as p}
								<li class="whitespace-nowrap">
									{p.trim()}
								</li>
							{:else}
								-
							{/each}
						</ul>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
