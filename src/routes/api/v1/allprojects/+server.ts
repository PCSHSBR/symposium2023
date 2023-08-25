import { error, type ServerLoad } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import { DB_ACCESS_API_KEY } from '$env/static/private';
import { timeSafeCompare } from '$lib/utils';

// @ts-ignore
BigInt.prototype.toJSON = function () {
	return this.toString();
};

export const GET: ServerLoad = async ({ url }) => {
	if (timeSafeCompare(url.searchParams.get('key'), DB_ACCESS_API_KEY)) {
		throw error(401, 'Unauthorized');
	}
	let query = url.searchParams.get('query');
	if (!query) {
		query = `select 
  p.id, 
  p.code, 
  f.name as field, 
  pt.type as presentation_type, 
  p.title_th, 
  p.title_en, 
  s.province, 
  p.student_members, 
  p.teacher_advisor, 
  p.special_advisor,
  p.abstract,
  (
    select
      o.name
    from storage.objects o
    where 
      o.owner = p.team_contact_user_id
      and o.bucket_id = 'teamImages'
      and (o.name like '%.jpeg' or o.name like '%.jpg' or o.name like '%.png')
    group by o.name
    order by max(o.created_at) desc
    limit 1
  ) as image,
  (
    select
      o.name
    from storage.objects o
    where 
      o.owner = p.team_contact_user_id
      and o.bucket_id = 'abstracts'
      and (o.name like '%.docx')
    group by o.name
    order by max(o.created_at) desc
    limit 1
  ) as absDocx,
  (
    select
      o.name
    from storage.objects o
    where 
      o.owner = p.team_contact_user_id
      and o.bucket_id = 'abstracts'
      and (o.name like '%.pdf')
    group by o.name
    order by max(o.created_at) desc
    limit 1
  ) as absPDF,
  (
    select
      o.name
    from storage.objects o
    where 
      o.owner = p.team_contact_user_id
      and o.bucket_id = 'articles'
      and (o.name like '%.docx')
    group by o.name
    order by max(o.created_at) desc
    limit 1
  ) as artDocx,
  (
    select
      o.name
    from storage.objects o
    where 
      o.owner = p.team_contact_user_id
      and o.bucket_id = 'articles'
      and (o.name like '%.pdf')
    group by o.name
    order by max(o.created_at) desc
    limit 1
  ) as artPDF
from projects p
left join field f on p.field = f.id
left join presentation_type pt on p.presentation_type = pt.id
left join schools s on p.school = s.id
order by p.id`;
	}

	let result = await prisma.$queryRawUnsafe(query).catch((e) => {
		return new Response(JSON.stringify({ error: e.message }), {
			headers: { 'content-type': 'application/json' }
		});
	});
	return new Response(JSON.stringify(result), {
		headers: { 'content-type': 'application/json' }
	});
};
