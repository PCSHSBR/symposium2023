<script lang="ts">
	import Icon from '@iconify/svelte';

	// { formErrors: [], fieldErrors: { role: [ 'บทบาทไม่ถูกต้อง' ] } }
	interface FormError {
		formErrors: string[] | undefined;
		fieldErrors: Record<string, string[]> | undefined;
	}
	interface FormDataRecieve {
		message?: FormError | string;
		ok?: boolean;
	}
	export let form: FormDataRecieve | null;
	$: message = form?.message;
	$: ok = form?.ok;
</script>

{#if message}
	<div class="alert {ok ? 'alert-success' : 'alert-error'}">
		{#if ok}
			<Icon icon="mdi:check-circle" class="h-6 w-6" />
		{:else}
			<Icon icon="mdi:alert-circle" class="h-6 w-6" />
		{/if}
		<ul class="list-inside list-none">
			{#if typeof message === 'string'}
				<li>{message}</li>
			{:else}
				{#each message?.formErrors || [] as error}
					<li>{error}</li>
				{/each}
				{#each Object.entries(message.fieldErrors || {}) as [field, fieldErrors]}
					<li>
						{#each fieldErrors as error}
							{field.toUpperCase()}: {error}
						{/each}
					</li>
				{/each}
			{/if}
		</ul>
	</div>
{/if}
