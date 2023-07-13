<script lang="ts">
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

	<div class="items-container {tab == 0 ? 'flex flex-col' : 'hidden'}">
		<span class="head-span w-full bg-base-content p-4 text-2xl text-base-300">3 กันยายน 2565</span>
		<span class="divider" />
		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">13:00 น. - 18:00 น.</span>
					<h2 class="text-3xl">
						ลงทะเบียน / เข้าที่พัก นำเอกสารงารสาร โปสเตอร์ และไฟล์ Powerpoint
					</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>หอประชุมแคแสด</span>
					</div>
					<span class="divider my-1" />
					<div>
						<span>Type</span>
						<span>Register / Check in</span>
					</div>
				</div>
			</div>
		</div>

		<span class="divider" />

		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">18:00 น. - 19:00 น.</span>
					<h2 class="text-3xl">รับประทานอาหารเย็น</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>โรงอาหาร</span>
					</div>
				</div>
			</div>
		</div>
		<span class="divider" />
		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">19:00 น. - 20:00 น.</span>
					<h2 class="text-3xl">ชี้แจงกิจกรรม</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>โรงยิม</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="items-container {tab == 1 ? 'flex flex-col' : 'hidden'}">
		<span class="head-span w-full bg-base-content p-4 text-2xl text-base-300">4 กันยายน 2565</span>
		<span class="divider" />
		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">7:00 น. - 8:00 น.</span>
					<h2 class="text-3xl">รับประทานอาหารเช้า</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>โรงอาหาร</span>
					</div>
				</div>
			</div>
		</div>

		<span class="divider" />

		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">18:00 น. - 19:00 น.</span>
					<h2 class="text-3xl">รับประทานอาหารเย็น</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>โรงอาหาร</span>
					</div>
				</div>
			</div>
		</div>
		<span class="divider" />
		<div class="item">
			<div class="sub-item">
				<div class="title">
					<span class="child-span">19:00 น. - 20:00 น.</span>
					<h2 class="text-3xl">ชี้แจงกิจกรรม</h2>
				</div>
				<div class="info">
					<div>
						<span>Location</span>
						<span>โรงยิม</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
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
		}
	}
</style>
