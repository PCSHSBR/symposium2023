<script lang="ts">
	import TickCross from '$lib/components/TickCross.svelte';
	export let password: string;
	export let confirmPassword: string;
	export let isPass = false;

	let isPasswordPassRequirements = {
		length: {
			pass: false,
			label: 'ความยาวไม่น้อยกว่า 6 ตัวอักษร'
		},
		uppercase: {
			pass: false,
			label: 'มีตัวอักษรพิมพ์ใหญ่อย่างน้อย 1 ตัว'
		},
		lowercase: {
			pass: false,
			label: 'มีตัวอักษรพิมพ์เล็กอย่างน้อย 1 ตัว'
		},
		number: {
			pass: false,
			label: 'มีตัวเลขอย่างน้อย 1 ตัว'
		},
		special: {
			pass: false,
			label: 'มีอักขระพิเศษอย่างน้อย 1 ตัว'
		},
		match: {
			pass: false,
			label: 'กรอกรหัสรอบที่สองต้องตรงกัน'
		}
	};

	$: {
		isPasswordPassRequirements.length.pass = password.length >= 6;
		isPasswordPassRequirements.uppercase.pass = /[A-Z]/.test(password);
		isPasswordPassRequirements.lowercase.pass = /[a-z]/.test(password);
		isPasswordPassRequirements.number.pass = /[0-9]/.test(password);
		isPasswordPassRequirements.special.pass = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
			password
		);
		isPasswordPassRequirements.match.pass = password === confirmPassword && password !== '';
		isPass = Object.values(isPasswordPassRequirements).every(({ pass }) => pass);
	}
</script>

<div class="alert" role="presentation">
	<div class="w-full">
		<h3 class="mb-2">เงื่อนไขรหัสผ่าน</h3>
		<div class="grid grid-cols-[25px_auto] items-center text-sm">
			{#each Object.entries(isPasswordPassRequirements) as [_, { pass, label }]}
				<TickCross {pass} {label} />
			{/each}
		</div>
	</div>
</div>
