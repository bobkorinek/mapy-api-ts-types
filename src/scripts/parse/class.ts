import { Class } from "../types";
import { extractMethods } from "./method";

export const parseClass = (doc: Document): Class => {
    const methods = extractMethods(doc);
    const headerElement = doc.querySelector('#content>h1');
    const parsedName = parseName(headerElement?.textContent.trim().replace('Třída ', ''));

    return {
        name: parsedName.class,
        namespace: parsedName.ns,
        methods: methods,
        properties: []
    };
}

export const parseName = (className: string) => {
    const parts = className.match(/(?:(?<ns>.+?)\.)?(?<class>[^.]+)$/);

    return {
        class: parts.groups['class'],
        ns: parts.groups['ns'] ? parts.groups['ns'] : null
    }
}
