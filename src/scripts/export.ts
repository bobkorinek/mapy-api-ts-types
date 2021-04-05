import { Class, Method, Namespace, Property } from "./types"
import * as fs from 'fs';
import * as path from 'path';

export const exportClasses = (classes: Class[], filePath: string) => {
    const root: Namespace = {
        namespaces: [],
        classes: []
    };

    classes.forEach(c => assignToNamespace(c, root, c.namespace ? c.namespace.split('.') : []));

    writeToFile(() => createNamespace(root), filePath)
}

const writeToFile = (data: () => string, filePath: string, JAKFilePath: string = path.dirname(__dirname) + '/types/jak.d.ts') => {
    fs.copyFile(JAKFilePath, filePath, (e) => {
        if (!e) {
            fs.appendFile(filePath, '\n' + data(), () => null);
        }
    });
}

const assignToNamespace = (c: Class, ns: Namespace, nsParts: string[]) => {
    if (nsParts.length === 0) {
        ns.classes.push(c);
    } else {
        const nsPart = nsParts.shift();

        const existingNs = ns.namespaces.find(childNs => childNs.name === nsPart);

        if (existingNs) {
            assignToNamespace(c, existingNs, nsParts);
        } else {
            const newNs = {
                name: nsPart,
                parent: ns,
                classes: [],
                namespaces: []
            };

            ns.namespaces.push(newNs);

            assignToNamespace(c, newNs, nsParts)
        }
    }
}

const filterDupliciteStaticProperties = (c: Class, ns: Namespace) => c.properties.filter(p => {
    const sameNamespace = ns.namespaces.find(cns => cns.name === c.name);

    return !sameNamespace || (!sameNamespace.classes.find(cc => cc.name === p.name) && !sameNamespace.namespaces.find(cns => cns.name === p.name));
})

const propertyAccessMap = { 'normal': '', 'static': 'static ', 'constant': 'static readonly ' };

const createNamespace = (ns: Namespace) => (ns.parent ? (ns.parent.parent ? '' : 'declare ') + 'namespace ' + ns.name + ' {\n' : '') + ns.classes.map((c) => createClass(c, ns)).join('\n') + ns.namespaces.map(createNamespace).join('\n') + (ns.parent ? '}\n\n' : '');

const createClass = (c: Class, ns: Namespace) => (ns.parent ? '' : 'declare ') + 'class ' + c.name + (c.parent ? ' extends ' + c.parent : '') + ' {\n' + createProperties(c, ns) + createMethods(c) + '}\n\n';

const createProperties = (c: Class, ns: Namespace) => c.properties.length === 0 ? '' : (filterDupliciteStaticProperties(c, ns).map(p => propertyAccessMap[p.access] + p.name + ';\n').join('\n') + '\n');

const createMethods = (c: Class) => c.methods.map(m => (m.comment ? '/**\n* ' + m.comment + '\n*/\n' : '') + (m.static ? 'static ' : '') + m.name + '(' + createArguments(m) + '): ' + (typeof m.type === 'string' ? m.type : m.type.join(' | ')) + ';\n').join('\n');

const createArguments = (m: Method) => m.arguments.map(a => a.name + ':' + (typeof a.type === 'string' ? a.type : a.type.join(' | '))).join(', ');

