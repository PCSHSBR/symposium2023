<script>
    import {page} from '$app/stores';
	import { message } from 'sveltekit-superforms/server';
    let error = $page;

    let locals = {
        400:"คุณส่งอะไรมาเนีย!",
        401:"คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
        403:"เขตหวงห้ามเด้อ",
        404: "นั้นเพราะว่าหน้าที่คุณตามหานั้นไม่ได้มีอยู่ในสารระบบของเรานั้นเองเราแนะนำให้คุณนั้นลองใหม่อีกครั้งภายหลัง",
        405: "ไม่รับครับ",
        406: "รับไม่ได้!",
        408: "เกินเวลา",
        409: "เกิดความขัดแย้งขึ้น",
        410: "หายไปแล้ว",
        414: "ยาวไปแล้ว",
        500: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์",
        501: "ยังไม่ได้ทำ",
        504: "เกตเวย์หมดเวลา",
    }
</script>

<section class="max-w-[calc(100%-64px)] m-auto">
    <div class="h-screen flex justify-center align-middle items-center text-center">
        <div class="flex flex-wrap items-center gap-4">
            <h1 class="text-8xl">{error.status}</h1>
            <div class="text-left">
                <h2 class="font-bold text-2xl">Mr.Paris, Why aren't we warp!</h2>
                <h2>{locals[parseInt(error.status)] ?? error.error?.message}</h2>
                <p></p>
            </div>
        </div>
    </div>
</section>