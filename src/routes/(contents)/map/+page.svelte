<script lang="ts">
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import maplibre from 'maplibre-gl';
	import { onDestroy, onMount } from 'svelte';
	let map: HTMLDivElement;
	onMount(() => {
		const map1 = new maplibre.Map({
			container: map,
			style:
				'https://api.maptiler.com/maps/5aa5e922-4fbe-4207-bb97-01a9e837c6ab/style.json?key=tX3B0e0L23CmIJmoim13',
			center: [103.3041, 15.30784],
			zoom: 18,
			antialias: true,
			attributionControl: false,
			maxBounds: [
				[103.299, 15.30484],
				[103.31, 15.31084]
			]
		});
		map1.addControl(
			new maplibre.AttributionControl({
				compact: true,
				customAttribution: '@patsagorn , @Phubest Srikoon'
			})
		);
		map1.addControl(
			new maplibre.NavigationControl({
				visualizePitch: true
			})
		);
		map1.addControl(
			new maplibre.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showAccuracyCircle: false
			})
		);
		map1.addControl(
			new maplibre.ScaleControl({
				maxWidth: 80,
				unit: 'metric'
			})
		);
		map1.addControl(
			new maplibre.FullscreenControl({
				container: map
			})
		);
		//tilted the map to make it look 3D
		map1.setPitch(60);
	});
	onDestroy(() => {
		if (!browser) return;
		map.remove();
	});
</script>

<div class="relative">
	<div class="map h-[calc(100vh-5rem)]" id="map" bind:this={map} />
	<div class="absolute left-4 top-4">
		<div class="flex gap-1">
			<a href="/#school-map">
				<button class="btn"
					><Icon icon="mdi:home" class="h-6 w-6 sm:h-4 sm:w-4" />
					<span class="hidden sm:inline"> กลับไปหน้าหลัก </span>
				</button>
			</a>
			<a href="https://goo.gl/maps/hrtCinUXAnTnRN1FA">
				<button class="btn btn-primary"
					><Icon icon="mdi:google-maps" class="h-6 w-6 sm:h-4 sm:w-4" /><span
						class="hidden sm:inline"
					>
						ดูบน Google Maps
					</span></button
				>
			</a>
		</div>
		<div class="my-2 rounded-lg bg-base-100 p-4">
			<p class="flex">
				ใช้<span class="sr-only">นิ้วบีบหรือกางบนหน้าจอ</span>
				<Icon icon="material-symbols:pinch" class="mx-3 h-4 w-4" /> เพื่อเลื่อนและขยาย
			</p>
		</div>
	</div>
</div>
<link href="https://cdn.maptiler.com/maptiler-sdk-js/v1.1.1/maptiler-sdk.css" rel="stylesheet" />
