<script lang="ts">
	import { onMount } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';
	import { fetchProjects } from '$lib/sheet';
	import '$lib/styles/tabulator.scss';

	let table: Tabulator;
	let tableComponent: HTMLDivElement;

	onMount(async () => {
		const tabledata = await fetchProjects();
		table = new Tabulator(tableComponent, {
			data: tabledata,
			index: 'internal_code',
			columns: [
				{ title: 'รหัสโครงงาน', field: 'code', width: 100, headerFilter: 'input' },
				{
					title: 'สาขา',
					field: 'field',
					width: 150,
					headerFilter: 'list',
					headerFilterParams: {
						values: [
							'ชีววิทยาและสิ่งแวดล้อม',
							'เคมีและวัสดุศาสตร์',
							'คอมพิวเตอร์และเทคโนโลยี',
							'วิศวกรรมศาสตร์',
							'คณิตศาสตร์',
							'ฟิสิกส์และดาราศาสตร์'
						],
						placeholderEmpty: 'ไม่พบผลลัพธ์'
					}
				},
				{
					title: 'ประเภท',
					field: 'type',
					width: 150,
					headerFilter: 'list',
					headerFilterParams: {
						values: ['ภาคบรรยาย (อังกฤษ)', 'ภาคบรรยาย (ภาษาไทย)', 'โปสเตอร์ (ภาษาไทย)'],
						placeholderEmpty: 'ไม่พบผลลัพธ์'
					}
				},
				{ title: 'ชื่อโครงงานไทย', field: 'title_th', width: 300, headerFilter: 'input' },
				{ title: 'ชื่อโครงงานอังกฤษ', field: 'title_en', width: 300, headerFilter: 'input' },
				{
					title: 'จังหวัด',
					field: 'province',
					width: 100,
					headerFilter: 'list',
					headerFilterParams: {
						values: [
							'ชลบุรี',
							'เชียงราย',
							'ตรัง',
							'นครศรีธรรมราช',
							'บุรีรัมย์',
							'ปทุมธานี',
							'พิษณุโลก',
							'เพชรบุรี',
							'มุกดาหาร',
							'ลพบุรี',
							'เลย',
							'สตูล'
						],
						placeholderEmpty: 'ไม่พบผลลัพธ์'
					}
				},
				{ title: 'สมาชิก', field: 'members', width: 175, headerFilter: 'input' },
				{ title: 'ครูที่ปรึกษา', field: 'teachers', width: 175, headerFilter: 'input' },
				{ title: 'ที่ปรึกษาพิเศษ', field: 'special_advisors', width: 175, headerFilter: 'input' }
			],
			clipboard: true
		});
	});
</script>

<svelte:head>
	<title>รายการโครงงาน</title>
	<meta
		name="description"
		content="รายการโครงงาน On-site ในงาน The 3rd PCSHS Science Symposium 2023"
	/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.20/jspdf.plugin.autotable.min.js"
	></script>
</svelte:head>

<div class="p-5">
	<h1>รายการโครงงาน</h1>
	<p>
		รายการโครงงานโครงงานที่ร่วมนำเสนอรูปแบบ Onsite ที่โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
		บุรีรัมย์ สำหรับรูปแบบออนไลน์สามารถดูได้ที่ <a
			href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
			>https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/</a
		>
	</p>
</div>

<div class="overflow-x-auto px-5">
	<div bind:this={tableComponent} />
</div>
