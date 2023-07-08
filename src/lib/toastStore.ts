import { writable } from 'svelte/store';

type SvelteComponent = import('svelte').ComponentType;

export type FlyParams = import('svelte/transition').FlyParams;

export interface SvelteToastCustomComponent {
	src: SvelteComponent;
	props?: Record<string, any>;
	sendIdTo?: string;
}

type SvelteToastOnPopCallback = (id?: number) => void;

export interface SvelteToastOptions {
	id?: number;
	target?: string;
	msg?: string;
	duration?: number;
	initial?: number;
	next?: number;
	pausable?: boolean;
	dismissable?: boolean;
	reversed?: boolean;
	intro?: FlyParams;
	theme?: Record<string, string | number>;
	classes?: string[];
	onpop?: SvelteToastOnPopCallback;
	component?: SvelteToastCustomComponent;
	progress?: number;
}

/** @type {SvelteToastOptions} */
const defaults: SvelteToastOptions = {
	duration: 4000,
	initial: 1,
	next: 0,
	pausable: false,
	dismissable: true,
	reversed: false,
	intro: { x: 256 }
};

function createToast() {
	const { subscribe, update } = writable(new Array());
	/** @type {Object<string,SvelteToastOptions>} */
	const options: { [s: string]: SvelteToastOptions } = {};
	let count = 0;

	/** @param {any} obj */
	function _obj(obj: any) {
		return obj instanceof Object;
	}

	function _init(target = 'default', opts = {}) {
		options[target] = opts;
		return options;
	}

	/**
	 * Send a new toast
	 * @param {(string|SvelteToastOptions)} msg
	 * @param {SvelteToastOptions} [opts]
	 * @returns {number}
	 */
	function push(msg: string | SvelteToastOptions, opts: SvelteToastOptions): number {
		const param = {
			target: 'default',
			...(_obj(msg) ? msg : { ...opts, msg })
		};
		const conf = options[param.target] || {};
		const entry = {
			...defaults,
			...conf,
			...param,
			theme: { ...conf.theme, ...param.theme },
			classes: [...(conf.classes || []), ...(param.classes || [])],
			id: ++count
		};
		update((n) => (entry.reversed ? [...n, entry] : [entry, ...n]));
		return count;
	}

	/**
	 * Remove toast(s)
	 * - toast.pop() // removes the last toast
	 * - toast.pop(0) // remove all toasts
	 * - toast.pop(id) // removes the toast with specified `id`
	 * - toast.pop({ target: 'foo' }) // remove all toasts from target `foo`
	 * @param {(number|Object<'target',string>)} [id]
	 */
	function pop(id: number | Record<'target', string>) {
		update((n) => {
			if (!n.length || id === 0) return [];
			// Filter function is deprecated; shim added for backward compatibility
			if (typeof id === 'function') return n.filter((i) => id(i));
			if (_obj(id)) return n.filter((i) => i.target !== id.target);
			const found = id || Math.max(...n.map((i) => i.id));
			return n.filter((i) => i.id !== found);
		});
	}

	/**
	 * Update an existing toast
	 * @param {(number|SvelteToastOptions)} id
	 * @param {SvelteToastOptions} [opts]
	 */
	function set(id: number | SvelteToastOptions, opts: SvelteToastOptions) {
		/** @type {any} */
		const param: any = _obj(id) ? id : { ...opts, id };
		update((n) => {
			const idx = n.findIndex((i) => i.id === param.id);
			if (idx > -1) {
				n[idx] = { ...n[idx], ...param };
			}
			return n;
		});
	}

	return { subscribe, push, pop, set, _init };
}

export const toast = createToast();
