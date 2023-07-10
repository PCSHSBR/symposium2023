<script lang="ts">
	export let label: string = 'ชื่อ';
	export let value = '';
	export let bottomLeftLabel: string = '';
	export let type = 'text';
</script>

<div class="form-control w-full">
	<label class="label w-full flex-col">
		<span class="label-text">{label}</span>
		{#if type === 'email'}
			<input type="email" class="input-bordered input w-full" bind:value {...$$restProps} />
		{:else}
			<input type="text" class="input-bordered input w-full" bind:value {...$$restProps} />
		{/if}
	</label>
	{#if bottomLeftLabel}
		<span class="label-text-alt">{bottomLeftLabel}</span>
	{/if}
</div>
