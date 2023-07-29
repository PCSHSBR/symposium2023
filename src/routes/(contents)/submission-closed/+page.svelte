<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex flex-col justify-center p-10 text-center align-middle">
	<Icon icon="line-md:cancel" class="m-auto my-12 text-9xl text-error" />
	<h1>ปิดระบบรับลงทะเบียนโครงงานแล้ว</h1>
	<p>
		นักเรียนจะไม่สามารถลงทะเบียน แก้ไข หรืออัปโหลดข้อมูลผ่านทางหน้าเว็บไซต์ได้อีกต่อไป
		แต่ยังสามารถดูข้อมูลโครงงานที่ส่งไปแล้วได้
	</p>
	{#if data.user_metadata?.role == 'student-team-contact'}
		<a href="/my-project">
			<button class="btn-primary btn-wide btn mx-auto mt-12">
				<Icon icon="mdi:arrow-projectile-multiple" class="mr-2 h-6 w-6" />
				ดูโครงงานของฉัน
			</button>
		</a>
	{/if}
</div>
