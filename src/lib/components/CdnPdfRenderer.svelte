<script lang="ts">
	import { onMount } from 'svelte';

	export let alt = '';
	export let file = '';
	export let page = 1;
	export let text = '';
	function base64encode(text: string) {
		// do not using unescape(), it's deprecated
		return btoa(
			encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
				return String.fromCharCode(parseInt(p1, 16));
			})
		);
	}
	if (text) text = base64encode(text);
	let isLoaded = false;
	let classes = '';
	export { classes as class };
	let isStandTV = true;
	onMount(() => {
		isStandTV = localStorage.getItem('standtv') === '1';
	});
</script>

<a
	{...$$restProps}
	class="relative aspect-[210/297] w-full overflow-y-hidden border border-base-300 bg-base-200 shadow-lg {classes}"
	data-strip-background-moving={!isLoaded}
	href={isStandTV
		? '#'
		: `https://pcshsbr-assets.imgix.net/${file}?fm=png&page=${page}&invert=false&w=1200`}
	title="กดเพื่อเปิดภาพนี้ขนาดใหญ่ขึ้นในแท็บใหม่ (หน้า {page})"
>
	<span class="absolute bottom-0 left-0 right-0 z-0 block p-2 text-right text-xs"
		>กำลังโหลดหน้า {page}</span
	>
	<picture class="relative z-20 h-full w-full">
		<source
			srcset={`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=100 100w,` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=116 116w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=134 134w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=156 156w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=182 182w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=210 210w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=244 244w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=282 282w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=328 328w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=380 380w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=442 442w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=512 512w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=594 594w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=688 688w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=798 798w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=926 926w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=1074 1074w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=1246 1246w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=1446 1446w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=1678 1678w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=1946 1946w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=2258 2258w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=true&w=2618 2618w, `}
			media="(prefers-color-scheme: dark)"
		/>

		<img
			srcset={`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=100 100w,` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=116 116w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=134 134w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=156 156w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=182 182w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=210 210w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=244 244w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=282 282w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=328 328w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=380 380w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=442 442w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=512 512w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=594 594w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=688 688w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=798 798w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=926 926w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=1074 1074w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=1246 1246w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=1446 1446w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=1678 1678w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=1946 1946w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=2258 2258w, ` +
				`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false&w=2618 2618w, `}
			{alt}
			src={`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&page=${page}&invert=false`}
			class="h-full w-full object-cover object-center"
		/>
	</picture>
</a>

<style lang="scss">
	[data-strip-background-moving='true'] {
		background-image: repeating-linear-gradient(
			to bottom right,
			theme('colors.base-200') 0px,
			theme('colors.base-200') 8px,
			theme('colors.base-100') 8px,
			theme('colors.base-100') 16px
		);
		background-size: 64px 16px;
		animation: strip-background-moving 1s linear infinite;
	}

	@keyframes strip-background-moving {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 0 16px;
		}
	}
</style>
