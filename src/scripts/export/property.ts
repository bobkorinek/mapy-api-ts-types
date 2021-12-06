import { createComment } from './comment';
import { Class, Namespace } from '../types';

export const createProperties = (c: Class, ns: Namespace) =>
    c.properties.length === 0
        ? ''
        : filterDupliciteStaticProperties(c, ns)
              .map((p) => createComment(p) + propertyAccessMap[p.access] + p.name + ';\n')
              .join('\n') + '\n';

const propertyAccessMap = { normal: '', static: 'static ', constant: 'static readonly ' };

const filterDupliciteStaticProperties = (c: Class, ns: Namespace) =>
    c.properties.filter((p) => {
        const sameNamespace = ns.namespaces.find((cns) => cns.name === c.name);

        return (
            !sameNamespace ||
            (!sameNamespace.structures.find((cc) => cc.name === p.name) && !sameNamespace.namespaces.find((cns) => cns.name === p.name))
        );
    });
