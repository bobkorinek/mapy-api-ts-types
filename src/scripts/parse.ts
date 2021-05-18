import { Namespace, Page } from './types';
import { parsePages } from './parse/structure';

export const parse = (pages: Page[]): Namespace => {
    const rootNamespace: Namespace = {
        structures: [],
        namespaces: [],
    };

    const result = parsePages(pages, rootNamespace);

    return result.namespace;
};
