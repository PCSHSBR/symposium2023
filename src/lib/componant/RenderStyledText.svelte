<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';
	export let content = '';
	$: content = DOMPurify.sanitize(content, {
		ALLOWED_TAGS: ['i', 'b']
	});
</script>

{@html content}
