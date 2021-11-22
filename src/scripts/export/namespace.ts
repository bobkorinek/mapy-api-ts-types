import { ExportData } from '../export';
import { getNamespaceDepth } from '../helpers';
import { Namespace } from '../types';
import { createStructures } from './structure';

export const exportNamespace = (ns: Namespace, exportData: ExportData) => {
    exportData(ns.name ? (ns.depth !== 0 ? '' : 'declare ') + 'namespace ' + ns.name + ' {\n' : '');

    ns.namespaces.forEach((childNs) => {
        exportNamespace(childNs, exportData);
    });

    // createStructures(ns.structures, ns) +
    /*(ns.interfaces.length > 0 ? '\n\n' + createStructures(ns.interfaces, ns) : '') +
        (ns.classes.length !== 0 && ns.namespaces.length !== 0 ? '\n\n' : '') +*/
    exportData(ns.name ? '}' : '' + '\n');
};
