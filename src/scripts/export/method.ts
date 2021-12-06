import { Class, Interface, Method } from '../types';
import { createComment } from './comment';
import { createType } from './variable';

export const createMethods = (s: Class | Interface) =>
    s.methods
        .map(
            (m) =>
                createComment(m) +
                (m.static ? 'static ' : '') +
                m.name +
                '(' +
                createArguments(m) +
                ')' +
                (m.type ? ': ' + createType(m.type) : '') +
                ';\n'
        )
        .join('\n');

const createArguments = (m: Method) =>
    m.arguments.map((a) => a.name + (a.optional ? '?' : '') + (a.type ? ': ' + createType(a.type) : '')).join(', ');
