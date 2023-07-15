<script lang="ts">
	import { loadpercent } from '$lib/store';
	import LogoWithText from '$lib/components/LogoWithText.svelte';

	let main_container: HTMLDivElement;

	$: {
		if ($loadpercent < 100) {
			document.body.style.overflow = 'hidden';
		} else {
			setTimeout(() => {
				main_container.style.opacity = '0';
				main_container.style.transform = 'translateY(-100%)';
				document.body.style.overflow = 'auto';
			}, 1000);
		}
	}
</script>

<div
	bind:this={main_container}
	class="main-container absolute z-[1002] h-full w-full bg-base-100 transition-all duration-700 ease-in-out"
>
	<div
		class="max-w- m-auto flex h-full w-[calc(100%-32px)] max-w-sm flex-col items-center justify-center align-middle"
	>
		<LogoWithText class="w-full" />
		<progress class="progress-primary progress w-full" value={$loadpercent} max="100" />
		<div class="mt-10 flex flex-col text-center text-xs">
			<span><i>Improving a Sustainable World Through Innovation and Projects</i></span>
			<span><i>พัฒนาโลกสู่ความยั่งยืนด้วยนวัตกรรมและโครงงาน</i></span>
		</div>
	</div>
</div>

<style lang="scss">
</style>
