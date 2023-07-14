<script lang="ts">
	import Icon from '@iconify/svelte';
	import { twMerge } from 'tailwind-merge';
	let classes = '';
	export { classes as class };
	export let fileInput: HTMLInputElement | null | undefined = null;
	export let files: FileList | null;
	export let isDragOver = false;
	export let onDragOver = (e: Event) => {
		// include drag over on child elements
		if (!e.target) return;
		if (!(e.target instanceof HTMLElement)) return;
		if (!e.target.closest('label')) return;
		e.preventDefault();
		isDragOver = true;
	};
	export let onDragLeave = () => (isDragOver = false);
	export let onDrop = (e: DragEvent) => {
		e.preventDefault();
		if (!e.dataTransfer) return;
		isDragOver = false;
		files = e.dataTransfer.files;
	};
	export let accept: string;
	export let onKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			fileInput?.click();
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<label
	class={twMerge(
		'hover:running-border flex aspect-[5/2] w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-base-content hover:bg-gray-200 hover:shadow-md dark:hover:bg-gray-800',
		classes
	)}
	{...$$restProps}
	tabindex="0"
	title="กดเพื่ออัปโหลด"
	on:dragover|preventDefault={onDragOver}
	on:dragleave|preventDefault={onDragLeave}
	on:drop|preventDefault={onDrop}
	on:keydown={onKeydown}
>
	<span class="flex flex-col items-center gap-2 {isDragOver && 'animate-bounce'}">
		<slot name="label">
			<Icon class="h-8 w-8" icon="mdi:upload" />
			<span>อัปโหลดไฟล์</span>
		</slot>
	</span>
	<input {accept} hidden type="file" bind:this={fileInput} bind:files />
</label>
