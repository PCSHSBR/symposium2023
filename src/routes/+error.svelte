<script lang="ts">
	import { page } from '$app/stores';
	import { featureFlags } from '$lib/featureFlags';
	import { toThai } from '$lib/langUtils';
	import type { LayoutData } from './$types';
	interface LocalErrorMessage {
		[key: number]: string;
	}

	export let data: LayoutData;

	const locals: LocalErrorMessage = {
		400: 'คุณส่งอะไรมาเนีย!',
		401: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
		403: 'เขตหวงห้ามเด้อ',
		404: 'ไม่พบหน้าที่คุณต้องการ อาจจะเป็นเพราะคุณพิมพ์ผิดหรือเว็บล่มแต่ไม่น่าใช่',
		405: 'ไม่รับครับ',
		406: 'รับไม่ได้!',
		408: 'เกินเวลา',
		409: 'เกิดความขัดแย้งขึ้น',
		410: 'หายไปแล้ว',
		414: 'ยาวไปแล้ว',
		500: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์',
		501: 'ยังไม่ได้ทำ',
		504: 'เกตเวย์หมดเวลา'
	};

	const errmsg_locals = [
		'ทำไมเรายังไม่วาร์ปคุณปรารีส',
		'ขออภัยครับตอนนี้แมวนอนทับคีย์บอร์ดอยู่',
		'"เว็บล่มอีกแล้ว???" คุณอาจกำลังคิด',
		'เราไม่ได้ทำอะไรผิด แต่เราก็ไม่ได้ทำอะไรเลย',
		'เกิด ทำโครงงาน ตาย(ยังไม่ได้ต้องส่งโครงงานก่อน)',
		'มีข้อผิดพลาดเกิดขึ้น'
	];
</script>

<svelte:head>
	<title>{$page.status} - {$page.error?.message}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="m-auto max-w-md px-10">
	<div class="flex h-screen items-center justify-center text-center align-middle">
		<div class="flex flex-wrap items-center gap-4">
			<h1 class="text-8xl">{$page.status}</h1>
			<div class="text-left">
				<h2 class="text-2xl font-bold">
					{errmsg_locals[Math.floor(Math.random() * errmsg_locals.length)]}
				</h2>
				<h2>{locals[$page.status] ?? $page.error?.message}</h2>
				{#if featureFlags.openForLogin}
					<div>
						{#if data.session}
							<span>เข้าสู่ระบบในฐานะ<i>{toThai(data.role)}</i></span>
							<a href="/auth" class="link">กลับไปหน้าแดชบอร์ด</a>
						{:else}
							<span>หรืออาจจะเป็นเพราะคุณยังไม่ได้เข้าสู่ระบบ?</span>
							<a href="/login" class="link">เข้าสู่ระบบ</a>
						{/if}
					</div>
				{/if}
				<pre class="mt-3">{$page.error?.message}</pre>
			</div>
		</div>
	</div>
</section>
