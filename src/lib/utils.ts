import DOMPurify from 'isomorphic-dompurify';

export function isPropertyExist(obj: any, prop: string[]) {
	if (!obj) return false;
	return prop.every((p) => obj.hasOwnProperty(p));
}

export function sanitizeHTML(html: string) {
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: ['i', 'b']
	});
}
