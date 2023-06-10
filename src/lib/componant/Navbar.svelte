<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide, fade } from 'svelte/transition';

	export let data;

	let isMenu: boolean;
</script>

<nav class="navbar absolute border-neutral backdrop-blur-sm bg-base-100/70 justify-between z-[100]">
	<div>
		<label class="btn btn-square btn-ghost swap swap-rotate md:hidden">
			<input type="checkbox" bind:checked={isMenu} />
			<Icon icon="material-symbols:menu" class="text-2xl swap-off" />
			<Icon icon="material-symbols:close" class="text-2xl swap-on" />
		</label>
		<a class="btn btn-ghost normal-case text-xl" href="/">Symp2023</a>
		<ul class="menu menu-horizontal px-1 hidden md:flex flex-row">
            <li><a href="/" on:click={()=>{isMenu=!isMenu}}>หน้าแรก</a></li>
            <li>
                <details>
                    <summary>ข้อมูลงาน</summary>
                    <ul>
                        <li><a href="/" on:click={()=>{isMenu=!isMenu}}>แผนที่งาน</a></li>
                        <li><a href="/" on:click={()=>{isMenu=!isMenu}}>ตารางงาน</a></li>
                    </ul>
                </details>
            </li>
            <li><a href="/" on:click={()=>{isMenu=!isMenu}}>ช่องทางติดต่อ</a></li>
            <li><a href="/" on:click={()=>{isMenu=!isMenu}}>FAQ</a></li>
		</ul>
	</div>
	<div>
		{#if data.session}
			<a class="btn btn-primary" href="/auth">แดร์ชบอร์ด</a>
		{:else}
			<a class="btn btn-primary" href="/login">เข้าสู่ระบบ</a>
		{/if}
	</div>
</nav>

{#if isMenu}
	<div
		class="absolute h-screen w-screen bg-black/50 md:hidden"
		transition:slide={{ duration: 500 }}
	>
		<div
			class="sidemenu left-0 top-[4rem] absolute h-[calc(100vh-4rem)] w-screen md:w-[300px] shadow-xl bg-base-200 z-[101]"
		>
			<ul class="menu px-1 w-full">
				<li><a href="/" on:click={()=>{isMenu=!isMenu}}>หน้าแรก</a></li>
                <li>
                    <details>
                        <summary>ข้อมูลงาน</summary>
                        <ul>
                            <li><a href="/" on:click={()=>{isMenu=!isMenu}}>แผนที่งาน</a></li>
                            <li><a href="/" on:click={()=>{isMenu=!isMenu}}>ตารางงาน</a></li>
                        </ul>
                    </details>
                </li>
                <li><a href="/" on:click={()=>{isMenu=!isMenu}}>ช่องทางติดต่อ</a></li>
                <li><a href="/" on:click={()=>{isMenu=!isMenu}}>FAQ</a></li>
			</ul>
		</div>
	</div>
{/if}
