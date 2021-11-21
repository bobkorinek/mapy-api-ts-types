import { Namespace } from '../types';
import { createStructures } from './structure';

export const createNamespace = (ns: Namespace) =>
    (ns.parent ? (ns.parent.parent ? '' : 'declare ') + 'namespace ' + ns.name + ' {\n' : '') +
    createStructures(ns.structures, ns) +
    (ns.interfaces.length > 0 ? '\n\n' + createStructures(ns.interfaces, ns) : '') +
    (ns.classes.length !== 0 && ns.namespaces.length !== 0 ? '\n\n' : '') +
    ns.namespaces.map(createNamespace).join('\n\n') +
    (ns.parent ? '}' : '' + '\n');
