<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';

	let classes = '';
	export { classes as class };

	let tab = 0;
</script>

<div class="main-container flex flex-col {classes}">
	<div class="date-select my-4 justify-center">
		<button
			on:click={() => {
				tab = 0;
			}}
			class="btn {tab == 0 ? 'btn-primary' : ''}">3 กันยายน</button
		>
		<button
			on:click={() => {
				tab = 1;
			}}
			class="btn {tab == 1 ? 'btn-primary' : ''}">4 กันยายน</button
		>
		<button
			on:click={() => {
				tab = 2;
			}}
			class="btn {tab == 2 ? 'btn-primary' : ''}">5 กันยายน</button
		>
		<button
			on:click={() => {
				tab = 3;
			}}
			class="btn {tab == 3 ? 'btn-primary' : ''}">6 กันยายน</button
		>
	</div>

	{#if tab == 0}
		<div
			in:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			out:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			class="items-container flex flex-col"
		>
			<span class="head-span w-full rounded-xl bg-base-content p-4 text-2xl text-base-300 shadow-lg"
				>3 กันยายน 2566</span
			>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">13:00 น. – 18:00 น.</span>
						<h2 class="text-3xl">ลงทะเบียน/เข้าที่พัก ติดตั้งโปสเตอร์และนำส่งไฟล์นำเสนอ</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">18:00 น. – 19:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหารเย็น</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">19:00 น. – 20:00 น.</span>
						<h2 class="text-3xl">ชี้แจงกิจกรรม</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงยิม</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if tab == 1}
		<div
			in:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			out:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			class="items-container flex flex-col"
		>
			<span class="head-span w-full rounded-xl bg-base-content p-4 text-2xl text-base-300 shadow-lg"
				>4 กันยายน 2566</span
			>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">7:00 น. – 8:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหารเช้า</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">8:00 น. – 10:20 น.</span>
						<h2 class="text-3xl">พิธีเปิด</h2>
						<ul class="list-inside list-disc">
							<li>การแสดงพิธีเปิด</li>
							<li>กิจกรรมบรรยายสร้างแรงบัลดาลใจในการทำโครงงาน โดย ดร.สุพรรณ ยอดยิ่งยง</li>
						</ul>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">10:30 น. – 10:45 น.</span>
						<h2 class="text-3xl">รับประทานอาหารว่าง</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอสมุด</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item-full">
					<div class="title">
						<span class="child-span">10:45 น. – 12:00 น.</span>
						<h2 class="text-3xl">นำเสนอโครงงาน</h2>
						<div>
							<p>นำเสนอโครงงานแบบปากเปล่า</p>
							<table class="table">
								<!-- head -->
								<thead>
									<tr>
										<th>สาขา</th>
										<th>สถานที่</th>
									</tr>
								</thead>
								<tbody>
									<!-- row 1 -->
									<tr>
										<td>ฟิสิกส์และดาราศาสตร์</td>
										<td>
											<ul>
												<li>ห้องฟิสิกส์ 1 (Oral Eng) (223)</li>
												<li>ห้องฟิสิกส์ 2 (Oral Thai) (212)</li>
											</ul>
										</td>
									</tr>
									<!-- row 2 -->
									<tr>
										<td>เคมีและวัสดุศาสตร์</td>
										<td>
											<ul>
												<li>ห้องเคมี 1 (Oral Eng) (224)</li>
												<li>ห้องเคมี 2 (Oral Thai) (213)</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>ชีววิทยา และสิ่งแวดล้อม</td>
										<td>
											<ul>
												<li>ห้องชีววิทยา 1 (Oral Eng) (225)</li>
												<li>ห้องชีววิทยา 2 (Oral Thai) (214)</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>คณิตศาสตร์</td>
										<td>
											<ul>
												<li>ห้องคณิตศาสตร์ 1 (Oral Eng) (226)</li>
												<li>ห้องคณิตศาสตร์ 2 (Oral Thai) (216)</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>คอมพิวเตอร์</td>
										<td>
											<ul>
												<li>ห้องคอมพิวเตอร์ 1 (Oral Eng) (227)</li>
												<li>ห้องคอมพิวเตอร์ 2 (Oral Thai) (217)</li>
											</ul>
										</td>
									</tr>
									<tr>
										<td>วิศวกรรมศาสตร์</td>
										<td>
											<ul>
												<li>ห้องวิศวกรรม 1 (Oral Eng) (228)</li>
												<li>ห้องวิศวกรรม 2 (Oral Thai) (218)</li>
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
							<p>นำเสนอโครงงานแบบโปสเตอร์</p>
							<table class="table">
								<!-- head -->
								<thead>
									<tr>
										<th>สาขา</th>
										<th>สถานที่</th>
									</tr>
								</thead>
								<tbody>
									<!-- row 1 -->
									<tr>
										<td>ทุกสาขา</td>
										<td>ลานกิจกรรมห้องสมุด</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">12:00 น. – 13:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหาร</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">13:00 น. – 16:30 น.</span>
						<h2 class="text-3xl">นักเรียนนำเสนอผลงานโครงงาน (ต่อ)</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>ตามที่ได้รับแจ้ง</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">17:00 น. – 18:00 น.</span>
						<h2 class="text-3xl">พักผ่อนตามอัธยาศัย</h2>
					</div>
					<!-- <div class="info">
					<div>
						<span>สถานที่</span>
						<span>...</span>
					</div>
				</div> -->
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">18:00 น. – 21:00 น.</span>
						<h2 class="text-3xl">กิจกรรมกลุ่มสัมพันธ์</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if tab === 2}
		<div
			in:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			out:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			class="items-container flex flex-col"
		>
			<span class="head-span w-full rounded-xl bg-base-content p-4 text-2xl text-base-300 shadow-lg"
				>5 กันยายน 2566</span
			>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">7:00 น. – 8:30 น.</span>
						<h2 class="text-3xl">รับประทานอาหารเช้า</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">8:30 น. – 12:00 น.</span>
						<h2 class="text-3xl">กิจกรรมทัศนศึกษาแหล่งเรียนรู้นอกสถานที่</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>จังหวัดบุรีรัมย์</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">12:00 น. – 13:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหาร</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>นอกสถานที่</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">13:00 น. – 16:00 น.</span>
						<h2 class="text-3xl">กิจกรรมทัศนศึกษาแหล่งเรียนรู้นอกสถานที่ (ต่อ)</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>จังหวัดบุรีรัมย์</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">16:00 น. – 17:00 น.</span>
						<h2 class="text-3xl">จัดเตรียมการแสดงแลกเปลี่ยนทางวัฒนธรรม</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>ตามห้อง STUDY แต่ละหอ</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">17:00 น. – 18:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหารเย็น</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">18:00 น. – 22:00 น.</span>
						<h2 class="text-3xl">แลกเปลี่ยนทางวัฒนธรรมการแสดงของทั้ง 12 จ.ภ.</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if tab === 3}
		<div
			in:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			out:slide={{
				axis: 'y',
				delay: 0,
				duration: 300,
				easing: cubicOut
			}}
			class="items-container flex flex-col"
		>
			<span class="head-span w-full rounded-xl bg-base-content p-4 text-2xl text-base-300 shadow-lg"
				>6 กันยายน 2566</span
			>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">7:00 น. – 8:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหารเช้า</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>

			<span class="divider" />

			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">8:30 น. – 10:00 น.</span>
						<h2 class="text-3xl">
							นักเรียนและครูเข้ารับฟังสรุปภาพรวมของโครงงานสาขาต่าง ๆ โดยผู้ทรงคุณวุฒิ
						</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">10:00 น. – 10:30 น.</span>
						<h2 class="text-3xl">กล่าวสรุปงานประมวลภาพกิจกรรม</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">10:30 น. – 12:00 น.</span>
						<h2 class="text-3xl">พิธีปิดและประกาศผลนำเสนอโครงงาน มอบโล่ รางวัล พร้อมเกียรติบัตร</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>หอประชุมแคแสด</span>
						</div>
					</div>
				</div>
			</div>
			<span class="divider" />
			<div class="item">
				<div class="sub-item">
					<div class="title">
						<span class="child-span">12:30 น. – 13:00 น.</span>
						<h2 class="text-3xl">รับประทานอาหารและเดินทางกลับโดยสวัสดิภาพ</h2>
					</div>
					<div class="info">
						<div>
							<span>สถานที่</span>
							<span>โรงอาหาร</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.divider {
		@apply before:bg-base-content after:bg-base-content;
	}
	.divider-05 {
		@apply before:h-[1px] after:h-[1px];
	}
	.main-container {
		.item {
			.sub-item {
				@apply flex flex-row flex-wrap justify-between;
				.title {
					@apply w-full md:w-1/2;
				}
				.info {
					@apply w-full md:w-1/3;
					div {
						@apply flex flex-row flex-wrap justify-between;
					}
				}
			}
			.sub-item-full {
				@apply flex flex-row flex-wrap justify-between;
				.title {
					@apply w-full;
				}
				.info {
					@apply w-full;
					div {
						@apply flex flex-row flex-wrap justify-between;
					}
				}
			}
		}
	}
</style>
