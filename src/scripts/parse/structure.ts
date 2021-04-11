import { Class, Event, Interface } from "../types";
import { parseTypes } from "./argument";
import { parseSentence } from "./comment";
import { extractMethods } from "./method";
import { parseProperties } from "./property";

export const parseStructure = (doc: Document, url?: string): Class | Interface => {
    const methods = extractMethods(doc, url);
    const headerElement = doc.querySelector('#content>h1');
    const parsedName = parseName(headerElement?.textContent.trim().replace('Třída ', ''));
    const info = parseInfo(doc);

    const data = {
        name: parsedName.name,
        type: isInterface(parsedName.name) ? 'interface' : 'class',
        namespace: parsedName.ns,
        methods: methods,
        url: url,
        comment: info.comment
    };

    if (data.type === 'class') {
        return {
            ...data,
            extends: info.parent,
            events: info.events,
            implements: info.interfaces,
            properties: parseProperties(doc, url)
        } as Class;
    } else {
        return {
            ...data,
            extends: info.interfaces,
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

export const parseInfo = (doc: Document) => {
    const descriptionElement = doc.querySelector('#content>p.description');
    const parentLinkElement = descriptionElement?.querySelector(':scope>a');
    const result = {
        parent: null,
        interfaces: [],
        events: [],
        comment: null
    }
    if (descriptionElement) {
        const commentMatch = descriptionElement.textContent.trim().match(/(?:(?!Rozšiřuje|Posílá tyto signály:).)*/s);

        if (commentMatch) {
            result.comment = parseSentence(commentMatch.toString());
        }

        if (parentLinkElement) {
            parentLinkElement
                .textContent
                .trim()
                .split(', ')
                .map(t => parseTypes(t.trim()) as string)
                .forEach(o => isInterface(o) ? result.interfaces.push(o) : (result.parent = o));
        }

        if (descriptionElement.nextElementSibling?.tagName === 'UL') {
            result.events = parseEvents(descriptionElement.nextElementSibling as HTMLUListElement);
        }
    }

    return result;
}

const parseEvents = (eventsElement: HTMLUListElement) => {
    const events: Event[] = [];

    for (const eventElement of eventsElement.children) {
        const match = eventElement.textContent.trim().match('^(?<name>[^ ]+)(?: - (?<comment>.*))?');

        if (match) {
            events.push({
                name: match.groups['name'],
                comment: match.groups['comment'] ? parseSentence(match.groups['comment']) : null
            })
        }
    }

    return events;
}

export const isInterface = (name: string) => Boolean(name.match(/(?:^|\.)I[A-Z][^.]*$/));