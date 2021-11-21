import * as http from 'http';

export interface Result {
    url: string;
    data: string;
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

export const bulkGet = (urls: string[], bulkLimit: number = 10): Promise<Result[]> => {
    return new Promise((resolve) => {
        const promises = [];

        const request = async () => {
            if (urls.length > 0) {
                const url = urls.shift();
                return [await get(url), ...(await request())];
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
