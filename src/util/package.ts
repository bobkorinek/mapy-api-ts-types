export interface ProjectPackage {
    version: number | string;
    homepage: string;
}

export const projectPackage: ProjectPackage = require('../../package.json');
