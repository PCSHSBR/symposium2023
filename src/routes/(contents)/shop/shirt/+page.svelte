<script lang="ts">
	import CdnImage from '$lib/components/CDNImage.svelte';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';

	let shirtData = [
		// WIP
		{
			file: ['mix-1.png', 'IMG_0031.png', 'IMG_0012.png', 'IMG_0033.png', 'IMG_0013.png'],
			desc: [''],
			name: 'ตัวอย่างเสื้อ',
			group: 'mix'
		},
		{
			files: []
		}
	];

	let imgFiles = `
mix-1.png
IMG_0031.png
IMG_0012.png
IMG_0033.png
IMG_0013.png

IMG_0029.png
IMG_0026.png
IMG_0023.png
IMG_0024.png
IMG_0025.png

IMG_0027.png
IMG_0034.png
IMG_0036.png
IMG_0037.png
IMG_0001.png
IMG_0002.png
IMG_0003.png
IMG_0004.png
IMG_0005.png
IMG_0006.png
IMG_0007.png
IMG_0008.png
IMG_0009.png
IMG_0018.png
IMG_0019.png
IMG_0020.png
IMG_0021.png
`
		.split('\n')
		.map((file) => file.trim())
		.filter((file) => file)
		.map((file) => 'sym2023/shirt-image/' + file);

	let previewImg = imgFiles[0];

	function changePreviewImg(imgFile: string) {
		previewImg = imgFile;
	}

	function onKeydown(e: Event) {
		if (e instanceof KeyboardEvent) {
			if (e.key === 'ArrowLeft') {
				let i = imgFiles.indexOf(previewImg);
				if (i > 0) {
					changePreviewImg(imgFiles[i - 1]);
				}
			} else if (e.key === 'ArrowRight') {
				let i = imgFiles.indexOf(previewImg);
				if (i < imgFiles.length - 1) {
					changePreviewImg(imgFiles[i + 1]);
				}
			}
		}
	}

	function calculateDateInDays(date: string) {
		// put -1 when date is in the past
		const _date = new Date(date);
		return Math.floor((_date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
	}
</script>

<svelte:window on:keydown={onKeydown} />
<svelte:head>
	<title>เสื้อ The 3rd PCSHS Science Symposium 2023</title>
</svelte:head>

<section class="py-5">
	<div class="grid grid-cols-1 md:grid md:grid-cols-2 md:gap-8">
		<div
			class="relative flex aspect-square w-full overflow-hidden rounded-3xl bg-base-300 align-top md:row-span-3"
		>
			{#key previewImg}
				<div class="relative h-full w-full" in:fade>
					<CdnImage file={previewImg} class="h-full w-full object-cover shadow-md" alt="" />
				</div>
			{/key}
			<span class="badge absolute bottom-4 right-4 border-none bg-white/50 text-sm text-black/90">
				{imgFiles.indexOf(previewImg) + 1}/{imgFiles.length}
			</span>
		</div>

		<div
			class="my-4 w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden whitespace-nowrap md:my-0"
			data-scrollbar="false"
		>
			{#each imgFiles as file, i}
				<button
					on:click|preventDefault={() => changePreviewImg(file)}
					disabled={file == previewImg}
					class="relative mr-4 inline-block aspect-square h-24 snap-start overflow-hidden rounded-3xl bg-base-300 shadow-md md:h-20 {(file ==
						previewImg &&
						'border-primary') ||
						'border-base-100'} border-2 {i == 0 && 'ml-4'}"
				>
					{#if file === previewImg}
						{#key file}
							<span
								in:fade={{
									duration: 100
								}}
								out:fade={{
									duration: 100
								}}
								class="absolute z-10 flex h-full w-full items-center justify-center bg-base-300/70"
							>
								<Icon icon="mdi:eye" class="h-6 w-6" />
							</span>
						{/key}
					{/if}
					<CdnImage
						{file}
						class="relative h-full w-full object-cover"
						alt="ภาพตัวอย่างเมื่อสวมใส่"
						options={{
							h: '200',
							w: '200'
						}}
					/>
				</button>
			{/each}
		</div>
		<div class="grid-in-[title]">
			{#if calculateDateInDays('23:59 August 30, 2023 (+07)') !== -1}
				<p class="font-bold text-red-500">
					จะปิดรับคำสั่งซื้อในอีก {calculateDateInDays('23:59 August 30, 2023 (+07)')} วัน
				</p>
			{/if}
			<h1 class="text-2xl font-bold">เสื้อ The 3<sup>rd</sup> PCSHS Science Symposium 2023</h1>
			<p class="font-bold"><span class="text-4xl">250 บาท</span></p>
		</div>
		<div class="grid-in-[desc] flex h-full w-full flex-col md:w-full">
			<p class="">
				<strong>รายละเอียดสินค้า:</strong>
				เสื้องาน The 3<sup>rd</sup> PCSHS Symposium 2023 ของกลุ่มโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย
				บุรีรัมย์ มีลายทั้งสิ้น 2 แบบ
			</p>
			<p class="mt-3 font-bold">เปิดรับคำสั่งซื้อจนถึง 30 สิงหาคม 2566, 23:59</p>
			<div class="mt-4 flex">
				<a href="https://forms.gle/mfj5W6ANJJKCD2TN6" target="_blank" class="btn-primary btn w-full"
					>สั่งซื้อผ่าน Google Form <Icon icon="mdi:open-in-new" class="h-4 w-4" /></a
				>
			</div>
		</div>
	</div>
</section>
