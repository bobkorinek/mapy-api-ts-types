import { Class } from "../types";
import { extractMethods } from "./method";
import { parseProperties } from "./property";

export const parseClass = (doc: Document): Class => {
    const methods = extractMethods(doc);
    const headerElement = doc.querySelector('#content>h1');
    const parsedName = parseName(headerElement?.textContent.trim().replace('Třída ', ''));

    return {
        name: parsedName.class,
        namespace: parsedName.ns,
        methods: methods,
        parent: getParentClass(doc),
        properties: parseProperties(doc)
    };
}

export const parseName = (className: string) => {
    const parts = className.match(/(?:(?<ns>.+?)\.)?(?<class>[^.]+)$/);

    return {
        class: parts.groups['class'],
        ns: parts.groups['ns'] ? parts.groups['ns'] : null
    }
}

export const getParentClass = (doc: Document) => {
    const parentLinkElement = doc.querySelector('#content>p.description>a');

    if (parentLinkElement) {
        return parentLinkElement.textContent.trim();
    }

    return null;
}