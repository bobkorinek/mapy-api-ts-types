import { createHash } from 'crypto';
import * as fs from 'fs';
import { resolve as resolvePath } from 'path';

export const tmp = async (name: string, getData: () => Promise<string>): Promise<string> => {
    const tmpDir = path('tmp');
    const tmpFile = path('tmp/' + createHash('md5').update(name).digest('hex'));

    const saveFile = async () => {
        return new Promise((resolve) => {
            getData().then((data) => {
                fs.writeFile(tmpFile, data, () => {
                    resolve(data);
                });
            });
        });
    };

    const syncTmpFile = () => {
        return new Promise<string>((resolve) => {
            if (!fs.existsSync(tmpDir)) {
                fs.mkdir(tmpDir, () => {
                    saveFile().then(resolve);
                });
            } else if (!fs.existsSync(tmpFile)) {
                saveFile().then(resolve);
            } else {
                resolve(fs.readFileSync(tmpFile).toString());
            }
        });
    };

    return syncTmpFile();
};

export const path = (file?: string): string => resolvePath(__dirname + '/../../' + (file || ''));
