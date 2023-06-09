<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let isLogginout = false;

	const handleSignOut = async () => {
		isLogginout = true;
		let result = await supabase.auth.signOut();
		if (result.error){
			alert(result.error.message)
		}
		isLogginout = false;
		goto('/login')
	};
</script>

<button class="btn btn-error" on:click={handleSignOut} disabled={isLogginout}>
	{#if isLogginout}
		<span class="loading loading-spinner" />
	{:else}
		ออกจากระบบ
	{/if}</button
>
