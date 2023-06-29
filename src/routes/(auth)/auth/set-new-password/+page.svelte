<script lang="ts">
	import type { PageData, ActionData } from './$types';
	// export let data: PageData;

	let formValue = {
		password: '',
		confirmPassword: ''
	};

	function handleSubmit() {}

</script>

<!-- https://symposium2023.vercel.app/
#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg3OTgyODQyLCJpYXQiOjE2ODc5NzkyNDIsInN1YiI6ImFhNjE2NmFhLWE4Y2MtNDc0Ny1hMmI1LTc4OTc5OTA2MDBlYSIsImVtYWlsIjoibWFucGF0c2Fnb3JueStzdGFmZkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7Imludml0ZWRfYnkiOiJtYW5wYXRzYWdvcm55QGdtYWlsLmNvbSIsInJvbGUiOiJzdGFmZiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im90cCIsInRpbWVzdGFtcCI6MTY4Nzk3OTI0Mn1dLCJzZXNzaW9uX2lkIjoiOTQ0NmVhM2ItZDdlMy00NTA5LThlZTYtMTQ0NGRmZTU3YjA4In0.FT-b3UVL9HjXzWA9Y_WMP85Ixe9XbAFffHpypdsphzg
&expires_in=3600 
&refresh_token=NNnVhBWplPw4COXOvABGAA 
&token_type=bearer 
&type=recovery -->

<svelte:head>
	<title>ตั้งค่ารหัสผ่านใหม่ของคุณ | ระบบจัดการโครงงาน</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<h1>ตั้งค่ารหัสผ่านใหม่ของคุณ</h1>
<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
	<label class="label flex-col">
		<span class="label-text">รหัสผ่านใหม่</span>
		<input
			type="password"
			autocomplete="new-password"
			class="input-bordered input w-full"
			bind:value={formValue.password}
		/>
	</label>
	<label class="label flex-col">
		<span class="label-text">ยืนยันรหัสผ่านใหม่อีกครั้ง</span>
		<input
			type="password"
			class="input-bordered input w-full"
			autocomplete="new-password"
			bind:value={formValue.confirmPassword}
		/>
	</label>
	<button type="submit" class="btn-primary btn-block btn">ตั้งค่ารหัสผ่านใหม่</button>
</form>
