<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<button class="btn btn-primary" on:click={handleSignIn}>Sign in</button>
<button class="btn btn-error" on:click={handleSignOut}>Sign out</button>
