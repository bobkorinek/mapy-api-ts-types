import { addControlParentClassToPointerClass } from "./exceptions/pointer-parent";
import { Class, Namespace } from "./types";

export const resolveExceptions = (namespace: Namespace): Namespace => {
    return {
        ...namespace,
        classes: namespace.classes.map(resolveClassExceptions),
        namespaces: namespace.namespaces.map(resolveExceptions)
    };
}

const resolveClassExceptions = (c: Class) => addControlParentClassToPointerClass(c);
