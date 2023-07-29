<script lang="ts">
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	import Icon from '@iconify/svelte';
	import { notify } from '$lib/notify';
	import type { StudentMembers, StudentRegisterProjectFormSchema } from '$lib/formSchemas';
	import RenderStyledText from '$lib/components/RenderStyledText.svelte';
	export let data: PageData;
	let tableData: Awaited<ReturnType<typeof getAllProject>> = [];

	let isInfoToggle = false;
	let isLoading = false;
	let abstractUploaded: string[] = [];
	let articleUploaded: string[] = [];
	let allProjectCount = 0;
	let studentCount = 0;

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
		allProjectCount = tableData.length;
		studentCount = tableData.reduce((acc, cur) => acc + cur.student_members.length, 0);
		// abstractUploaded = await getUploadedAbstract();
		// articleUploaded = await getUploadedArticle();
		isLoading = false;
	})();

	function formatMembers(studentMembers: StudentMembers[]) {
		return studentMembers.map((studentMember) => {
			return `${studentMember.title_th}${studentMember.firstname_th} ${studentMember.lastname_th}`;
		});
	}
</script>

<svelte:head>
	<title>รายการโครงงานทั้งหมดพร้อมสถานะ</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="fixed bottom-4 right-4 z-[1000] block md:hidden">
	<div
		class="w-xs rounded-md border bg-base-100 p-3 text-sm shadow-2xl transition-all duration-500 {!isInfoToggle
			? 'translate-y-[50%] opacity-0'
			: '-translate-y-16 opacity-100'}"
	>
		<h3 class="mb-3 font-bold">คำอธิบายสัญลักษณ์สถานะ</h3>
		<div>
			<span class="inline-block h-5 w-5 rounded-full bg-base-300 text-center">3</span> = ยังไม่อัปโหลดบทคัดย่อ
		</div>
		<div>
			<span class="inline-block h-5 w-5 rounded-full bg-base-300 text-center">4</span> = ยังอัปโหลดบทความ
		</div>
		<div>
			<span
				class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-content"
			>
				<Icon icon="mdi:tick" class="m-auto h-3.5 w-3.5" />
			</span> = อัปโหลดบทคัดย่อ/บทความแล้ว
		</div>
		<div>
			<span
				class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-content"
			>
				<Icon icon="mdi:help-rhombus" title="ยังไม่ได้จัดรหัสโครงงาน" />
			</span> = ยังไม่ได้จัดรหัสโครงงาน
		</div>
	</div>
	<label class="swap-rotate swap btn-primary btn-circle btn absolute bottom-0 right-0 shadow-2xl">
		<input type="checkbox" bind:checked={isInfoToggle} />
		<Icon icon="mdi:close" class="swap-on text-2xl" />
		<Icon icon="mdi:info" class="swap-off text-2xl" />
	</label>
</div>

<div class="p-5">
	<h1>รายการโครงงาน</h1>
	<p>
		รายการโครงงานโครงงานที่ร่วมนำเสนอรูปแบบ Onsite ที่โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
		บุรีรัมย์ สำหรับรูปแบบออนไลน์สามารถดูได้ที่ <a
			href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
			>https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/</a
		>
	</p>
	<div class="w-xs z-[500] hidden rounded-md border bg-base-100 p-3 text-sm md:block">
		<h3 class="mb-3 font-bold">คำอธิบายสัญลักษณ์สถานะ</h3>
		<div>
			<span class="inline-block h-5 w-5 rounded-full bg-base-300 text-center">3</span> = ยังไม่อัปโหลดบทคัดย่อ
		</div>
		<div>
			<span class="inline-block h-5 w-5 rounded-full bg-base-300 text-center">4</span> = ยังอัปโหลดบทความ
		</div>
		<div>
			<span
				class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-content"
			>
				<Icon icon="mdi:tick" class="m-auto h-3.5 w-3.5" />
			</span> = อัปโหลดบทคัดย่อ/บทความแล้ว
		</div>
		<div>
			<span
				class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-success-content"
			>
				<Icon icon="mdi:help-rhombus" title="ยังไม่ได้จัดรหัสโครงงาน" />
			</span> = ยังไม่ได้จัดรหัสโครงงาน
		</div>
	</div>
	<div class="stats my-2 bg-base-200 shadow">
		<div class="stat">
			<div class="stat-figure text-secondary">
				<Icon icon="mdi:arrow-projectile-multiple" class="h-7 w-7 shadow-sm" />
			</div>
			<div class="stat-title font-display">โครงงานทั้งหมด</div>
			<div class="stat-value">
				{#if isLoading}
					<span class="loading loading-spinner loading-sm" />
				{:else}
					{allProjectCount}
				{/if}
			</div>
		</div>
		<div class="stat">
			<div class="stat-figure text-secondary">
				<Icon icon="icons8:student" class="h-8 w-8 shadow-sm" />
			</div>
			<div class="stat-title font-display">นักเรียนที่เข้าร่วมงาน On-site</div>
			<div class="stat-value">
				{#if isLoading}
					<span class="loading loading-spinner loading-sm" />
				{:else}
					{studentCount}
				{/if}
			</div>
			<div class="stat-desc">
				เป็น {Math.floor((studentCount * 100) / (12 * 144))}% ของนักเรียน ม.6 ปี 2566
			</div>
		</div>
	</div>
</div>
<div class="relative overflow-x-auto">
	{#if isLoading}
		<span class="loading loading-spinner loading-sm" /> กำลังโหลด...
	{/if}
	<table class="table-pin-rows table">
		<thead>
			<tr>
				<th>รหัสโครงงาน</th>
				<th>สาขา</th>
				<th>รูปแบบการนำเสนอ</th>
				<th>ชื่อโครงงาน (ไทย)</th>
				<th>ชื่อโครงงาน (อังกฤษ)</th>
				<th>จังหวัด</th>
				<th>ผู้พัฒนาโครงงาน</th>
				<th>ครูที่ปรึกษา</th>
				<th>ที่ปรึกษาพิเศษ</th>
			</tr>
		</thead>
		<tbody>
			<!-- <pre>{JSON.stringify(tableData, null, 2)}</pre> -->
			{#each tableData as row}
				<tr>
					<td class="flex items-center justify-center text-center align-middle"
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
					<td>{row.field?.name}</td>
					<td class="whitespace-nowrap">{row.presentation_type?.type}</td>
					<td>
						<RenderStyledText content={row.title_th || ''} />
					</td>
					<td><RenderStyledText content={row.title_en || ''} /></td>
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
