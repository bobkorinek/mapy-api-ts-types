import { Class, Interface, Namespace } from "./types"
import { createNamespace } from "./export/namespace";
import * as fs from 'fs';
import * as path from 'path';
import { resolveExceptions } from "./resolve";

export const exportStructures = (structures: (Class | Interface)[], filePath: string) => {
    const root: Namespace = {
        namespaces: [],
        interfaces: [],
        classes: []
    };

    structures.forEach(s => assignToNamespace(s, root, s.namespace ? s.namespace.split('.') : []));

    const createRootNamespace = () => createNamespace(resolveExceptions(root));

    writeToFile(createRootNamespace, filePath)
}

const writeToFile = (data: () => string, filePath: string, JAKFilePath: string = path.dirname(__dirname) + '/types/jak.d.ts') => {
    fs.copyFile(JAKFilePath, filePath, (e) => {
        if (!e) {
            fs.appendFile(filePath, '\n' + data(), () => null);
        }
    });
}

const assignToNamespace = (s: Class | Interface, ns: Namespace, nsParts: string[]) => {
    if (nsParts.length === 0) {
        if (s.type === 'class') {
            ns.classes.push(s);
        } else {
            ns.interfaces.push(s);
        }
    } else {
        const nsPart = nsParts.shift();

        const existingNs = ns.namespaces.find(childNs => childNs.name === nsPart);

        if (existingNs) {
            assignToNamespace(s, existingNs, nsParts);
        } else {
            const newNs: Namespace = {
                name: nsPart,
                parent: ns,
                classes: [],
                interfaces: [],
                namespaces: []
            };

            ns.namespaces.push(newNs);

            assignToNamespace(s, newNs, nsParts)
        }
    }
}
