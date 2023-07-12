<script lang="ts">
	export let label: string = 'ชื่อ';
	export let value = '';
	export let bottomLeftLabel: string = '';
	export let type = 'text';
	export let error: string[] | undefined = [''];
	export let suggestValue = '';
</script>

<div class="form-control w-full">
	<label class="label w-full flex-col">
		<span class="label-text">{label}</span>
		{#if type === 'email'}
			<input
				type="email"
				aria-invalid={error && error[0] ? 'true' : undefined}
				class="input w-full {error && error[0] ? 'input-error' : ''}"
				bind:value
				{...$$restProps}
			/>
		{:else}
			<input
				type="text"
				aria-invalid={error && error[0] ? 'true' : undefined}
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
	{#if suggestValue}
		<span class="label-text-alt"
			>✨ ค่าที่แนะนำ: <button
				class="btn-ghost btn-info btn-xs btn"
				type="button"
				on:click={() => {
					value = suggestValue;
				}}>{suggestValue}</button
			></span
		>
	{/if}
</div>
