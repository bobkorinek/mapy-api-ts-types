import { JSDOM } from 'jsdom';
import { bulkGet, fileCache, get, Result } from '../util/http';
import { mapIterator } from '../util/iterator';
import { SMAP_DOC_URL } from './vars';

export interface HTMLPage {
    body: Document;
    url: string;
}

export const loadPages = async (): Promise<HTMLPage[]> => {
    const results = await bulkGet({
        urls: await getUrls(),
        cache: fileCache,
    });

    return results.map(convertPage);
};

const convertPage = (result: Result): HTMLPage => {
    return {
        body: new JSDOM(result.data).window.document,
        url: result.url,
    };
};

const getUrls = async (indexUrl: string = SMAP_DOC_URL + '/SMap.html'): Promise<Array<string>> => {
    const prefix = SMAP_DOC_URL + '/';
    const doc = convertPage(await get(indexUrl)).body;

    return mapIterator(doc.querySelectorAll<HTMLAnchorElement>('#index a').values(), (linkElement) => prefix + linkElement.href);
};
