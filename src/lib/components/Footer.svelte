<script lang="ts">
	import LogoWithText from './LogoWithText.svelte';
	import Icon from '@iconify/svelte';
</script>

<footer class="footer rounded bg-base-300 p-10 text-base-content">
	<div class="text-left">
		<a href="/">
			<LogoWithText class="h-12 w-auto" />
		</a>
		<strong class="font-display">
			The 3<sup>rd</sup> PCSHS Science Symposium 2023
		</strong>
		<p>
			<!-- กิจกรรมนำเสนอโครงงานวิทยาศาสตร์ของนักเรียนชั้นมัธยมศึกษาปีที่ 6 กลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย ครั้งที่ 3 ประจำปี 2566<br/>
			ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์<br/> -->
			โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์ 299 หมู่ 2 ตำบลสตึก อำเภอสตึก จังหวัดบุรีรัมย์
			31150<br />
			สงวนลิขสิทธิ์ © 2023 ซอร์สโค้ดเผยแพร่ภายใต้สัญญาอนุญาต MIT
		</p>
	</div>
	<div class="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
		<div class="flex flex-col">
			<h3 class="footer-title">ข้อมูล</h3>
			<a class="link-hover link" href="/projects">รายการโครงงาน</a>
			<a class="link-hover link" href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
				>การแข่งขันรูปแบบออนไลน์</a
			>
		</div>
		<div>
			<h3 class="footer-title">การแข่งขันครั้งก่อนหน้า</h3>
			<a
				class="link-hover link"
				href="https://sites.google.com/pcshsloei.ac.th/pcshs-symposium2021/home"
				>ครั้งที่ 1 จภ.เลย</a
			>
		</div>
		<div>
			<h3 class="footer-title">กลุ่มโรงเรียน</h3>
			<div class="grid grid-cols-2 gap-x-1">
				<a class="link-hover link" href="https://www.pccchon.ac.th/" target="_blank">ชลบุรี</a>
				<a class="link-hover link" href="https://www.pcccr.ac.th/" target="_blank">เชียงราย</a>
				<a class="link-hover link" href="https://pcshstrg.ac.th/" target="_blank">ตรัง</a>
				<a class="link-hover link" href="http://www.pccnst.ac.th/" target="_blank">นครศรีธรรมราช</a>
				<a class="link-hover link" href="https://www.pcshsbr.ac.th/" target="_blank">บุรีรัมย์</a>
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
				<!-- <a href="/facebook" class="flex"><Icon icon="ic:baseline-facebook" class="h-6 w-6" /></a> -->
				<a href="tel:0637700077" class="flex"><Icon icon="mdi:phone" class="h-6 w-6" /></a>
				<a href="mailto:sym2023@pcshsbr.ac.th" class="flex"
					><Icon icon="mdi:email" class="h-6 w-6" /></a
				>
			</div>
		</div>
	</div>
</footer>
