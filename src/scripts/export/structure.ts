import { Class, Interface, Namespace } from '../types';
import { createComment } from './comment';
import { createMethods } from './method';
import { createProperties } from './property';

export const createStructures = (ss: (Class | Interface)[], ns: Namespace) => ss.map((s) => createStructure(s, ns)).join('\n\n');

export const createStructure = (s: Class | Interface, ns: Namespace) =>
    createComment(s) +
    (ns.name ? '' : 'declare ') +
    s.type +
    ' ' +
    s.name +
    ' ' +
    (s.type === 'class' ? createClass(s, ns) : createInterface(s, ns));

const createClass = (c: Class, ns: Namespace) =>
    (c.parentClass ? ' extends ' + c.parentClass : '') +
    (c?.interfaces.length > 0 ? ' implements ' + c.interfaces.join(', ') : '') +
    ' {\n' +
    createProperties(c, ns) +
    createMethods(c) +
    '}';

const createInterface = (i: Interface, ns: Namespace) =>
    (i.interfaces.length > 0 ? ' extends ' + i.interfaces.join(', ') : '') + ' {\n' + createMethods(i) + '}';
