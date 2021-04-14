import { Class } from "../types";

const parentClass = 'SMap.Control.Pointer';

export const addControlParentClassToPointerClass = (c: Class): Class => {
    if (c.name === 'Pointer' && c.namespace === 'SMap.Control') {
        return { ...c, extends: parentClass };
    }

    return c;
}
