import { Namespace, Page } from './types';

export const parse = (pages: Page[]): Namespace => {
    const rootNamespace: Namespace = {
        classes: [],
        namespaces: [],
        interfaces: [],
    };

    return parsePage(page, rootNamespace);
};

const parsePages = (pages: Page[], rootNamespace: Namespace, pageIndex: number = 0): Namespace => {
    const page = pages[pageIndex];
    const namespaceName = namespaceFromPageName(page.name);

    const enhancedRootNamespace = rootNamespace;

    const nextIndex = pageIndex + 1;

    if (nextIndex >= pages.length) {
        return rootNamespace;
    } else {
        return parsePages(pages, enhancedRootNamespace, nextIndex);
    }
};

const namespaceFromPageName = (pageName: string) => {
    const namespace = pageName.match(/^.+(?=\.)/);

    return namespace ? namespace : namespace;
};
