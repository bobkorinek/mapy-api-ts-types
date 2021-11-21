import { Interface, Namespace, Page, Class, Structure } from '../types';
import { parseMethodSection } from './method';
import { insertStructureIntoNamespace } from './namespace';

const defaultRootNamespace: Namespace = {
    namespaces: [],
    structures: [],
};

export const parsePages = (pages: Page[], rootNamespace: Namespace = defaultRootNamespace): Result => {
    const parse = (index: number = 0): Namespace => {
        if (!pages[index]) {
            return rootNamespace;
        }

        return parsePage(pages[index], parse(index + 1), pages);
    };

    return { namespace: parse() };
};

const parsePage = (page: Page, rootNamespace: Namespace, allPages: Page[]): Namespace => {
    const getParentStructures = (ns: Namespace) =>
        page.extends ? page.extends.map((pp) => getStructure(pp, ns)).filter((p) => p !== undefined) : [];

    const insertWithParentStructures = (
        enhancedNamespace: Namespace,
        parentStructureRemaining: number = page.extends ? page.extends.length : 0
    ) => {
        if (parentStructureRemaining === 0) {
            return insertStructureIntoNamespace(pageToStructure(page, getParentStructures(enhancedNamespace)), enhancedNamespace);
        } else {
            const parentStructureName = page.extends[parentStructureRemaining - 1];
            const parentPage = allPages.find((p) => p.name === parentStructureName);

            return insertWithParentStructures(
                parentPage ? parsePage(parentPage, enhancedNamespace, allPages) : enhancedNamespace,
                parentStructureRemaining - 1
            );
        }
    };

    return insertWithParentStructures(rootNamespace);
};

const pageToStructure = (page: Page, extendingStructures: Structure[] = []): Structure => {
    const parsedName = parsePageName(page.name);
    const interfaces = extendingStructures.filter((s) => s.type === 'interface') as Interface[];
    const parentClass = extendingStructures.find((s) => s.type === 'class') as Class;

    const parse = (): Structure => {
        if (isInterface(parsedName.name)) {
            return {
                type: 'interface',
                name: parsedName.name,
                methods: page.methodSections.map(parseMethodSection),
                comment: page.description,
                interfaces: interfaces,
            };
        } else {
            return {
                type: 'class',
                name: parsedName.name,
                interfaces: interfaces,
                methods: page.methodSections.map(parseMethodSection),
                events: [],
                properties: [],
                parentClass: parentClass,
                comment: page.description,
                url: page.url,
            };
        }
    };

    return parsedName.namespace ? { ...parse(), namespace: parsedName.namespace } : parse();
};

const getStructure = (fullName: string, namespace: Namespace) => {
    const findInNamespace = (nameParts: string[], contextNamespace: Namespace): Structure | undefined => {
        if (nameParts.length > 1) {
            const nextNamespace = contextNamespace.namespaces.find((ns) => ns.name === nameParts[0]);

            return nextNamespace === undefined ? undefined : findInNamespace(nameParts.slice(1), namespace);
        } else {
            return contextNamespace.structures.find((s) => s.name === nameParts[0]);
        }
    };

    return findInNamespace(fullName.split('.'), namespace);
};

const isInterface = (structureName: string) => structureName.match(/^I[A-Z].+/);

const parsePageName = (pageName: string): PageName => {
    const info = pageName.match(/^(?:(?<ns>.+)\.)?(?<name>.+)$/);

    const parsedName: PageName = {
        name: info.groups['name'],
    };

    return info.groups['ns'] ? { ...parsedName, namespace: info.groups['ns'] } : parsedName;
};

interface PageName {
    namespace?: string;
    name: string;
}

interface Result {
    namespace: Namespace;
    // errors;
}
