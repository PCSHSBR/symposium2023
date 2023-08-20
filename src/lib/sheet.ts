import { csv } from 'd3-fetch';

interface Entry {
	name: string;
	description: string;
	link: string;
	isDownload: boolean;
}

const PUBLIC_SHEET_ID = '1CSKItilWJM6vgqFzg1zxCAL2EcFdvmas3ANCaQZ-z-Y';
const DOWNLOADABLE_DOCS_SHEET_NAME = 'downloadable-documents';

const locationUrl = encodeURI(
	`https://docs.google.com/spreadsheets/d/${PUBLIC_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${DOWNLOADABLE_DOCS_SHEET_NAME}`
);

export const fetchDownloadable = async () => {
	return csv(
		locationUrl,
		(d) =>
			({
				name: d['name'],
				description: d['description'],
				link: d['link'],
				isDownload: d['isDownload'] === 'TRUE'
			} as Entry)
	);
};

interface Projects {
	internal_code: string;
	code: string;
	field: string;
	type: string;
	title_th: string;
	title_en: string;
	province: string;
	members: string;
	teachers: string;
	special_advisors: string;
}

export const fetchProjects = async () => {
	return csv(
		encodeURI(
			`https://docs.google.com/spreadsheets/d/1CSKItilWJM6vgqFzg1zxCAL2EcFdvmas3ANCaQZ-z-Y/gviz/tq?tqx=out:csv&sheet=projects`
		),
		(d) =>
			({
				internal_code: d['internal_code'],
				code: d['code'],
				field: d['field'],
				type: d['type'],
				title_th: d['title_th'],
				title_en: d['title_en'],
				province: d['province'],
				members: d['members'],
				teachers: d['teachers'],
				special_advisors: d['special_advisors']
			} as Projects)
	);
};
