<script>
	import postcss from 'postcss';
	import Icon from '@iconify/svelte';
</script>

<section class="m-auto w-[calc(100%-64px)] pt-[calc(6rem)]">
	<h1>โครงงานของฉัน</h1>
	<div class="custom-steps step1 mt-4">
		<div class="custom-step custom-step-primary">
			<span><Icon icon="mdi:check" /></span>
			<span />
		</div>
		<div>
			<h2>สร้างบัญชี</h2>
			<p>คุณได้สร้างบัญชีเรียบร้อยแล้ว</p>
			<button class="btn-primary btn-sm btn my-2 mt-3"
				><Icon icon="mdi:edit" class="h-4 w-4" /> แก้ไขข้อมูลบัญชี</button
			>
		</div>
	</div>
	<div class="custom-steps step2">
		<div class="custom-step custom-step-onprogress">
			<span>2</span>
			<span />
		</div>
		<div>
			<h2>ข้อมูลโครงงาน</h2>
			<p>รายละเอียดต่างๆของโครงงาน</p>
			<p class="whitespace-pre-line">
				<b>ชื่อโครงงาน:</b> EXAMPLE
				<b>สาขา:</b> ชีววิทยาและสิ่งแวดล้อม
				<b>ประเภทการนำเสนอ:</b> ภาคบรรยายภาษาไทย (Thai oral presentation)
				โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์
				<b>ตัวแทนติดต่อของทีม:</b> นายพัสกร ยืนยง (คุณ)
				<b>สมาชิกในทีม:</b> นายพัสกร ยืนยง, นายพัฒนเดช รุ่งรัศมีทรัพย์, นางสาวกุลนิดา พงศ์ไพศาล
				<b>ครูที่ปรึกษาโครงงาน:</b> นายพชร กาญจนมาศ,
				<b>ที่ปรึกษาพิเศษ:</b> ศาสตรจารย์สราวลี เจริญผลวัฒนา
			</p>
			<a href="/my-project/edit/step-2-project-information">
				<button class="btn-primary btn-sm btn mt-3" title="แก้ไขข้อมูลโครงงาน"
					><Icon icon="mdi:edit" class="h-4 w-4" /> แก้ไข</button
				>
			</a>
		</div>
	</div>
	<div class="custom-steps step3">
		<div class="custom-step">
			<span>3</span>
			<span />
		</div>
		<div>
			<h2>อัปโหลดบทคัดย่อ</h2>
			<p>บทคัดย่อของโครงงาน</p>
			<p class="max-w-[75ch] line-clamp-4">
				<b>บทคัดย่อ:</b> แอบมองดูฟ้าที่ค้างในใจที่มีในเวลานี้ก็บอกไปเลยไม่สนก็ได้ถึงเวลาที่ฉันจะเดินไปเลยไม่หยุดได้จับมือฉันลมแปรเปลี่ยนตามไปบนท้องฟ้าแล้วที่เธอนั้นมีอยู่ข้างในใจทุกทุกครั้งที่ต้องการใครที่คอยวนเวียนทำยังไม่ต้องไปนึกเกรงและหวาดกลัวอย่างนี้ไม่ต้องไปจำได้วางบางอย่างเดิมหรือไปด้วยกันนะเราจะกอดเธอ
			</p>
			<a href="/my-project/edit/step-3-abstract">
				<button class="btn-primary btn-sm btn my-2 mt-3"
					><Icon icon="mdi:upload" class="h-4 w-4" /> อัปโหลด</button
				>
			</a>
		</div>
	</div>
	<div class="custom-steps step4">
		<div class="custom-step custom-step-last">
			<span>4</span>
			<span />
		</div>
		<div>
			<h2>อัปโหลดบทความวิชาการ</h2>
			<p>บทความเชิงวิชาการของโครงงาน</p>
			<a href="/my-project/edit/step-4-article">
				<button class="btn-primary btn-sm btn my-2 mt-3"
					><Icon icon="mdi:upload" class="h-4 w-4" /> อัปโหลด</button
				>
			</a>
		</div>
	</div>
</section>

<style lang="postcss">
	h2 {
		@apply my-2 text-2xl font-bold;
	}
	.custom-steps {
		@apply relative mt-8 flex flex-row;
	}
	.custom-step {
		@apply m-10 flex flex-col items-center font-display text-xl font-bold;
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
		@apply bg-primary text-primary-content;
	}
</style>
