<script lang="ts">
	export let label: string = 'ชื่อ';
	export let value = '';
	export let bottomLeftLabel: string = '';
	export let type = 'text';
	export let error: string[] | undefined = [''];
</script>

<div class="form-control w-full">
	<label class="label w-full flex-col">
		<span class="label-text">{label}</span>
		{#if type === 'email'}
			<input
				type="email"
				class="input w-full {error && error[0] ? 'input-error' : ''}"
				bind:value
				{...$$restProps}
			/>
		{:else}
			<input
				type="text"
				class="input w-full {error && error[0] ? 'input-error' : ''}"
				bind:value
				{...$$restProps}
			/>
		{/if}
	</label>
	{#if error && error[0]}
		<span class="text-xs text-error">{error}</span>
	{/if}
	{#if bottomLeftLabel}
		<span class="label-text-alt">{bottomLeftLabel}</span>
	{/if}
</div>
