import { Namespace } from './types';

export const getNamespaceDepth = (ns: Namespace): number => (ns?.name?.match(/\./) || []).length;
