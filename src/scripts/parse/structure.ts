import { Interface, Namespace, Page, Class, Structure } from '../types';
import { insertStructureIntoNamespace } from './namespace';

export const parsePages = (pages: Page[], rootNamespace: Namespace, pageIndex: number = 0): Namespace => {
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

const parsePage = (page: Page, rootNamespace: Namespace): Namespace => {
    const structure = pageToStructure(page);

    return insertStructureIntoNamespace(structure, rootNamespace);
};

const pageToStructure = (page: Page): Structure => {};

const getStructure = (): Structure => {};

const namespaceFromPageName = (pageName: string) => {
    const namespace = pageName.match(/^.+(?=\.)/);

    return namespace ? namespace.toString() : null;
};
