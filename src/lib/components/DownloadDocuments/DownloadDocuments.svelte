<script>
	import Icon from '@iconify/svelte';
	import Entry from './Entry.svelte';
	import { fetchDownloadable } from '$lib/sheet';
</script>

<table class="table-pin-rows mt-8 table dark:[&_tr]:border-gray-500/50">
	<thead>
		<tr class="">
			<th>ชื่อเอกสาร</th>
			<th>รายละเอียด</th>
			<th>ดาวน์โหลด</th>
		</tr>
	</thead>
	<tbody>
		{#await fetchDownloadable()}
			<tr>
				<td colspan="3" class="text-center">
					<div class="loading loading-spinner text-primary" role="status">
						<span class="sr-only">กำลังโหลด...</span>
					</div>
				</td>
			</tr>
		{:then docs}
			{#each docs as { name, description, link, isDownload }}
				<Entry {description} {name} {link} {isDownload} />
			{:else}
				<tr>
					<td colspan="3" class="text-center"> ไม่พบเอกสาร </td>
				</tr>
			{/each}
		{/await}
	</tbody>
</table>
