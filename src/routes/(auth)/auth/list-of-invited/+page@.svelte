<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import { d, dateFormatter, toThai } from '$lib/langUtils';
	import { dev } from '$app/environment';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
	let isLoading = false;
	let list = data.inviteList;
</script>

<svelte:head>
	<title>รายการอีเมลที่ได้รับเชิญแล้ว</title>
	<meta name="description" content="รายการอีเมลที่ได้รับเชิญแล้ว" />
	<meta name="robots" content="noindex" />
</svelte:head>

<Navbar {data} />
<main class="p-5 pt-16">
	<h1>อีเมลที่ได้รับเชิญแล้ว</h1>
	<!-- {#if dev}
	<pre>
    {JSON.stringify(data.inviteList, null, 2)}
  </pre>
{/if} -->
	<p>เรียงโดยใหม่อยู่บน เก่าอยู่ล่าง</p>
	<div class="mb-2 mt-4 text-center">
		{#if data.role === 'teacher' || data.role === 'school-contact' || data.role === 'staff'}
			<a href="/manage/invite" class="btn-primary btn-xs btn">เชิญผู้ใช้เพิ่ม</a>
		{/if}
		<div class="join">
			{#if +($page.url.searchParams.get('page') || 1) !== 1}
				<a
					class="btn-xs join-item btn"
					href={`?page=${+($page.url.searchParams.get('page') || 1) - 1}`}>ก่อนหน้า</a
				>
			{/if}
			{#if list.length === 100}
				<a
					class="btn-xs join-item btn"
					href={`?page=${+($page.url.searchParams.get('page') || 1) + 1}`}>ถัดไป</a
				>
			{/if}
		</div>
	</div>

	<div class="overflow-x-auto">
		<table class="table-pin-rows table-xs table">
			<thead>
				<tr>
					<th class="text-center">ที่</th>
					<th>อีเมล</th>
					<th class="text-center">รับคำเชิญ?</th>
					<th class="text-center">ส่งคำเชิญแล้วเมื่อ</th>
					<th>เชิญโดย</th>
					<th class="text-center">เชิญในฐานะ</th>
				</tr>
			</thead>
			<tbody>
				{#each list as mail, _id}
					{@const id = _id + (+($page.url.searchParams.get('page') || 1) - 1) * 100}
					<tr
						class="{mail.confirmed_at
							? 'hover:bg-gray-500'
							: 'bg-red-200 hover:bg-red-500 dark:bg-red-900'} duration-150"
					>
						<td class="text-center">{id + 1}</td>
						<td>{mail.email}</td>
						<td class="text-center"
							>{#if mail.confirmed_at}
								<span class="text-green-700 dark:text-green-400">
									<Icon icon="mdi:done" class="m-auto h-5 w-5" />
								</span>
							{:else}
								<span class="text-xs text-red-700 dark:text-red-400">
									<Icon icon="mdi:close" class="m-auto h-5 w-5" />
								</span>
							{/if}
						</td>
						<td class="text-center text-xs"
							>{d(mail.confirmation_sent_at, {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
								hour: 'numeric',
								minute: 'numeric'
							}) || 'เพิ่มด้วยมือ'}</td
						>
						<td>{mail.user_metadata.invited_by}</td>
						<td class="text-center">{toThai(mail.user_metadata.role)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="mb-4 mt-2 text-center">
		{#if data.role === 'teacher' || data.role === 'school-contact' || data.role === 'staff'}
			<a href="/manage/invite" class="btn-primary btn-xs btn">เชิญผู้ใช้เพิ่ม</a>
		{/if}
		<div class="join">
			{#if +($page.url.searchParams.get('page') || 1) !== 1}
				<a
					class="btn-xs join-item btn"
					href={`?page=${+($page.url.searchParams.get('page') || 1) - 1}`}>ก่อนหน้า</a
				>
			{/if}
			{#if list.length === 100}
				<a
					class="btn-xs join-item btn"
					href={`?page=${+($page.url.searchParams.get('page') || 1) + 1}`}>ถัดไป</a
				>
			{/if}
		</div>
	</div>
</main>
