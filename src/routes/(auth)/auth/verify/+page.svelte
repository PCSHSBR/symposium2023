<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { dev } from '$app/environment';

	const title = 'ยืนยัน';

	const messages = {
		invite: {
			title: 'ตั้งค่าบัญชีใหม่ของคุณ',
			description: 'คุณได้รับคำเชิญให้เข้าร่วมกิจกรรม กดที่ปุ่มด้านล่างเพื่อตั้งค่าบัญชี'
		},
		recovery: {
			title: 'รีเซ็ตรหัสผ่านใหม่',
			description: 'หากคุณส่งคำขอตั้งรหัสผ่านใหม่ โปรดกดที่ปุ่มด้านล่าง'
		},
		email_change: {
			title: 'ยืนยันการเปลี่ยนอีเมล',
			description: 'หากคุณส่งคำขอเปลี่ยนอีเมล โปรดกดที่ปุ่มด้านล่าง'
		}
	};
</script>

<svelte:head>
	<title>{messages[data.type].title}</title>
</svelte:head>

{#if dev}
	<pre>{JSON.stringify({
			token: data.token,
			type: data.type,
			redirect_to: data.redirect_to
		})}</pre>
{/if}

<div class="">
	<h1>{messages[data.type].title}</h1>
	<p>{messages[data.type].description}</p>
	<a
		href="https://immxnldrjsqvmbiucgyk.supabase.co/auth/v1/verify?token={data.token}&type={data.type}&redirect_to={data.redirect_to}"
		class="btn-primary btn-block btn mt-4"
		>ถัดไป &rarr;
	</a>
</div>
