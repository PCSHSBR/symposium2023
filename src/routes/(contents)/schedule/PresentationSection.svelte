<script lang="ts">
	import CdnPdfRenderer from '$lib/components/CdnPdfRenderer.svelte';
	import Icon from '@iconify/svelte';
	export let name = '';
	export let pages = [2, 3];
	export let room = '';
	export let roomNumber: number | null = null;
	export let id = 'tt';
	export let type = 'oral';
	let idSlug = name.replaceAll(' ', '_');
</script>

<section
	class="collapse-plus collapse relative bg-base-200 [&:has(h3_span:target)]:ring-2 [&:has(h3_span:target)]:ring-primary-focus"
>
	<input type="radio" name="accordian-oral" />
	<div class="collapse-title">
		<h3 class="text-xl">
			<span {id} class="absolute -top-32" />
			{name}
		</h3>
		<p>
			{#if room !== 'อาคารหอสมุด'}
				ห้อง{/if}{room}
			{#if roomNumber !== null} (ห้อง {roomNumber}){/if}
		</p>
	</div>
	<div class="collapse-content flex flex-col gap-2">
		{#each pages as pageNumber, i}
			<CdnPdfRenderer
				file="sym2023/{type}-presentation-schedule.pdf"
				page={pageNumber}
				invert
				alt="ตารางเวลานำเสนอโครงงานรูปแบบ{type === 'oral'
					? 'ปากเปล่า'
					: 'โปสเตอร์'} หน้า {pageNumber} ({name})"
				class="my-2 rounded-md shadow-lg"
			/>
		{/each}
	</div>
</section>
