<script lang="ts">
	export let alt = '';
	export let file = '';
	export let options: Record<string, string> | undefined = {};
	let imgOptions = !options
		? ''
		: '&' +
		  Object.entries(options)
				.map(([key, value]) => `${key}=${value}`)
				.join('&');
</script>

<img
	srcset={`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=100${imgOptions} 100w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=116${imgOptions} 116w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=134${imgOptions} 134w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=156${imgOptions} 156w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=182${imgOptions} 182w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=210${imgOptions} 210w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=244${imgOptions} 244w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=282${imgOptions} 282w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=328${imgOptions} 328w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=380${imgOptions} 380w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=442${imgOptions} 442w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=512${imgOptions} 512w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=594${imgOptions} 594w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=688${imgOptions} 688w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=798${imgOptions} 798w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=926${imgOptions} 926w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=1074${imgOptions} 1074w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=1246${imgOptions} 1246w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=1446${imgOptions} 1446w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=1678${imgOptions} 1678w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=1946${imgOptions} 1946w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=2258${imgOptions} 2258w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=2618${imgOptions} 2618w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=3038${imgOptions} 3038w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=3524${imgOptions} 3524w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=4088${imgOptions} 4088w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=4742${imgOptions} 4742w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=5500${imgOptions} 5500w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=6380${imgOptions} 6380w, ` +
		`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress&w=7400${imgOptions} 7400w`}
	src={`https://pcshsbr-assets.imgix.net/${file}?auto=format,compress${imgOptions}`}
	{alt}
	{...$$restProps}
/>
