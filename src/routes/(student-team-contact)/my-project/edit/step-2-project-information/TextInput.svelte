<script lang="ts">
	export let label: string = 'ชื่อ';
	export let value = '';
	export let bottomLeftLabel: string = '';
</script>

<div class="form-control w-full">
	<label class="label w-full flex-col">
		<span class="label-text">{label}</span>
		<input type="text" class="input-bordered input w-full" bind:value {...$$restProps} />
	</label>
	{#if bottomLeftLabel}
		<span class="label-text-alt">{bottomLeftLabel}</span>
	{/if}
</div>
