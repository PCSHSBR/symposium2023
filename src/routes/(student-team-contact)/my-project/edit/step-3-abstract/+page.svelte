<script lang="ts">
	import Icon from '@iconify/svelte';
	import BottomChevron from '../BottomChevron.svelte';
	import Upload from '../Upload.svelte';
	import { textareaAutosizeAction, focusAction } from 'svelte-legos';
	import RenderStyledText from '$lib/componant/RenderStyledText.svelte';

	let abstractContent = '';
</script>

<div class="mt-4 flex flex-row justify-between gap-5 md:flex-row-reverse md:justify-end">
	<h1>อัปโหลดบทคัดย่อ</h1>
	<div>
		<div
			class="text-display flex h-14 w-14 items-center justify-center rounded-full bg-primary font-display text-2xl font-bold text-white"
		>
			3
		</div>
	</div>
</div>

<p class="">คุณยังไม่เคยอัปโหลดบทคัดย่อ</p>
<div>
	<div>
		<h2>เนื้อหาบทคัดย่อ</h2>
		<textarea
			class="textarea-bordered textarea w-full"
			use:textareaAutosizeAction
			use:focusAction
			spellcheck="true"
			bind:value={abstractContent}
		/>
		<p class="text-sm text-inherit text-opacity-10">
			<b>หมายเหตุ:</b> ใช้ <code>&lt;i&gt;ตัวเอียง&lt;/i&gt;</code> รอบข้อความสำหรับ<i>ตัวเอียง</i>
			และ <code>&lt;b&gt;ตัวหนา&lt;/b&gt;</code> สำหรับ<b>ตัวหนา</b>
		</p>
		<div class="card my-4">
			<h3 class="card-title">แสดงตัวอย่างข้อความ</h3>
			<div class="mt-3 border border-gray-300 p-3">
				<RenderStyledText content={abstractContent} />
			</div>
		</div>
	</div>
	<Upload />
</div>

<BottomChevron
	nextHref="step-4-article"
	nextPage="อัปโหลดบทความ"
	prevHref="step-2-project-information"
	prevPage="ข้อมูลโครงงาน"
/>
