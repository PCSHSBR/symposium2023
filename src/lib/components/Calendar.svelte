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
		// console.log(dateRange);
	});
</script>

<div class={`main-container ${clazz || ''}`}>
	<div class="collapse-arrow collapse mb-4 bg-base-200/70 shadow-sm">
		<input type="radio" name="my-accordion-2" checked={true} />
		<div class="collapse-title text-xl font-medium">การนำเสนอ ONSITE</div>
		<div class="collapse-content">
			<div class="item">
				<div class="d-date">
					<span class="">17–25</span>
					<span>กรกฎาคม</span>
				</div>
				<div class="d-info">
					<h1>ลงทะเบียนและส่งบทคัดย่อ</h1>
					<p>
						ลงทะเบียนแข้าสู่ระบบ ยืนยัน ส่งบทคัดย่อ และส่งบทความหลังได้รับคำเชิญในระบบ ภายในวันที่
						25 กรกฎาคม ผ่านทางเว็บไซต์ <a class="link" href="https://3rdpss2023.pcshsbr.ac.th"
							>https://3rdpss2023.pcshsbr.ac.th</a
						>
					</p>
					<a href="/login" class="btn float-right">
						เข้าสู่ระบบ
						<Icon icon="mdi:open-in-new" />
					</a>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">4–6</span>
					<span>กันยายน</span>
				</div>
				<div class="d-info">
					<h1>The 3<sup>rd</sup> PCSHS Science symposium 2023</h1>
					<p>
						งาน The 3<sup>rd</sup> PCSHS Science symposium 2023 จะจัดขึ้นในวันที่ 4–6 กันยายน 2566 ณ
						โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์ โดยสามารถดูตารางกิจกรรมได้ด้านล่าง
					</p>
				</div>
			</div>
			<!-- <FieldSchedule /> -->
		</div>
	</div>
	<div class="collapse-arrow collapse bg-base-200/70 shadow-sm">
		<input type="radio" name="my-accordion-2" />
		<div class="collapse-title text-xl font-medium">การนำเสนอ ONLINE</div>
		<div class="collapse-content">
			<div class="item">
				<div class="d-date">
					<span class="">17-31</span>
					<span>กรกฎาคม</span>
				</div>
				<div class="d-info">
					<h1>ลงทะเบียนการนำเสนอแบบ Online</h1>
					<p>
						นักเรียนที่นำเสนอรูปแบบออนไลน์ (ไม่ได้เดินทาง)
						สามารถลงทะเบียนได้ผ่านเว็บไซต์แยกสำหรับกรณีออนไลน์ที่ <a
							href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
							class="link"
							target="_blank">https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/</a
						>
					</p>
					<a
						href="https://www.pcshsbr.ac.th/pcshs_symposium2023_vdo/"
						target="_blank"
						class="btn float-right"><Icon icon="mdi:open-in-new" />ลงทะเบียน</a
					>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">14-18</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>ส่งวีดีโอนำเสนอ</h1>
					<p>อัพโหลดบทความและคลิปวิดีโอผ่านช่อง YouTube ของโรงเรียน ภายในวันที่ 14–18 สิงหาคม</p>
				</div>
			</div>
			<div class="item">
				<div class="d-date">
					<span class="">26</span>
					<span>สิงหาคม</span>
				</div>
				<div class="d-info">
					<h1>ประกาศผลการตัดสิน</h1>
					<p>คณะกรรมการรวบรวมคะแนนและดำเนินการประกาศผลการตัดสิน</p>
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
