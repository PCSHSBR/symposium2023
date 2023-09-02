<script lang="ts">
	import CdnPdfRenderer from '$lib/components/CdnPdfRenderer.svelte';
	import Icon from '@iconify/svelte';
	import PresentationSection from './PresentationSection.svelte';
	import H2PresentationSection from './H2PresentationSection.svelte';
	import { onMount } from 'svelte';
	let filters = {};
	let isStandTV: boolean = false;

	onMount(() => {
		isStandTV = localStorage.getItem('standtv') === '1' ? true : false;
	});
</script>

<svelte:head>
	<title>ตารางเวลานำเสนอโครงงาน</title>
	<meta
		name="description"
		content="ตารางเวลานำเสนอโครงงาน ภาคบรรยายภาษาไทย ภาคบรรยายภาษาอังกฤษ และโปสเตอร์"
	/>
	<meta property="og:title" content="ตารางเวลานำเสนอโครงงาน" />
	<meta
		property="og:description"
		content="ตารางเวลานำเสนอโครงงาน ภาคบรรยายภาษาไทย ภาคบรรยายภาษาอังกฤษ และโปสเตอร์"
	/>
	<meta
		property="og:image"
		content="https://termtem-cdn.imgix.net/sym2023/og-image.png?w=1200&h=630&fit=crop&auto=compress"
	/>
	<meta property="og:url" content="https://3rdpss2023.pcshsbr.ac.th/schedule" />
	<meta
		property="og:site_name"
		content="การนำเสนอผลงานนักเรียนกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3"
	/>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="3rdpss2023.pcshsbr.ac.th" />
	<meta property="twitter:url" content="https://3rdpss2023.pcshsbr.ac.th/schedule" />
	<meta property="twitter:title" content="ตารางเวลานำเสนอโครงงาน" />
	<meta
		name="twitter:description"
		content="การนำเสนอผลงานนักเรียนกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3"
	/>
	<meta
		name="twitter:image"
		content="https://termtem-cdn.imgix.net/sym2023/og-image.png?w=1200&h=630&fit=crop&auto=compress"
	/>
</svelte:head>

<article class="prose relative p-10">
	{#if isStandTV}<a href="/" title="กลับไปหน้าหลัก"
			><button class="btn btn-lg"><Icon icon="mdi:home" />กลับไปหน้าหลัก</button></a
		>{/if}
	<span id="toc" class="absolute -top-20" />
	<h1>ตารางเวลานำเสนอโครงงาน</h1>
	<a
		class="btn btn-outline btn-md mb-1 h-auto p-2 sm:btn-sm"
		href="https://pcshsbr-assets.imgix.net/sym2023/oral-presentation-schedule.pdf?dl=ตารางนำเสนอโครงงาน-oral-science-symposium-2023-(รวมทุกสาขา).pdf"
	>
		<Icon icon="mdi:download" class="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
		ตารางนำเสนอโครงงาน (รวมทุกสาขา) ภาคบรรยายไทยและอังกฤษ
	</a>
	<a
		class="btn btn-outline btn-md mt-1 h-auto p-2 sm:btn-sm"
		href="https://pcshsbr-assets.imgix.net/sym2023/poster-presentation-schedule.pdf?dl=ตารางนำเสนอโครงงาน-poster-science-symposium-2023-(รวมทุกสาขา).pdf"
	>
		<Icon icon="mdi:download" class="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
		ตารางนำเสนอโครงงาน (รวมทุกสาขา) ภาคโปสเตอร์
	</a>
	<section class="mt-4 rounded-md bg-base-200 p-5">
		<h3 class="font-semibold">สารบัญ</h3>
		<ul class="ml-5 list-disc">
			<li>
				บรรยายภาษาไทย:
				<a href="#MATS-OT" class="btn btn-sm">คณิตศาสตร์</a>
				<a href="#PHYS-OT" class="btn btn-sm">ฟิสิกส์และดาราศาสตร์</a>
				<a href="#CHEM-OT" class="btn btn-sm">เคมีและวัสดุศาสตร์</a>
				<a href="#BIOL-OT" class="btn btn-sm">ชีววิทยาและสิ่งแวดล้อม</a>
				<a href="#COMP-OT" class="btn btn-sm">คอมพิวเตอร์</a>
				<a href="#ENGR-OT" class="btn btn-sm">วิศวกรรมศาสตร์</a>
			</li>
			<li>
				บรรยายภาษาอังกฤษ:
				<a href="#MATS-OE" class="btn btn-sm">คณิตศาสตร์</a>
				<a href="#PHYS-OE" class="btn btn-sm">ฟิสิกส์และดาราศาสตร์</a>
				<a href="#CHEM-OE" class="btn btn-sm">เคมีและวัสดุศาสตร์</a>
				<a href="#BIOL-OE" class="btn btn-sm">ชีววิทยาและสิ่งแวดล้อม</a>
				<a href="#COMP-OE" class="btn btn-sm">คอมพิวเตอร์</a>
				<a href="#ENGR-OE" class="btn btn-sm">วิศวกรรมศาสตร์</a>
			</li>
			<li>
				โปสเตอร์:
				<a href="#MATS-PT" class="btn btn-sm">คณิตศาสตร์</a>
				<a href="#PHYS-PT" class="btn btn-sm">ฟิสิกส์และดาราศาสตร์</a>
				<a href="#CHEM-PT" class="btn btn-sm">เคมีและวัสดุศาสตร์</a>
				<a href="#BIOL-PT" class="btn btn-sm">ชีววิทยาและสิ่งแวดล้อม</a>
				<a href="#COMP-PT" class="btn btn-sm">คอมพิวเตอร์</a>
				<a href="#ENGR-PT" class="btn btn-sm">วิศวกรรมศาสตร์</a>
			</li>
		</ul>
	</section>

	<a
		href="#toc"
		data-tip="กลับด้านบนของหน้า"
		class="btn btn-outline tooltip tooltip-left fixed bottom-5 right-5 z-40 mx-auto flex bg-base-100/80 max-md:btn-square md:btn-sm"
		><Icon icon="mdi:arrow-up" class="h-6 w-6 md:h-5 md:w-5" />
		<span class="hidden md:inline-block">กลับด้านบน</span>
	</a>

	<article class="my-5 flex flex-col gap-2">
		<div class="flex flex-col gap-2">
			<H2PresentationSection {isStandTV}>ภาคบรรยายภาษาไทย</H2PresentationSection>
			<PresentationSection
				name="สาขาคณิตศาสตร์"
				pages={[2, 3]}
				room="คณิตศาสตร์ 2"
				roomNumber={216}
				id="MATS-OT"
				disabledGoToTOC
			/>
			<PresentationSection
				name="สาขาฟิสิกส์และดาราศาสตร์"
				pages={[5, 6]}
				room="ฟิสิกส์ 2"
				roomNumber={212}
				id="PHYS-OT"
			/>
			<PresentationSection
				name="สาขาเคมีและวัสดุศาสตร์"
				pages={[8, 9]}
				room="เคมี 2"
				roomNumber={213}
				id="CHEM-OT"
			/>
			<PresentationSection
				name="สาขาชีววิทยาและสิ่งแวดล้อม"
				pages={[11, 12]}
				room="ชีววิทยา 2"
				roomNumber={214}
				id="BIOL-OT"
			/>
			<PresentationSection
				name="สาขาคอมพิวเตอร์"
				pages={[14, 15]}
				room="คอมพิวเตอร์ 2"
				roomNumber={217}
				id="COMP-OT"
			/>
			<PresentationSection
				name="สาขาวิศวกรรมศาสตร์"
				pages={[17, 18]}
				room="วิศวกรรม 2"
				roomNumber={218}
				id="ENGR-OT"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<H2PresentationSection {isStandTV}>English Session</H2PresentationSection>
			<PresentationSection
				name="Mathematics"
				pages={[20, 21]}
				room="คณิตศาสตร์ 1"
				roomNumber={226}
				id="MATS-OE"
			/>
			<PresentationSection
				name="Physics and Astronomy"
				pages={[23, 24]}
				room="ฟิสิกส์ 1"
				roomNumber={223}
				id="PHYS-OE"
			/>
			<PresentationSection
				name="Chemistry and Materials Science"
				pages={[26, 27]}
				room="เคมี 1"
				roomNumber={224}
				id="CHEM-OE"
			/>
			<PresentationSection
				name="Biology and Environment"
				pages={[29, 30]}
				room="ชีววิทยา 1"
				roomNumber={225}
				id="BIOL-OE"
			/>
			<PresentationSection
				name="Computer"
				pages={[32, 33]}
				room="คอมพิวเตอร์ 1"
				roomNumber={227}
				id="COMP-OE"
			/>
			<PresentationSection
				name="Engineering"
				pages={[35, 36]}
				room="วิศวกรรม 1"
				roomNumber={228}
				id="ENGR-OE"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<H2PresentationSection {isStandTV}>รูปแบบโปสเตอร์</H2PresentationSection>
			<PresentationSection
				name="สาขาคณิตศาสตร์"
				type="poster"
				pages={[2, 3]}
				room="อาคารหอสมุด"
				id="MATS-PT"
			/>
			<PresentationSection
				name="สาขาฟิสิกส์และดาราศาสตร์"
				type="poster"
				pages={[5, 6]}
				room="อาคารหอสมุด"
				id="PHYS-PT"
			/>
			<PresentationSection
				name="สาขาเคมีและวัสดุศาสตร์"
				type="poster"
				pages={[8, 9]}
				room="อาคารหอสมุด"
				id="CHEM-PT"
			/>
			<PresentationSection
				name="สาขาชีววิทยาและสิ่งแวดล้อม"
				type="poster"
				pages={[11, 12]}
				room="อาคารหอสมุด"
				id="BIOL-PT"
			/>
			<PresentationSection
				name="สาขาคอมพิวเตอร์"
				type="poster"
				pages={[14, 15]}
				room="อาคารหอสมุด"
				id="COMP-PT"
			/>
			<PresentationSection
				name="สาขาวิศวกรรมศาสตร์"
				type="poster"
				pages={[17, 18]}
				room="อาคารหอสมุด"
				id="ENGR-PT"
			/>
		</div>
	</article>

	<a href="#toc" class="btn btn-link btn-outline mx-auto my-7">
		<Icon icon="mdi:arrow-up" class="mr-2 h-6 w-6 sm:h-4 sm:w-4" />
		กลับสู่ด้านบน
	</a>
</article>
