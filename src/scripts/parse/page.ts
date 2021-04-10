import * as http from 'http';
import { JSDOM } from 'jsdom';
import { Class, Interface } from "../types";
import { parseStructure } from './structure';

export const parse = (): Promise<Class[]> => {
    return new Promise<Class[]>((resolve) => {
        const bulkLimit = 10;
        const classes: Class[] = [];

        getUrls().then((urls) => {
            const loadClassBulk = (bulkIndex: number = 0) => {
                const fromIndex = bulkIndex * bulkLimit;
                const toIndex = fromIndex + bulkLimit;
                const promises = [];

                urls.slice(fromIndex, toIndex).forEach((url) => promises.push(parsePage(url)));

                Promise.all(promises).then(loadedClasses => {
                    loadedClasses.forEach(loadedClass => classes.push(loadedClass));

                    if (toIndex < urls.length) {
                        loadClassBulk(++bulkIndex);
                    } else {
                        resolve(classes);
                    }
                });
            }

            loadClassBulk();
        });
    });
}

export const parsePage = async (url: string): Promise<Class | Interface> => {
    return loadPage(url)
        .then((doc) => parseStructure(doc));
}

const loadPage = (url: string): Promise<Document> => {
    return new Promise((resolve) => {
        http.get(url, (response) => {
            let data = '';

            response.on('data', (c) => {
                data += c;
            });

            response.on('end', () => resolve(new JSDOM(data).window.document));
        })
    });
}

const getUrls = async (indexUrl: string = 'http://api.mapy.cz/doc/SMap.html'): Promise<Array<string>> => {
    const prefix = 'http://api.mapy.cz/doc/';
    const urls = [];

    const doc = await loadPage(indexUrl);

    doc.querySelectorAll<HTMLAnchorElement>('#index a').forEach(linkElement => urls.push(prefix + linkElement.href));

    return urls;
}
