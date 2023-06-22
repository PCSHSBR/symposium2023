<script lang="ts">
	import { page } from '$app/stores';
	let error = $page;

	interface LocalErrorMessage {
		[key: number]: string;
	}

	const locals: LocalErrorMessage = {
		400: 'คุณส่งอะไรมาเนีย!',
		401: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้',
		403: 'เขตหวงห้ามเด้อ',
		404: 'นั้นเพราะว่าหน้าที่คุณตามหานั้นไม่ได้มีอยู่ในสารระบบของเรานั้นเองเราแนะนำให้คุณนั้นลองใหม่อีกครั้งภายหลัง',
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
		'พวกเราอภัยครับตอนนี้แมวนอนทับคีย์เบอร์ดอยู่',
		'มีข้อผิดพลาดเกิดขึ้น'
	];
</script>

<svelte:head>
	<title>{error.status} - {error.error?.message}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="m-auto max-w-md px-10">
	<div class="flex h-screen items-center justify-center text-center align-middle">
		<div class="flex flex-wrap items-center gap-4">
			<h1 class="text-8xl">{error.status}</h1>
			<div class="text-left">
				<h2 class="text-2xl font-bold">
					{errmsg_locals[Math.floor(Math.random() * errmsg_locals.length)]}
				</h2>
				<h2>{locals[error.status] ?? error.error?.message}</h2>
				<a
					href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/{error.status}"
					class="link pt-4">อะไรคือ {error.status}?</a
				>
			</div>
		</div>
	</div>
</section>
