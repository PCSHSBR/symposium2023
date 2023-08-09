<script lang="ts">
	import CdnPdfRenderer from '$lib/components/CdnPdfRenderer.svelte';
	import Icon from '@iconify/svelte';
	export let name = '';
	export let pages = [2, 3];
	export let room = '';
	export let roomNumber = 123;
	export let id = 'tt';
	let idSlug = name.replaceAll(' ', '_');
	export let disabledGoToTOC = false;
</script>

<section class="relative">
	<span {id} class="absolute -top-20" />
	{#if !disabledGoToTOC}
		<a
			href="#toc"
			data-tip="กลับด้านบน"
			class="btn-outline btn-square btn-sm btn tooltip tooltip-right mx-auto flex sm:tooltip-left sm:absolute sm:right-0 sm:top-0 sm:mr-4 sm:mt-4"
			><Icon icon="mdi:arrow-up" class="h-5 w-5 md:h-4 md:w-4" /></a
		>
	{/if}
	<h2>
		{name}
	</h2>
	<p>นำเสนอ ณ ห้อง{room} (ห้อง {roomNumber})</p>
	<div class="mb-10 mt-2 flex flex-col gap-2">
		{#each pages as pageNumber, i}
			<CdnPdfRenderer
				file="sym2023/oral-presentation-schedule.pdf"
				page={pageNumber}
				invert
				alt="ตารางเวลานำเสนอโครงงาน หน้า {pageNumber} ({name})"
				class="my-2 shadow-lg"
			/>
		{/each}
	</div>
</section>
