<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let ltype = {
		1: 'การเข้าสู่ระบบ',
		2: 'คำเชิญเข้าร่วมโครงการ',
		3: 'การเปลี่ยนอีเมล',
		4: 'การเปลี่ยนรหัสผ่าน',
		5: 'ไม่ระบุ'
	};
</script>

<svelte:head>
	<title>ยืนยัน {ltype[data.type]}</title>
</svelte:head>

<section
	class="mx-auto flex h-[calc(100vh-4rem)] w-[calc(100%-20px)] max-w-2xl flex-col items-center justify-center align-middle"
>
	<p>คลิ๊ก "<i>ยืนยัน</i>" เพื่อยืนยัน{ltype[data.type]}</p>
	<a href="https://immxnldrjsqvmbiucgyk.supabase.co/auth/v1/verify?token={data.token}">
		<button class="btn-primary btn">
			ยืนยัน {ltype[data.type]}
		</button>
	</a>
</section>
