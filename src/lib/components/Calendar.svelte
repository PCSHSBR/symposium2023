<script lang="ts">
	import { onMount } from 'svelte';
	import type { CalendarSchema } from '$lib/types';
	import Icon from '@iconify/svelte';
	import FieldSchedule from './FieldSchedule.svelte';

	let clazz = '';
	export { clazz as class };
	export let calenderData: CalendarSchema[];

	function generateDateRange(startDate: Date, endDate: Date, count: number) {
		const dates = [];
		let currentDate = new Date(startDate);

		while (currentDate <= endDate) {
			dates.push(currentDate.getDate());
			currentDate.setDate(currentDate.getDate() + count);
		}

		return dates;
	}

	onMount(() => {
		const dateRange = generateDateRange(
			new Date(calenderData[0]['start-date']),
			new Date(calenderData[1]['end-date']),
			1
		);
		const today = new Date();
		const timelineWidth = dateRange.length * 64;
		console.log(dateRange);
	});
</script>

<div class={`main-container ${clazz || ''}`}>
	<div class="collapse-arrow collapse mb-4 bg-base-200/70 shadow-sm">
		<input type="radio" name="my-accordion-2" checked="checked" />
		<div class="collapse-title text-xl font-medium">ONSITE</div>
		<div class="collapse-content">
			<div class="item">
				<div class="d-date">
					<span class="">17-25</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>ลงทะเบียนและส่งบทคัดย่อ</h1>
					<p>
						ลงทะเบียนแข้าสู่ระบบ , ยืนยัน , ส่งบทคัดย่อ และ ส่งบทความ ภายในวันที่ 17-25 สิงหาคม
						ผ่านทางเว็บไซต์
					</p>
					<a href="/login" class="btn"><Icon icon="mdi:open-in-new" />ลงทะเบียน</a>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">4-6</span>
					<span>กันยายน</span>
				</div>
				<div class="d-info">
					<h1>The 3<span class="align-top text-xl">rd</span> Science symposium 2023</h1>
					<p>
						งาน The 3rd Science symposium 2023 จะจัดขึ้นในวันที่ 4-6 กันยายน 2566 ณ
						โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์ โดยสามารถดูตารางงานได้จาก
					</p>
					<a href="/schedule" class="btn"><Icon icon="mdi:open-in-new" />ลิงค์นี้</a>
				</div>
			</div>
			<!-- <FieldSchedule /> -->
		</div>
	</div>
	<div class="collapse-arrow collapse bg-base-200/70 shadow-sm">
		<input type="radio" name="my-accordion-2" />
		<div class="collapse-title text-xl font-medium">ONLINE</div>
		<div class="collapse-content">
			<div class="item">
				<div class="d-date">
					<span class="">17-31</span>
					<span>กันยายน</span>
				</div>
				<div class="d-info">
					<h1>ลงทะเบียนผ่าน</h1>
					<p>ผู้ใช้ที่นำเสนอ Online สามารถลงทะเบียนได้ผ่านหน้าผู้ใช้งาน</p>
					<a href="/login" class="btn"><Icon icon="mdi:open-in-new" />ลงทะเบียน</a>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">14-18</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>อัพโหลดไฟล์</h1>
					<p>อัพโหลดบทความและคลิปวิดีโอผ่านช่อง Youtube ของโรงเรียน ภายในวันที่ 14-18 สิงหาคม</p>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">19-20</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>รวบรวมแยกสาขา</h1>
					<p>คณะกรรมการตามคำสั่งตรวจสอบข้อมูลที่นักเรียนอัพโหลดและรวบรวมแยกตามสาขา</p>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">21-25</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>คณะกรรมการตัดสิน</h1>
					<p>คณะกรรมการตามคำสั่งตรวจสอบzผลงานที่ส่งเข้ามาและตัดสินตามเกณท์ที่กำหนด</p>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">26</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>ส่งผลการตัดสิน</h1>
					<p>คณะกรรมการตามคำสั่งส่งผลการตัดสิน เพื่อรวบรวมและประกาศต่อไป</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.main-container {
		.item {
			@apply mb-4 grid grid-cols-1 overflow-hidden rounded-xl shadow-xl transition-all;
			@media (min-width: 768px) {
				grid-template-columns: 200px 1fr;
			}
			.d-date {
				@apply flex flex-col items-center justify-center bg-base-content p-6 text-base-100;
				span {
					@apply text-2xl font-bold;
				}
			}
			.d-info {
				@apply bg-base-100/70 p-6 text-left;
				h1 {
					@apply font-bold;
				}
				p {
					@apply text-sm;
				}
			}
		}
	}
</style>
