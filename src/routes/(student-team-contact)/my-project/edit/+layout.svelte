<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { battery } from 'svelte-legos';

	const batteryInfo = battery();

	$: ({ isSupported, charging, level } = $batteryInfo);

	const pageDict: Record<string, string> = {
		'step-2-project-information': 'ข้อมูลโครงงาน',
		'step-3-abstract': 'บทคัดย่อ',
		'step-4-article': 'บทความวิชาการ'
	};
</script>

<svelte:head>
	<title>{pageDict[$page.url.pathname.split('/')[3]]} | ระบบจัดการโครงงาน Sym2023</title>
</svelte:head>
<div class="m-auto w-full max-w-3xl p-5 pt-16 xl:max-w-4xl">
	{#if isSupported && !charging}
		{#if level <= 0.15}
			{@html `<!-- ยินดีด้วย คุณพบ Ester egg เข้าให้แล้ว! -->`}
			<!-- 15% -->
			<div role="alert" class="alert alert-warning">
				<Icon icon="mdi:battery-10" class="h-12 w-12" />
				<span
					><b>แบตเตอรี่อุปกรณ์ของคุณเหลือน้อย ({level * 100}%)</b> โปรดมองหาจุดชาร์จก่อนจะเสียความคืบหน้าในการบันทึกโครงงาน</span
				>
			</div>
		{:else if level <= 0.03}
			{@html `<!-- ยินดีด้วย คุณพบ Ester egg เข้าให้แล้ว! -->`}
			<!-- 3% -->
			<div role="alert" class="alert alert-error">
				<Icon icon="mdi:battery-alert-variant-outline" class="h-12 w-12" />
				<span
					><b>หาจุดชาร์จเดี๋ยวนี้</b> แบตเตอร์รี่ของคุณเหลือน้อยมาก ({level * 100}%)
					เพื่อไม่ให้เสียความคืบหน้าในการบันทึกโครงงาน</span
				>
			</div>
		{/if}
	{/if}
	<div class="breadcrumbs text-sm">
		<ul>
			<li>
				<a href="/my-project">
					<Icon icon="mdi:arrow-projectile-multiple" class="mr-2" width="16" />
					โครงงานของฉัน
				</a>
			</li>
			<li>
				<Icon icon="mdi:file-document-edit-outline" class="mr-2" width="16" />
				{pageDict[$page.url.pathname.split('/')[3]]}
			</li>
		</ul>
	</div>
	<slot />
</div>
