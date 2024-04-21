<script lang="ts">
	import '../app.scss';
	import '../app.postcss';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '@fontsource-variable/anuphan';
	import '@fontsource/ia-writer-mono';
	import { page } from '$app/stores';
	import ToastWrapper from '$lib/components/ToastWrapper.svelte';
	import Icon from '@iconify/svelte';
	import { partytownSnippet } from '@builder.io/partytown/integration';

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
นักเรียนโรงเรียนวิทยาศาสตร์ลุ่มแม่น้ำมูล
-->`}
<svelte:head>
	<meta name="theme-color" content="#374250" />
	<meta name="msapplication-navbutton-color" content="#374250" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="#374250" />
	<script>
		partytown = {
			forward: ['dataLayer.push']
		};
	</script>
	{@html '<script>' + partytownSnippet() + '</script>'}
	<script
		async
		type="text/partytown"
		src="https://www.googletagmanager.com/gtag/js?id=G-VPF67T58QS"
	></script>
	<script type="text/partytown">
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-VPF67T58QS');
	</script>
</svelte:head>
<ToastWrapper />
<slot />
