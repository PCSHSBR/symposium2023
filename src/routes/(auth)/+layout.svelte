<script lang="ts">
    import Navbar from "$lib/componant/Navbar.svelte";
	import type { PageData } from "./$types";
    
    export let data: PageData;
</script>

<main class="min-h-screen">
<Navbar data={data}/>
<slot />
</main>