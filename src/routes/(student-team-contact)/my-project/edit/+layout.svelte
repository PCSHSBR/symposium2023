<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	const pageDict: Record<string, string> = {
		'step-2-project-information': 'ข้อมูลโครงงาน',
		'step-3-abstract': 'บทคัดย่อ',
		'step-4-article': 'บทความวิชาการ'
	};
</script>

<svelte:head>
	<title>{pageDict[$page.url.pathname.split('/')[3]]} | ระบบจัดการโครงงาน Sym2023</title>
</svelte:head>

<div class="m-auto w-full max-w-3xl p-5 pt-14 xl:max-w-4xl">
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
