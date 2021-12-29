import { Interface, Namespace, Page, Class, Structure, StructureRepair, Method } from '../types';
import { parseMethodSection } from './method';
import { insertStructureIntoNamespace } from './namespace';
import { parseProperties } from './property';
import { repairs } from './repairs';

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
    const parentStructures = groupParentStructures(page.extends);

    const parse = (): Structure => {
        const addConstructor = (methodsWithoutConstructor: Method[]) => {
            if (page?.constructorSection) {
                return [{ ...parseMethodSection(page.constructorSection), name: 'constructor' } as Method, ...methodsWithoutConstructor];
            }

            return methodsWithoutConstructor;
        };

        const methods = addConstructor(page.methodSections.map(parseMethodSection));

        const createStructure = () => {
            if (isInterface(parsedName.name)) {
                return {
                    type: 'interface',
                    name: parsedName.name,
                    methods: methods,
                    comment: page.description,
                    interfaces: parentStructures.interfaces,
                } as Interface;
            } else {
                return {
                    type: 'class',
                    name: parsedName.name,
                    interfaces: parentStructures.interfaces,
                    methods: methods,
                    events: [],
                    properties: parseProperties(page.propertySections),
                    parentClass: parentStructures.class,
                    comment: page.description,
                    url: page.url,
                } as Class;
            }
        };

        return repair(createStructure());
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

const isInterface = (structureName: string) => structureName.match(/I[A-Z].+$/);

const parsePageName = (pageName: string): PageName => {
    const info = pageName.match(/^(?:(?<ns>.+)\.)?(?<name>.+)$/);

    const parsedName: PageName = {
        name: info.groups['name'],
    };

    return info.groups['ns'] ? { ...parsedName, namespace: info.groups['ns'] } : parsedName;
};

const repair = (structure: Structure) => {
    return repairs.reduce(
        (repairedStructure: Structure, structureRepair: StructureRepair) => structureRepair.tryRepair(repairedStructure),
        structure
    );
};

const groupParentStructures = (parents: string[]): GroupedParentStructures => {
    const emptyGroupedStructures: GroupedParentStructures = {
        interfaces: [] as string[],
        class: undefined as string,
    };

    if (!parents || parents.length === 0) {
        return emptyGroupedStructures;
    }

    return parents.reduce((groupedStructures, structureName) => {
        if (isInterface(structureName)) {
            return { ...groupedStructures, interfaces: [...groupedStructures.interfaces, structureName] };
        } else {
            return { ...groupedStructures, class: structureName };
        }
    }, emptyGroupedStructures);
};

interface GroupedParentStructures {
    interfaces: string[];
    class?: string;
}

interface PageName {
    namespace?: string;
    name: string;
}

interface Result {
    namespace: Namespace;
    // errors;
}
