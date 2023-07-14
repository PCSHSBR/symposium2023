<script lang="ts">
	import type { StyledText } from '$lib/types';
	import DOMPurify from 'isomorphic-dompurify';
	export let content: StyledText = '';
	$: content = DOMPurify.sanitize(content, {
		ALLOWED_TAGS: ['i', 'b']
	});
</script>

{@html content}
