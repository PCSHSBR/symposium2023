<script lang="ts">
	import { onMount } from 'svelte';
	import type { SortType } from '$lib/types';
	import Icon from '@iconify/svelte';

	export let tdata: any = [];
	export let keys: any = [];
	export let allowSelect: boolean = true;
	export let search: boolean = true;
	let clazz: string = '';
	export { clazz as class };

	export let activeKeys = {
		sortBy: 'ใหม่สุด',
		focusRow: Object.values(keys)[0],
		activeRow: Object.values(keys)
	};

	let thead: HTMLElement;
	let tbody: HTMLElement;
	let filterForm: HTMLFormElement;
	onMount(async () => {
		// row head
		let thead_tr = await thead.querySelector('tr');
		let lkeys = Object.values(keys);
		// console.log(lkeys, activeKeys);
		allowSelect ? lkeys.unshift('<input type="checkbox" class="checkbox">') : null;
		for (let i = 1; i <= lkeys.length; i++) {
			let th = document.createElement('th');
			th.innerHTML = lkeys[i - 1];
			th.setAttribute('data-thindex', i.toString());
			th.setAttribute('data-sort', 'none');
			thead_tr.append(th);
		}

		// row data
		tdata.forEach((element) => {
			let data = Object.values(element);
			data.shift();
			allowSelect ? data.unshift('<input type="checkbox" class="checkbox">') : null;
			let tr = document.createElement('tr');
			data.forEach((item) => {
				let td = document.createElement('td');
				td.innerHTML = item;
				tr.append(td);
			});
			tbody.append(tr);
		});

		//filterForm
		let select = document.createElement('select');
		let label = document.createElement('label');
		let select1 = document.createElement('select');
		let label2 = document.createElement('label');
		let label1 = document.createElement('label');
		let div = document.createElement('div');
		select.classList.add('select', 'select-bordered', 'w-full', 'max-w-xs');
		label.classList.add('label');
		label.classList.add('cursor-pointer');
		label.innerHTML = `<span class="label-text">เรียงตาม</span>`;
		['ใหม่สุด', 'เก่าสุด', 'ชื่อ (ก-ฮ)', 'ชื่อ (ฮ-ก)'].forEach((item) => {
			let option = document.createElement('option');
			option.setAttribute('value', item);
			option.innerHTML = item;
			select.append(option);
		});

		select1.classList.add('select', 'select-bordered', 'w-full', 'max-w-xs');
		label2.classList.add('label');
		label2.classList.add('cursor-pointer');
		label2.innerHTML = `<span class="label-text">แถวที่ใช้ในการเรียง</span>`;
		Object.values(keys).forEach((item) => {
			let option = document.createElement('option');
			option.setAttribute('value', item);
			option.innerHTML = item;
			select1.append(option);
		});

		filterForm.append(label, select, label2, select1);
		label1.classList.add('label');
		label1.classList.add('cursor-pointer');
		label1.innerHTML = `<span class="label-text">แถวที่ใช้งาน</span>`;
		filterForm.append(label1);
		div.classList.add('p-4', 'border', 'rounded-lg', 'overflow-y-auto', 'border-base-content');
		filterForm.append(div);
		Object.keys(keys).forEach((item) => {
			let label = document.createElement('label');
			label.classList.add('label');
			label.classList.add('cursor-pointer');
			label.innerHTML = `<span class="label-text">${keys[item]}</span>`;
			let input = document.createElement('input');
			input.setAttribute('type', 'checkbox');
			input.classList.add('checkbox');
			input.checked = true;
			label.append(input);
			div.append(label);
		});
		let modal_action = filterForm.querySelector('.modal-action');
		modal_action?.parentNode?.appendChild(modal_action, modal_action?.nextSibling);

		filterForm.addEventListener('submit', (e) => {
			activeKeys = {
				sortBy: select.value,
				focusRow: select1.value,
				activeRow: [...filterForm.querySelectorAll('input[type="checkbox"]')]
					.filter((item) => item.checked)
					.map((item) => item.parentNode.querySelector('span').innerHTML)
			};
			// console.log(activeKeys);
		});
	});
</script>

<div class={`overflow-auto ${clazz || ''}`}>
	<div class="sticky left-0">
		{#if search}
			<input type="text" placeholder="ค้นหา" class="input-bordered input w-full max-w-xs" />
		{/if}
		<button class="btn" onclick="my_modal_5.showModal()"><Icon icon="bi:filter" />ฟิลเตอร์</button>
	</div>
	<table class="table">
		<!-- head -->
		<thead bind:this={thead}>
			<tr />
		</thead>
		<tbody bind:this={tbody} />
	</table>

	<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
		<form method="dialog" class="modal-box" bind:this={filterForm}>
			<h3 class="text-lg font-bold">ฟิลเตอร์</h3>
			<div class="modal-action">
				<button class="btn-primary btn">บันทึก</button>
			</div>
		</form>
	</dialog>
</div>

<style lang="scss">
</style>
