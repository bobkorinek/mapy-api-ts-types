import { ExportData } from '../export';
import { getNamespaceDepth } from '../helpers';
import { Namespace } from '../types';
import { createStructures } from './structure';

export const exportNamespace = (ns: Namespace, exportData: ExportData) => {
    exportData(ns.name ? (ns.depth !== 0 ? '' : 'declare ') + 'namespace ' + ns.name + ' {\n' : '');
    exportData(createStructures(ns.structures, ns));

    ns.namespaces.forEach((childNs) => {
        exportNamespace(childNs, exportData);
    });

    exportData(ns.name ? '}' : '' + '\n');
};
