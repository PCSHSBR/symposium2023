import DOMPurify from 'isomorphic-dompurify';
import crypto from 'crypto';

export function isPropertyExist(obj: any, prop: string[]) {
	if (!obj) return false;
	return prop.every((p) => obj.hasOwnProperty(p));
}

export function sanitizeHTML(html: string) {
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: ['i', 'b']
	});
}

// Implements Brad Hill's Double HMAC pattern from
// https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2011/february/double-hmac-verification/.
// The approach is similar to the node's native implementation of timing safe buffer comparison that will be available on v6+.
// https://github.com/nodejs/node/issues/3043
// https://github.com/nodejs/node/pull/3073

function bufferEqual(a, b) {
	if (a.length !== b.length) {
		return false;
	}
	// `crypto.timingSafeEqual` was introduced in Node v6.6.0
	// <https://github.com/jshttp/basic-auth/issues/39>
	if (crypto.timingSafeEqual) {
		return crypto.timingSafeEqual(a, b);
	}
	for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

export function timeSafeCompare(a, b) {
	let sa = String(a);
	let sb = String(b);
	let key = crypto.pseudoRandomBytes(32);
	let ah = crypto.createHmac('sha256', key).update(sa).digest();
	let bh = crypto.createHmac('sha256', key).update(sb).digest();

	return bufferEqual(ah, bh) && a === b;
}
