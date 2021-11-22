import * as http from 'http';
import { tmp } from './file';

export interface Result {
    url: string;
    data: string;
}

export interface BulkOptions {
    urls: string[];
    bulkLimit?: number;
    cache?: Cache;
}

export interface Cache {
    (url: string, getData: () => Promise<string>): Promise<string>;
}

export const get = (url: string): Promise<Result> => {
    console.log(`getting ${url}`);

    return new Promise((resolve) => {
        http.get(url, (response) => {
            let data = '';

            response.on('data', (c) => {
                data += c;
            });

            response.on('end', () => {
                console.log(`finished ${url}`);

                resolve({
                    url: url,
                    data: data,
                });
            });
        });
    });
};

export const bulkGet = (options: BulkOptions): Promise<Result[]> => {
    const urls = options.urls;
    const bulkLimit = options.bulkLimit || 10;
    const getter = createGetter(options);

    return new Promise((resolve) => {
        const promises = [];

        const request = async () => {
            if (urls.length > 0) {
                const url = urls.shift();

                return [await getter(url), ...(await request())];
            }

            return [];
        };

        for (let i = 0; i < bulkLimit; i++) {
            promises.push(request());
        }

        return Promise.all(promises).then((bulkResults: Result[][]) => {
            resolve(
                bulkResults.reduce((prev, cur) => {
                    return [...prev, ...cur];
                })
            );
        });
    });
};

const createGetter = (options: BulkOptions): typeof get => {
    if (options.cache) {
        return async (url: string): Promise<Result> => {
            return {
                url: url,
                data: await options.cache(url, async () => (await get(url)).data),
            };
        };
    } else {
        return get;
    }
};

export const fileCache: Cache = async (url, getData) => {
    return tmp(`bulkget-${url}`, getData);
};
