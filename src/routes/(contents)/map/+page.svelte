<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	const clearEventListenerController = new AbortController();
	let animationFrameID: number;

	// credit for ongsalt for optimization

	let threeCanvas: HTMLDivElement;

	onMount(() => {
		async function threejs() {
			let height = window.innerHeight;
			let width = window.innerWidth;
			const pointer = new THREE.Vector2();
			const loader = new GLTFLoader();
			const camera = new THREE.PerspectiveCamera(
				50,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			const scene = new THREE.Scene();
			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			const raycaster = new THREE.Raycaster();
			const controls = new OrbitControls(camera, renderer.domElement);
			let composer = new EffectComposer(renderer);

			// controls.enablePan = false;
			controls.maxPolarAngle = (Math.PI - 0.1) / 2; // Limit angle of visibility
			controls.minZoom = 1;

			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			renderer.autoClear = true;
			threeCanvas?.appendChild(renderer.domElement);

			camera.position.x = 0;
			camera.position.y = 7;
			camera.rotation.x = -(Math.PI / 2);

			// scene objwcts
			let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
			let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
			let SchoolModel = await loadGLTFModel('models/School Model.glb', true, scene);
			SchoolModel.scene.rotation.y = Math.PI / 2;
			setShadow(SchoolModel.scene, true, true, ['Base', 'Sport3', 'Forest1']);

			directionalLight.position.set(5, 10, 0);
			directionalLight.shadow.radius = 0.5;
			directionalLight.rotation.z = -Math.PI / 4;
			// directionalLight.castShadow = true;

			// add to scene
			scene.add(directionalLight, ambientLight);

			// composer

			//end
			function animation() {
				animationFrameID = requestAnimationFrame(animation);
				renderer.render(scene, camera);
				composer.render();
				controls.update();
				composer.setSize(width, height);
				console.log(camera.position, camera.rotation);
			}

			{
				window.addEventListener('resize', (event) => {
					height = window.innerHeight;
					width = window.innerWidth;
					camera.aspect = width / height;
					camera.updateProjectionMatrix();
					renderer.setSize(width, height);
				});
			}
			animation();
		}
		interface GLTFResult {
			scene: THREE.Group;
		}
		function loadGLTFModel(
			url: string,
			autoadd?: boolean | undefined,
			pscene?: THREE.Scene | undefined
		): Promise<GLTFResult> {
			return new Promise((resolve, reject) => {
				const loader = new GLTFLoader();

				loader.load(
					url,
					(gltf) => {
						const result: GLTFResult = {
							scene: gltf.scene
						};
						autoadd ? (pscene ? pscene.add(gltf.scene) : null) : null;
						resolve(result);
					},
					undefined,
					(error) => {
						reject(error);
					}
				);
			});
		}
		function setShadow(
			scene: THREE.Group,
			castShadow?: boolean | false,
			receiveShadow?: boolean | false,
			exceptcast = [] as string[]
		) {
			scene.traverse((node) => {
				if ((node as any).isMesh) {
					(node as any).receiveShadow = receiveShadow;
					if (exceptcast.includes((node as any).name)) {
						return;
					}
					(node as any).castShadow = castShadow;
				}
			});
		}

		threejs();
	});

	onDestroy(() => {
		if (browser) {
			clearEventListenerController.abort();
			cancelAnimationFrame(animationFrameID);
		}
	});
</script>

<div class="relative">
	<div class="absolute left-[16px] top-[16px]">
		<a href="/#school-map">
			<button class="btn-primary btn"><Icon icon="mdi:home" />กลับไปหน้าหลัก</button>
		</a>
		<div class="my-2 rounded-2xl bg-base-100 p-4">
			<p class="flex">ใข้ <Icon icon="material-symbols:pinch" /> เพื่อเลื่อนและขยาย</p>
		</div>
	</div>
	<div class="three-canvas h-[100vh-4rem] w-screen" bind:this={threeCanvas} />
</div>
