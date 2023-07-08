<script>
	import { mockupProjectTableData } from '$lib/mockupData';
	import Table from '$lib/components/Table.svelte';
</script>

<div class="p-20" />
<section class="">
	<Table tdata={mockupProjectTableData.data} keys={mockupProjectTableData.keys[0]} class="p-10" />
</section>
