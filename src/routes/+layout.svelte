<script lang="ts">
	import '../app.postcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@fontsource-variable/anuphan';
	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

{@html `<!--
${'                       _oo0oo_'}
${'                      o8888888o'}
${'                      88" . "88'}
${'                      (| -_- |)'}
${'                      0\\  =  /0'}
${"                    ___/`---'\\___"}
${"                  .' \\\\|     |// '."}
${'                 / \\\\|||  :  |||// \\'}
${'                / _||||| -:- |||||- \\'}
${'               |   | \\\\\\  -  /// |   |'}
${"               | \\_|  ''\\---/''  |_/ |"}
${"               \\  .-\\__  '-'  ___/-. /"}
${"             ___'. .'  /--.--\\  `. .'___"}
${'          ."" \'<  `.___\\_<|>_/___.\' >\' "".'}
${'         | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |'}
${'         \\  \\ `_.   \\_ __\\ /__ _/   .-` /  /'}
${"     =====`-.____`.___ \\_____/___.-`___.-'====="}
${"                       `=---='"}
นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
	นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ
		นะโม ตัสสะ ภะคะวะโต อะระหะโต สัมมาสัมพุทธัสสะ

ขอให้ผลบุญที่ข้าพเจ้าได้สั่งสมดลให้เว็บแอปนี้ไม่มีบั๊กด้วยเถิด
	ขออย่าให้ข้าพเจ้าต้องตื่นมาแก้ตอนตีสองตีสาม
		ขอให้การทำงานผ่านไปอย่างราบรื่นทุกประการ
			สาธุ สาธุ สาธุ

คณะผู้จัดทำ
นักเรียนโรงเรียนวิทยาศาสตร๋ลุ่มแม่น้ำมูล
-->`}
<svelte:head>
	<meta name="theme-color" content="#374250" />
</svelte:head>

<slot />
