<script lang="ts">
	import { onMount } from 'svelte';
	import type { CalendarSchema } from '$lib/types';
	import Icon from '@iconify/svelte';

	let clazz: string = '';
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
	<div class="item">
		<div class="d-date">
			<span class="">17-23</span>
			<span>July</span>
		</div>
		<div class="d-info">
			<h1>ลงทะเบียนผ่าน Website</h1>
			<p>
				ผู้ใช้สามารถลงทะเบียนผ่านเว็บไซต์ได้ผ่าน <a href="/login">ลิงค์นี้</a> โดยที่สามารถลงทะเบียนได้ไม่เกินวันที่
				25
			</p>
		</div>
	</div>
	<div class="item">
		<div class="d-date">
			<span class="">26-10</span>
			<span>Aug</span>
		</div>
		<div class="d-info">
			<h1>ส่ง Abstract</h1>
			<p>
				ส่ง Abstract ผ่านหน้าผู้ใช้งาน โดยสามารถเข้าไปแก้ไขได้ตลอดเวลา
				โดยที่สามารถส่งได้ไม่เกินวันที่ 10 สิงหาคม
			</p>
		</div>
	</div>
	<div class="item">
		<div class="d-date">
			<span class="">4-6</span>
			<span>Sep</span>
		</div>
		<div class="d-info">
			<h1>The 3<span class="align-top text-xl">rd</span> Science symposium 2023</h1>
			<p>
				งาน The 3rd Science symposium 2023 จะจัดขึ้นในวันที่ 4-6 กันยายน 2566 ณ
				โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์ โดยสามารถดูตารางงานได้จาก <a
					href="/schedule">ลิงค์นี้</a
				>
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	.main-container {
		.item {
			@apply mb-4 grid grid-cols-1 overflow-hidden rounded-2xl shadow-xl transition-all;
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
