<svelte:head>
	<title>The 3rd PCSHS Science Symposium 2023 @PCSHSBR</title>
	<meta
		name="description"
		content="ยินดีต้อนรับสู่งานนำเสนอผลงานโครงงานนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยของระดับชั้นมัธยมศึกษาปีที่ 6 The 3rd PCSHS Science Symposium 2023 ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์"
	/>
	<meta
		property="og:description"
		content="ยินดีต้อนรับสู่งานนำเสนอผลงานโครงงานนักเรียนโรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัยของระดับชั้นมัธยมศึกษาปีที่ 6 The 3rd PCSHS Science Symposium 2023 ณ โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย บุรีรัมย์"
	/>
	<meta property="og:title" content="The 3rd PCSHS Science Symposium 2023 @PCSHSBR" />
</svelte:head>

<script lang="ts">
		let days = 15;
		let hours = 15;
		let minutes = 12;
		let seconds = 24;

		setInterval(()=>{
			seconds--;
			if(seconds == 0){
				minutes--;
				seconds = 59;
			}
			if(minutes == 0){
				hours--;
				minutes = 59;
			}
			if(hours == 0){
				days--;
				hours = 23;
			}

		}, 1000)
</script>

<section class="pt-16">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<a href="/login" class="btn-primary btn">Login</a>
	<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{days};"></span>
			</span>
			days
		</div> 
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{hours};"></span>
			</span>
			hours
		</div> 
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{minutes};"></span>
			</span>
			min
		</div> 
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{seconds};"></span>
			</span>
			sec
		</div>
	</div>
</section>