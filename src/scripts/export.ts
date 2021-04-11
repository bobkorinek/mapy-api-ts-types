import { Class, Interface, Method, Namespace, Property, Type } from "./types"
import * as fs from 'fs';
import * as path from 'path';

export const exportStructures = (structures: (Class | Interface)[], filePath: string) => {
    const root: Namespace = {
        namespaces: [],
        interfaces: [],
        classes: []
    };

    structures.forEach(s => assignToNamespace(s, root, s.namespace ? s.namespace.split('.') : []));

    writeToFile(() => createNamespace(root), filePath)
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

const filterDupliciteStaticProperties = (c: Class, ns: Namespace) => c.properties.filter(p => {
    const sameNamespace = ns.namespaces.find(cns => cns.name === c.name);

    return !sameNamespace || (!sameNamespace.classes.find(cc => cc.name === p.name) && !sameNamespace.namespaces.find(cns => cns.name === p.name));
})

const propertyAccessMap = { 'normal': '', 'static': 'static ', 'constant': 'static readonly ' };

const createNamespace = (ns: Namespace) => (ns.parent ? (ns.parent.parent ? '' : 'declare ') + 'namespace ' + ns.name + ' {\n' : '')
    + createStructures(ns.classes, ns)
    + (ns.interfaces.length > 0 ? '\n\n' + createStructures(ns.interfaces, ns) : '')
    + (ns.classes.length !== 0 && ns.namespaces.length !== 0 ? '\n\n' : '')
    + ns.namespaces.map(createNamespace).join('\n\n')
    + (ns.parent ? '}' : '' + '\n');

const createStructures = (ss: (Class | Interface)[], ns: Namespace) => ss.map((s) => createStructure(s, ns)).join('\n\n');

const createStructure = (s: Class | Interface, ns: Namespace) => createComment(s)
    + (ns.parent ? '' : 'declare ')
    + s.type + ' ' + s.name + ' ' + (s.type === 'class' ? createClass(s, ns) : createInterface(s, ns));

const createClass = (c: Class, ns: Namespace) => (c.extends ? ' extends ' + c.extends : '')
    + (c?.implements.length > 0 ? ' implements ' + c.implements.join(', ') : '')
    + ' {\n' + createProperties(c, ns) + createMethods(c) + '}';

const createInterface = (i: Interface, ns: Namespace) => (i.extends.length > 0 ? ' extends ' + i.extends.join(', ') : '')
    + ' {\n' + createMethods(i) + '}';

const createProperties = (c: Class, ns: Namespace) => c.properties.length === 0 ? '' : (
    filterDupliciteStaticProperties(c, ns)
        .map(p => createComment(p) + propertyAccessMap[p.access] + p.name + ';\n')
        .join('\n') + '\n'
);

const createMethods = (s: Class | Interface) => s.methods.map(m => createComment(m)
    + (m.static ? 'static ' : '')
    + m.name + '(' + createArguments(m) + ')'
    + (m.type ? ': ' + createType(m.type) : '') + ';\n').join('\n');

const createComment = (o: Method | Class | Interface | Property) => {
    const commentSections = [];

    if (o.comment) {
        commentSections.push(o.comment);
    }
    if (o.url) {
        commentSections.push('@see ' + o.url);
    }
    if ('arguments' in o) {
        o.arguments.forEach(a => {
            const createName = () => {
                if (a.optional) {
                    if (a.defaultValue) {
                        if (a.type === 'string') {
                            return '[' + a.name + '="' + a.defaultValue + '"]';
                        } else {
                            return '[' + a.name + '=' + a.defaultValue + ']';
                        }
                    } else {
                        return '[' + a.name + ']';
                    }
                } else {
                    return a.name;
                }
            }

            commentSections.push('@param ' + (a.type ? '{' + createType(a.type) + '} ' : '') + createName() + (a.comment ? ' ' + a.comment : ''));
        })

        if (o.type && o.type !== 'void') {
            commentSections.push('@returns ' + ('{' + createType(o.type) + '}') + (o.returnComment ? ' ' + o.returnComment : ''));
        }
    }

    if (commentSections.length === 0) {
        return '';
    }

    return '/**\n * ' + commentSections.join('\n * ') + '\n */\n';
}

const createArguments = (m: Method) => m.arguments.map(a => a.name + (a.optional ? '?' : '') + (a.type ? ': ' + createType(a.type) : '')).join(', ');

const createType = (type: Type | Type[]) => typeof type === 'string' ? type : type.join(' | ');