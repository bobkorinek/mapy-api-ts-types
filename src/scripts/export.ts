import * as fs from 'fs';
import * as path from 'path';

export interface ExportData {
    (data: string): ExportData;
}

export const createFile = (
    callback: (write: ExportData) => any,
    filePath: string,
    JAKFilePath: string = path.dirname(__dirname) + '/types/jak.d.ts'
): string => {
    fs.copyFile(JAKFilePath, filePath, (e) => {
        if (!e) {
            const fileStream = fs.createWriteStream(filePath, {
                flags: 'a',
            });
            const write: ExportData = (data: string) => {
                fileStream.write(data);
                return write;
            };

            fileStream.on('open', () => {
                write('\n');

                callback(write);
            });
        }
    });

    return filePath;
};
