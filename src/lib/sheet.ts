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
