import { Class, Method, Namespace } from "./types"
import * as fs from 'fs';

export const exportClasses = (classes: Class[], filePath: string = __dirname + '/out.ts') => {
    const root: Namespace = {
        namespaces: [],
        classes: []
    };

    classes.forEach(c => assignToNamespace(c, root, c.namespace ? c.namespace.split('.') : []));

    const file = fs.createWriteStream(filePath);

    file.write(createNamesapce(root));

    file.close();
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
                classes: [],
                namespaces: []
            };

            ns.namespaces.push(newNs);

            assignToNamespace(c, newNs, nsParts)
        }
    }
}

const createClass = (c: Class) => 'class ' + c.name + (c.parent ? ' extends ' + c.parent : '') + ' {\n\n' + createMethods(c) + '}\n';

const createMethods = (c: Class) => c.methods.map(m => (m.comment ? '/**\n* ' + m.comment + '\n*/\n' : '') + (m.static ? 'static ' : '') + m.name + '(' + createArguments(m) + '): ' + (typeof m.type === 'string' ? m.type : m.type.join(' | ')) + ';\n').join('\n');

const createArguments = (m: Method) => m.arguments.map(a => a.name + ':' + (typeof a.type === 'string' ? a.type : a.type.join(' | '))).join(', ');

const createNamesapce = (ns: Namespace) => (ns.name ? 'namespace ' + ns.name : 'export { }\n\ndeclare global') + ' {\n' + ns.classes.map(createClass).join('\n') + ns.namespaces.map(createNamesapce).join('\n') + '}\n';
