import { JSDOM } from 'jsdom';
import { mapNodeList } from '../util/dom';
import { bulkGet, get, Result } from '../util/http';
import { SMAP_DOC_URL } from './vars';

export interface HTMLPage {
    body: Document;
    url: string;
}

export const loadPages = async (): Promise<HTMLPage[]> => {
    const results = await bulkGet(await getUrls());

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

    return mapNodeList(doc.querySelectorAll<HTMLAnchorElement>('#index a'), (linkElement) => prefix + linkElement.href);
};
