<script lang="ts">
	export let isLoading = false;

	import { onMount } from 'svelte';
	import { loadpercent } from '$lib/store';
	import * as THREE from 'three';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import SplineLoader from '@splinetool/loader';
	import { calculateProgressPercentage } from '$lib/animateOnScroll';

	function calculate3DRotation(maxX: any, maxY: any, clientX: any, clientY: any, intensity: any) {
		let x = Math.sin((maxX - clientX * 2) / maxX) * intensity;
		let z = Math.sin((maxY - clientY * 2) / maxY) * intensity;
		return new THREE.Vector3(x, 0, z);
	}
	export let isHover = false;
	export let scrollProgress = 0;

	let threeCanvas: HTMLDivElement;
	onMount(async () => {
		function detectMob() {
			const toMatch = [
				/Android/i,
				/webOS/i,
				/iPhone/i,
				/iPad/i,
				/iPod/i,
				/BlackBerry/i,
				/Windows Phone/i
			];

			return toMatch.some((toMatchItem) => {
				return navigator.userAgent.match(toMatchItem);
			});
		}
		let width = window.innerWidth;
		let height = window.innerHeight;
		let isMobile = detectMob();

		let loadingManager = new THREE.LoadingManager();
		let pointer = new THREE.Vector2();
		let p1 = new THREE.Vector2();
		let raycaster = new THREE.Raycaster();
		let rotation = new THREE.Vector3();
		let camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
		let scene = new THREE.Scene();
		let renderer = new THREE.WebGLRenderer({ antialias: !isMobile });
		// let controls = new OrbitControls(camera, renderer.domElement);

		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		threeCanvas?.appendChild(renderer.domElement);

		let startVector = new THREE.Vector3(290, -400, 1400);
		let startRotation = new THREE.Vector3(0, 0.540353936417444, 0);
		let endRotation = new THREE.Vector3(0.4, 0.540353936417444, 0);
		let endVector = new THREE.Vector3(-696, -524, -58);

		camera.position.set(startVector.x, startVector.y, startVector.z);
		camera.rotation.set(startRotation.x, startRotation.y, startRotation.z);

		isLoading = true;
		//scene
		const loader = new SplineLoader(loadingManager);
		loader.load(
			'https://prod.spline.design/eT-odXHjbLjvN6uT/scene.splinecode',
			(splineScene) => {
				scene.add(splineScene);
			},
			(event) => {
				// console.log(event);
				loadpercent.set((event.loaded / event.total) * 100);
			}
		);
		loadingManager.onLoad = function () {
			// console.log('Loading complete!');
		};

		let pointLight = new THREE.PointLight(0xffffff, 1, 5000);
		let pointLightHelper = new THREE.PointLightHelper(pointLight, 100);
		pointLight.position.set(-200, -200, 0);
		pointLight.castShadow = !isMobile;
		pointLight.shadow.mapSize.width = 512;
		pointLight.shadow.mapSize.height = 512;
		pointLight.shadow.camera.near = 0.5;
		pointLight.shadow.camera.far = 5000;

		scene.add(
			pointLight
			// pointLightHelper
		);

		// composer
		let composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera));
		const ssaoPass = new SSAOPass(scene, camera, width, height);
		ssaoPass.kernelRadius = 16;
		composer.addPass(ssaoPass);
		composer.addPass(new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.0));
		let outputPass = new ShaderPass(GammaCorrectionShader);
		composer.addPass(outputPass);

		window.addEventListener('mousemove', (p) => {
			pointer = new THREE.Vector2(p.clientX, p.clientY);
			rotation = calculate3DRotation(width, height, p.x, p.y, 0.1);

			p1.x = (p.clientX / window.innerWidth) * 2 - 1;
			p1.y = -(p.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(p1, camera);
			const intersects = raycaster.intersectObjects(scene.children, true);
			if (isHover) {
				pointLight.position.set(
					intersects[0].point.x + 100,
					intersects[0].point.y + 100,
					intersects[0].point.z + 100
				);
			}
		});
		window.addEventListener('resize', () => {
			width = window.innerWidth;
			height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
			composer.setSize(width, height);
		});
		window.addEventListener('scroll', (evn) => {
			if (!threeCanvas) return;
			let lerpVector = new THREE.Vector3().lerpVectors(startVector, endVector, scrollProgress);
			let lerpRotation = new THREE.Vector3().lerpVectors(
				startRotation,
				endRotation,
				scrollProgress
			);
			camera.position.set(lerpVector.x, lerpVector.y, lerpVector.z);
			camera.rotation.set(lerpRotation.x, lerpRotation.y, lerpRotation.z);
			threeCanvas.style.opacity = `${1 - scrollProgress}`;
			// console.log(
			// 	scrollProgress,
			// 	// window.scrollY,window.innerHeight,window.scrollY+window.innerHeight,endScollTop
			// 	);
		});

		function animation() {
			renderer.render(scene, camera);
			requestAnimationFrame(animation);
		}
		animation();
	});
</script>

<div class="three-canvas" bind:this={threeCanvas} />
