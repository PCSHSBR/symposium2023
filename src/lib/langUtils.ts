import type { Roles } from '$lib/types';
export const sentencesMap: Map<string | Roles, string> = new Map([
	['fetch failed', 'ไม่สามารถเข้าถึงเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเตอร์เน็ต'],
	['Failed to fetch', 'ไม่สามารถเข้าถึงอินเตอร์เน็ต'],
	['TypeError: fetch failed', 'ไม่มีการเข้าถึงอินเตอร์เน็ต'],
	['Invalid login credentials', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'],
	[
		'Unable to validate email address: invalid format',
		'ไม่สามารถตรวจสอบอีเมลได้: รูปแบบไม่ถูกต้อง'
	],
	['staff', 'เจ้าหน้าที่'],
	['teacher', 'ครู'],
	['school-contact', 'ผู้ติดต่อโรงเรียน'],
	['student-team-contact', 'นักเรียน'],
	[
		'For security purposes, you can only request this once every 60 seconds',
		'เนื่องด้วยเหตุผลด้านความปลอดภัย คุณสามารถส่งคำขอรีเซ็ตรหัสผ่านได้หนึ่งครั้งทุก ๆ 60 วินาที'
	],
	['Email rate limit exceeded', 'คุณส่งคำเขิญมากเกินไป โปรดรอสักครู่ก่อนส่งคำเชิญใหม่'],
	['Email link is invalid or has expired', 'ลิงก์รับคำเชิญผ่านอีเมลไม่ถูกต้องหรือหมดอายุแล้ว'],
	[
		'A user with this email address has already been registered',
		'อีเมลที่ได้รับการลงทะเบียนไปแล้ว'
	],
	['Auth session missing!', 'ไม่พบเซสชันการยืนยันตัวตน คุณอาจไม่ได้มาตามลิงก์ที่ถูกต้อง'],
	[
		'New password should be different from the old password.',
		'รหัสผ่านใหม่ควรแตกต่างกับรหัสผ่านเดิม'
	],
	['Email link is invalid or has expired', 'ลิงก์รับคำเชิญผ่านอีเมลไม่ถูกต้องหรือหมดอายุแล้ว']
]);

export function toThai(message: string | undefined) {
	return sentencesMap.has(message ?? '') ? sentencesMap.get(message ?? '') : message;
}

/**
 * Format array of string into one localized string.
 * @param texts array of string to conjunction
 * @returns conjuncted localized string
 * @example ['แอปเปิ้ล', 'มะละกอ', 'กล้วย', 'ส้ม'] -> แอปเปิ้ล มะละกอ กล้วย และส้ม
 */
export function textListFormatter(texts: string[] | undefined) {
	if (typeof texts === 'undefined') return undefined;
	// trim all entries
	texts = texts.map((text) => text.trim()).filter((text) => text !== '' || text !== undefined);
	const formatter = new Intl.ListFormat('th-TH', {
		style: 'long',
		type: 'conjunction'
	});
	return formatter.format(texts);
}

/**
 * Format date into localized string.
 * @param date date to format
 * @param options Intl.DateTimeFormatOptions to format date
 * @returns localized date string
 * @example new Date() -> วันนี้
 * @example new Date('2021-01-01') -> 1 มกราคม 2021
 */
export function dateFormatter(date: Date | undefined, options?: Intl.DateTimeFormatOptions) {
	if (typeof date === 'undefined') return undefined;
	if (options) {
		return new Intl.DateTimeFormat('th-TH', options).format(date);
	}
	return new Intl.DateTimeFormat('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(date);
}

export function dateTimeFormatter(date: Date | undefined, options?: Intl.DateTimeFormatOptions) {
	if (typeof date === 'undefined') return undefined;
	if (options) {
		return new Intl.DateTimeFormat('th-TH', options).format(date);
	}
	return new Intl.DateTimeFormat('th-TH', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	}).format(date);
}

/**
 * Shorthand for dateFormatter. Format date into localized string.
 * @param date date to format. Must be in ISO 8601 format. {@link https://en.wikipedia.org/wiki/ISO_8601}
 * @param options Intl.DateTimeFormatOptions to format date
 * @returns
 */
export function d(date: string | undefined, options?: Intl.DateTimeFormatOptions) {
	if (date === undefined) return undefined;
	return dateFormatter(new Date(date ?? ''), options);
}
