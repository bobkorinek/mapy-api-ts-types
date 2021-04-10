import { Class, Interface } from "../types";
import { parseTypes } from "./argument";
import { extractMethods } from "./method";
import { parseProperties } from "./property";

export const parseStructure = (doc: Document): Class | Interface => {
    const methods = extractMethods(doc);
    const headerElement = doc.querySelector('#content>h1');
    const parsedName = parseName(headerElement?.textContent.trim().replace('Třída ', ''));
    const parents = getParents(doc);

    const data = {
        name: parsedName.name,
        type: isInterface(parsedName.name) ? 'interface' : 'class',
        namespace: parsedName.ns,
        methods: methods,
    };

    if (data.type === 'class') {
        return {
            ...data,
            extends: parents.parent,
            implements: parents.interfaces,
            properties: parseProperties(doc)

        } as Class;
    } else {
        return {
            ...data,
            extends: parents.interfaces,
        } as Interface;
    }
}

export const parseName = (className: string) => {
    const parts = className.match(/(?:(?<ns>.+?)\.)?(?<class>[^.]+)$/);

    return {
        name: parts.groups['class'],
        ns: parts.groups['ns'] ? parts.groups['ns'] : null
    }
}

export const getParents = (doc: Document) => {
    const parentLinkElement = doc.querySelector('#content>p.description>a');
    const result = {
        parent: null,
        interfaces: []
    }

    if (parentLinkElement) {
        parentLinkElement
            .textContent
            .trim()
            .split(', ')
            .map(t => parseTypes(t.trim()) as string)
            .forEach(o => isInterface(o) ? result.interfaces.push(o) : (result.parent = o));
    }

    return result;
}

export const isInterface = (name: string) => Boolean(name.match(/(?:^|\.)I[A-Z][^.]*$/));