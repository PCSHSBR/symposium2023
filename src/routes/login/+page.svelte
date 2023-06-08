<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms'
	import { fromJSON } from 'postcss';
	export let form
</script>

<div class="h-screen flex justify-center align-middle items-center text-center">
  <form method="post" use:enhance class="flex flex-col w-[400px] gap-4">
    <h1 class="text-4xl">เข้าสู่ระบบ</h1>
    <input class="input input-bordered w-[100%]" name="email" value={form?.email ?? ''} />
    <input class="input input-bordered w-[100%]" type="password" name="password" />
    {#if form?.message && !form?.success}
    <div class="alert alert-error justify-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>{form?.message}</span>
    </div>
    {/if}
    <button class="btn btn-primary">Sign up</button>
    <a class="w-full" href="">Forget password?</a>
  </form>
</div>
