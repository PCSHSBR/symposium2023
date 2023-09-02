<script lang="ts">
	export let isStandTV: boolean = false;
</script>

<h2 class="sticky {isStandTV ? 'top-0' : 'top-16'} z-30 rounded-lg py-3 text-3xl backdrop-blur-lg">
	<slot />
</h2>
