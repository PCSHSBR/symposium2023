<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let isLogginout = false;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await supabase.auth.signOut();
		if (result.error) {
			alert(result.error.message);
		}
		isLogginout = false;
		goto('/login');
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex flex-col flex-wrap">
		<p class="max-w-[400px] overflow-y-scroll">
			{JSON.stringify(data.session) ?? 'คุณยังไม่เข้าสู่ระบบโปรดเข้าสู่ระบบ'}
		</p>
		<button class="btn-error btn" on:click={handleSignOut} disabled={isLogginout}>
			{#if isLogginout && data.session}
				<span class="loading loading-spinner" />
			{:else if !data.session}
				เข้าสู่ระบบ
			{:else}
				ออกจากระบบ
			{/if}</button
		>
	</div>
</div>
