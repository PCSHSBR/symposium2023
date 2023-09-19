<script>
	import Icon from '@iconify/svelte';
	import CertSection from './CertSection.svelte';
</script>

<svelte:head>
	<title>ดาวน์โหลดเกียรติบัตร | The 3rd PCSHS Science Symposium 2023</title>
	<meta
		name="description"
		content="ดาวน์โหลดเกียรติบัตรของนักเรียนที่ได้รับเกียรติบัตรในการแข่งขัน The 3rd PCSHS Science Symposium 2023"
	/>
	<meta property="og:title" content="ดาวน์โหลดเกียรติบัตร | The 3rd PCSHS Science Symposium 2023" />
	<meta
		property="og:description"
		content="ดาวน์โหลดเกียรติบัตรของนักเรียนที่ได้รับเกียรติบัตรในการแข่งขัน The 3rd PCSHS Science Symposium 2023"
	/>
	<meta
		property="og:image"
		content="https://pcshsbr-assets.imgix.net/sym2023/og-image.png?auto=compress&fit=crop&h=630&w=1200&txt64=Q2VydGlmaWNhdGU&txt-color=fff&txt-align=top&txt-size=36&txt-pad=48&txt-font=HelveticaNeue"
	/>
</svelte:head>

<article class="container prose m-auto p-5">
	<h1>ดาวโหลดเกียรติบัตร</h1>
	<p>
		ดาวโหลดเกียรติบัตรได้ด้านล่าง หากเกียรติบัตรมีข้อผิดพลาดหรือต้องการติดต่ออื่น ๆ โปรดติดต่อที่
		<a href="mailto:sym2023@pcshsbr.ac.th"> อีเมล sym2023@pcshsbr.ac.th </a>,
		<a href="https://www.facebook.com/pcshs.symposium2023">เพจ Facebook </a>
		หรือครูผู้ประสานงานของโรงเรียนแต่ละแห่ง
	</p>
	<a
		class="btn btn-outline h-auto flex-row !no-underline sm:w-full sm:justify-start sm:space-x-2"
		href="https://docs.google.com/forms/d/e/1FAIpQLSdEKyx6OkYcZO45NWyF3AJ7VBvjjgqUKyVZKy0pQjxtSFpB6g/viewform"
		target="_blank"
	>
		<Icon icon="mdi:star" class="h-8 w-8 animate-bounce" />
		<div class="flex flex-col space-y-1 pb-3 sm:items-start sm:space-y-2 sm:py-4">
			<span class="text-lg"> ตอบแบบประเมินความพึงพอใจ </span>
			<small> เป็นกำลังใจให้กับเจ้าภาพและสำหรับนำไปปรับปรุงการแข่งขันปีถัดไป </small>
		</div>
	</a>
	<a
		class="btn btn-outline btn-block my-2 !no-underline sm:w-full sm:justify-start sm:space-x-2"
		href="https://drive.google.com/file/d/13fM_To8-eoHN07U4Nho6wAFIBkyxYaED/view"
	>
		<Icon icon="mdi:bullhorn" class="h-8 w-8" />
		<span class="text-lg"> ประกาศผลการแข่งขัน </span>
	</a>
	<h2>1. เกียรติบัตรนักเรียนที่ได้รับรางวัล</h2>
	<p>
		สำหรับนักเรียนที่ได้รับรางวัลชนะเลิศอันดับที่ 1–3 ที่ได้รับรางวัลบนเวทีในพิธีปิด
		<a href="#section-3">
			ของครูที่ปรึกษาโปรดดูที่ "3. ครูที่ปรึกษาโครงงานที่ร่วมนำเสนอ Oral Presentation"
		</a>
	</p>
	<a
		class="btn btn-neutral btn-outline my-2"
		href="https://drive.google.com/file/d/1nhItJIlTSPpRU5iNc5PB3fVC5nKjB6wn/view"
	>
		<Icon icon="mdi:document" class="h-5 w-5" /> เกียรติบัตรนักเรียน
	</a>
	<CertSection
		title="2. เกียรติบัตรนักเรียนที่ร่วมนำเสนอ Oral Presentation"
		folderId="1-_vBcnP6AMMe3lH1Ejixsoe4cru1Awwc"
	/>
	<CertSection
		id="section-3"
		title="3. ครูที่ปรึกษาโครงงานที่ร่วมนำเสนอ Oral Presentation"
		folderId="1LKbYmuRh8JlYPjboFJjmDsJR_Y23Fx6L"
	/>
	<CertSection
		title="4. เกียรติบัตรนักเรียนที่ร่วมนำเสนอแบบวิดีโอออนไลน์"
		folderId="1aaXfp1mctJLPidEjd4JVCt3LsG4FXQFo"
	/>
	<CertSection
		title="5. เกียรติบัตรครูที่ปรึกษาโครงงานนักเรียนที่ส่งโครงงานแบบวิดีโอออนไลน์"
		folderId="1-W9cEou8p4J1eqTxvK4p5h81yVlxeCcY"
	/>
	<CertSection
		id="section-6"
		title="6. เกียรติบัตรที่ได้รับการแก้ไขแล้ว"
		folderId="1dpUpiZeO-K173IUs2IVytWzeqQERmU1u"
	/>
</article>
