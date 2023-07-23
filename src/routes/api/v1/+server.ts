import { error, type ServerLoad } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { DB_ACCESS_API_KEY } from '$env/static/private';

BigInt.prototype.toJSON = function () {
	return this.toString();
};

export const GET: ServerLoad = async ({ url }) => {
	if (url.searchParams.get('key') !== DB_ACCESS_API_KEY) {
		throw error(401, 'Unauthorized');
	}
	let query = url.searchParams.get('query');
	if (!query) {
		throw error(400, 'Missing query');
	}
	let result = await prisma.$queryRawUnsafe(query);
	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' }
	});
};
