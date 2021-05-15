import { Namespace, Structure } from '../types';

export const insertStructureIntoNamespace = (structure: Structure, rootNamespace: Namespace): Namespace => {
    const insert = (namespaceParts: string[], contextNamespace: Namespace, structureToInsert: Structure): Namespace => {
        if (!namespaceParts || namespaceParts.length === 0) {
            return addStructureToNamespace(contextNamespace, structure);
        }

        const namespacePart = namespaceParts[0];
        const nextNamespaceParts = namespaceParts.slice(1);
        const nextContextNamespace = contextNamespace.namespaces.find((n) => n.name === namespacePart);

        if (nextContextNamespace) {
            return {
                ...contextNamespace,
                namespaces: contextNamespace.namespaces.map((n) =>
                    n.name === namespacePart ? insert(nextNamespaceParts, n, structure) : n
                ),
            };
        }

        const newNamespace: Namespace = {
            name: namespacePart,
            structures: [],
            parent: contextNamespace,
            namespaces: [],
        };

        return { ...contextNamespace, namespaces: [...contextNamespace.namespaces, insert(nextNamespaceParts, newNamespace, structure)] };
    };

    return insert(structure?.namespace?.split('.'), rootNamespace, structure);
};

const addStructureToNamespace = (namespace: Namespace, structure: Structure): Namespace => {
    if (namespace.structures.find((s) => s.type === structure.type && s.name === structure.name)) {
        return namespace;
    }

    return { ...namespace, structures: [...namespace.structures, structure] };
};
