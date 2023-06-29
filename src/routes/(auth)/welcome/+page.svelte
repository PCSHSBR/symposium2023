<script lang="ts">
	import type { PageData } from './$types';

  export let data: PageData
</script>

<h1>ยินดีต้อนรับ</h1>

<p>สวัสดี {data.session?.user.email}</p>