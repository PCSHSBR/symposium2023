<script>
	import CdnPdfRenderer from '$lib/components/CdnPdfRenderer.svelte';
	import Icon from '@iconify/svelte';
	import PresentationSection from './PresentationSection.svelte';
	let filters = {};
</script>

<svelte:head>
	<title>ตารางเวลานำเสนอโครงงาน</title>
</svelte:head>

<article class="prose p-10">
	<span id="toc" class="absolute -top-20" />
	<h1>ตารางเวลานำเสนอโครงงาน</h1>
	<a
		class="btn-outline btn-md btn h-auto p-2 sm:btn-sm"
		href="https://pcshsbr-assets.imgix.net/sym2023/oral-presentation-schedule.pdf?dl=ตารางนำเสนอโครงงาน-science-symposium-2023-(รวมทุกสาขา).pdf"
	>
		<Icon icon="mdi:download" class="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
		ดาวน์โหลดไฟล์ PDF ตารางนำเสนอโครงงาน (รวมทุกสาขา)
	</a>
	<section class="mt-4 rounded-md bg-base-200 p-5">
		<h3 class="font-semibold">สารบัญ</h3>
		<ul class="ml-5 list-disc">
			<li>
				บรรยายภาษาไทย:
				<a href="#MATS-OT" class="btn-sm btn">คณิตศาสตร์</a>
				<a href="#PHYS-OT" class="btn-sm btn">ฟิสิกส์และดาราศาสตร์</a>
				<a href="#CHEM-OT" class="btn-sm btn">เคมีและวัสดุศาสตร์</a>
				<a href="#BIOL-OT" class="btn-sm btn">ชีววิทยาและสิ่งแวดล้อม</a>
				<a href="#COMP-OT" class="btn-sm btn">คอมพิวเตอร์</a>
				<a href="#ENGR-OT" class="btn-sm btn">วิศวกรรมศาสตร์</a>
			</li>
			<li>
				บรรยายภาษาอังกฤษ:
				<a href="#MATS-OE" class="btn-sm btn">คณิตศาสตร์</a>
				<a href="#PHYS-OE" class="btn-sm btn">ฟิสิกส์และดาราศาสตร์</a>
				<a href="#CHEM-OE" class="btn-sm btn">เคมีและวัสดุศาสตร์</a>
				<a href="#BIOL-OE" class="btn-sm btn">ชีววิทยาและสิ่งแวดล้อม</a>
				<a href="#COMP-OE" class="btn-sm btn">คอมพิวเตอร์</a>
				<a href="#ENGR-OE" class="btn-sm btn">วิศวกรรมศาสตร์</a>
			</li>
		</ul>
	</section>

	<PresentationSection
		name="สาขาคณิตศาสตร์ ภาคบรรยายภาษาไทย"
		pages={[2, 3]}
		room="คณิตศาสตร์ 2"
		roomNumber={216}
		id="MATS-OT"
		disabledGoToTOC
	/>
	<PresentationSection
		name="สาขาฟิสิกส์และดาราศาสตร์ ภาคบรรยายภาษาไทย"
		pages={[5, 6]}
		room="ฟิสิกส์ 2"
		roomNumber={212}
		id="PHYS-OT"
	/>
	<PresentationSection
		name="สาขาเคมีและวัสดุศาสตร์ ภาคบรรยายภาษาไทย"
		pages={[8, 9]}
		room="เคมี 2"
		roomNumber={213}
		id="CHEM-OT"
	/>
	<PresentationSection
		name="สาขาชีววิทยาและสิ่งแวดล้อม ภาคบรรยายภาษาไทย"
		pages={[11, 12]}
		room="ชีววิทยา 2"
		roomNumber={214}
		id="BIOL-OT"
	/>
	<PresentationSection
		name="สาขาคอมพิวเตอร์ ภาคบรรยายภาษาไทย"
		pages={[14, 15]}
		room="คอมพิวเตอร์ 2"
		roomNumber={217}
		id="COMP-OT"
	/>
	<PresentationSection
		name="สาขาวิศวกรรมศาสตร์ ภาคบรรยายภาษาไทย"
		pages={[17, 18]}
		room="วิศวกรรม 2"
		roomNumber={218}
		id="ENGR-OT"
	/>
	<PresentationSection
		name="Mathematics (English Session)"
		pages={[20, 21]}
		room="คณิตศาสตร์ 1"
		roomNumber={226}
		id="MATS-OE"
	/>
	<PresentationSection
		name="Physics and Astronomy (English Session)"
		pages={[23, 24]}
		room="ฟิสิกส์ 1"
		roomNumber={223}
		id="PHYS-OE"
	/>
	<PresentationSection
		name="Chemistry and Materials Science (English Session)"
		pages={[26, 27]}
		room="เคมี 1"
		roomNumber={224}
		id="CHEM-OE"
	/>
	<PresentationSection
		name="Biology and Environment (English Session)"
		pages={[29, 30]}
		room="ชีววิทยา 1"
		roomNumber={225}
		id="BIOL-OE"
	/>
	<PresentationSection
		name="Computer (English Session)"
		pages={[32, 33]}
		room="คอมพิวเตอร์ 1"
		roomNumber={227}
		id="COMP-OE"
	/>
	<PresentationSection
		name="Engineering (English Session)"
		pages={[35, 36]}
		room="วิศวกรรม 1"
		roomNumber={228}
		id="ENGR-OE"
	/>

	<a href="#top" class="btn-link btn-outline btn mx-auto my-7">
		<Icon icon="mdi:arrow-up" class="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
		กลับสู่ด้านบน
	</a>
</article>
