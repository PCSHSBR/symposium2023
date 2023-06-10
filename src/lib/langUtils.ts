export const sentencesMap = new Map([
	['fetch failed', 'ไม่สามารถเข้าถึงเซิร์ฟเวอร์ได้ โปรดตรวจสอบการเชื่อมต่ออินเตอร์เน็ต']
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
	const formatter = new Intl.ListFormat('th-TH', {
		style: 'long',
		type: 'conjunction'
	});
	return formatter.format(texts);
}
