<script lang="ts">
	import LogoWithText from './LogoWithText.svelte';
	import Icon from '@iconify/svelte';
</script>

<footer class="footer rounded bg-base-300 p-10 text-base-content">
	<div class="text-left">
		<a class="btn btn-ghost -mx-5" href="/">
			<LogoWithText class="h-12 w-auto" />
		</a>
		<strong class="font-display text-lg">The 3<sup>rd</sup> PCSHS Science Symposium 2023 </strong>
		<p>
			โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์<br />299 หมู่ 2 ตำบลสตึก อำเภอสตึก
			จังหวัดบุรีรัมย์ 31150<br />
			สงวนลิขสิทธิ์ © 2023 ซอร์สโค้ดเผยแพร่ภายใต้สัญญาอนุญาต MIT
		</p>
		<small>
			<a
				class="btn btn-ghost tooltip btn-sm tooltip-right"
				data-tip="PCSHSBR/symposium2023"
				href="https://github.com/PCSHSBR/symposium2023"
			>
				<Icon icon="mdi:github" class="h-6 w-6" />
				<span class="sr-only">กิตฮับ</span>
			</a>
		</small>
	</div>
	<div class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
		<div class="flex flex-col">
			<h3 class="footer-title">ข้อมูล</h3>
			<a class="link-hover link" href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
				>การแข่งขันรูปแบบออนไลน์</a
			>
			<a class="link-hover link" href="/projects">รายการโครงงาน</a>
			<a class="link-hover link" href="/schedule">กำหนดการนำเสนอรูปแบบบรรยายและโปสเตอร์</a>
			<a
				class="link-hover link"
				href="https://drive.google.com/file/d/13fM_To8-eoHN07U4Nho6wAFIBkyxYaED/view"
			>
				ผลการแข่งขัน
			</a>
			<a class="link-hover link" href="/certs"> ดาวโหลดเกียรติบัตร </a>
		</div>
		<div class="flex flex-col">
			<h3 class="footer-title">การแข่งขันครั้งก่อนหน้า</h3>
			<a
				class="link-hover link"
				href="https://sites.google.com/pcshsloei.ac.th/pcshs-symposium2021/home"
				>ครั้งที่ 1 จภ.เลย</a
			>
			<span class="text-base-content/50">ครั้งที่ 2 จภ.นครศรีธรรมราช (ไม่มีเว็บไซต์)</span>
		</div>
		<div>
			<h3 class="footer-title">กลุ่มโรงเรียน</h3>
			<div class="grid grid-cols-2 gap-x-1">
				<a class="link-hover link" href="https://www.pccchon.ac.th/" target="_blank">ชลบุรี</a>
				<a class="link-hover link" href="https://www.pcccr.ac.th/" target="_blank">เชียงราย</a>
				<a class="link-hover link" href="https://pcshstrg.ac.th/" target="_blank">ตรัง</a>
				<a class="link-hover link" href="http://www.pccnst.ac.th/" target="_blank">นครศรีธรรมราช</a>
				<a class="link-hover link flex" href="https://www.pcshsbr.ac.th/" target="_blank"
					>บุรีรัมย์ <span class="tooltip" data-tip="เจ้าภาพ 🫀"
						><Icon icon="mdi:home-heart" class="h-5 w-5" /></span
					></a
				>
				<a class="link-hover link" href="https://pccp.ac.th/" target="_blank">ปทุมธานี</a>
				<a class="link-hover link" href="http://www.pccpl.ac.th/" target="_blank">พิษณุโลก</a>
				<a class="link-hover link" href="https://www.pccphet.ac.th/" target="_blank">เพชรบุรี</a>
				<a class="link-hover link" href="https://www.pccm.ac.th/" target="_blank">มุกดาหาร</a>
				<a class="link-hover link" href="https://pccl.ac.th/" target="_blank">ลพบุรี</a>
				<a class="link-hover link" href="http://pcshsloei.ac.th/" target="_blank">เลย</a>
				<a class="link-hover link" href="https://pccst.ac.th/" target="_blank">สตูล</a>
			</div>
		</div>
		<div>
			<h3 class="footer-title">ติดต่อ</h3>
			<div class="grid grid-flow-col gap-4">
				<a
					href="https://facebook.com/pcshs.symposium2023"
					class="btn btn-square btn-ghost btn-sm flex"
					><Icon icon="ic:baseline-facebook" class="h-6 w-6" /></a
				>
				<a href="tel:0637700077" class="btn btn-square btn-ghost btn-sm flex"
					><Icon icon="mdi:phone" class="h-6 w-6" />
					<span class="sr-only">โทร 063-770-0077</span>
				</a>
				<a href="mailto:sym2023@pcshsbr.ac.th" class="btn btn-square btn-ghost btn-sm flex"
					><Icon icon="mdi:email" class="h-6 w-6" />
					<span class="sr-only">อีเมล</span>
				</a>
			</div>
		</div>
	</div>
</footer>
