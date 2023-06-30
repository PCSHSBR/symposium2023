<script lang="ts">
  export let isLoading = false;

	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
	import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
	import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
	import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
	import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
	import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
	import SplineLoader from '@splinetool/loader';

	function calculate3DRotation(maxX: any, maxY: any, clientX: any, clientY: any, intensity: any) {
		let x = Math.sin((maxX - clientX * 2) / maxX) * intensity;
		let z = Math.sin((maxY - clientY * 2) / maxY) * intensity;
		return new THREE.Vector3(x, 0, z);
	}

	onMount(() => {
		let width = window.innerWidth;
		let height = window.innerHeight;
		let pointer = new THREE.Vector2();
    let p1 = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
		let rotation = new THREE.Vector3();
		let camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 5000);
		let scene = new THREE.Scene();
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		// let controls = new OrbitControls(camera, renderer.domElement);
		let threeCanvas = document.querySelector('.three-canvas');

		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		threeCanvas?.appendChild(renderer.domElement);
    
		camera.position.x = 290;
		camera.position.y = -400;
		camera.position.z = 1400;
		camera.rotation.y = 0.540353936417444;

    isLoading = true;
    //scene
		const loader = new SplineLoader();
		loader.load('https://prod.spline.design/eT-odXHjbLjvN6uT/scene.splinecode', (splineScene) => {
			scene.add(splineScene);
		},(event)=>{
      console.log(event);
    });
    
    let pointLight = new THREE.PointLight(0xffffff, 1, 5000);
    let pointLightHelper = new THREE.PointLightHelper(pointLight, 100);
    pointLight.position.set(-200, -200, 0);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048
    
    scene.add(pointLight, 
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

      p1.x = ( p.clientX / window.innerWidth ) * 2 - 1;
			p1.y = - ( p.clientY / window.innerHeight ) * 2 + 1;

			raycaster.setFromCamera( p1, camera );
			const intersects = raycaster.intersectObjects( scene.children, true );
      pointLight.position.set(intersects[0].point.x + 100,intersects[0].point.y +100,intersects[0].point.z +100);
		});
		window.addEventListener('resize', () => {
			width = window.innerWidth;
			height = window.innerHeight;
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			renderer.setSize(width, height);
			composer.setSize(width, height);
		});

		function animation() {
			requestAnimationFrame(animation);
			renderer.render(scene, camera);
			// controls.update();
			camera.rotation.set(rotation.z, 0.540353936417444 + rotation.x, 0);
		}
		animation();
	});
</script>

<div class="three-canvas" />
