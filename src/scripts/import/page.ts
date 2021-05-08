import { Page } from '../types';
import { parseMethodSection, getMethodsSections, getConstructorSection } from './method-section';
import { getPropertiesSections, parsePropertySections } from './property-section';

export const importPage = (doc: Document, url: string): Page => {
    const headerName = getHeader(doc).textContent;

    return {
        name: parseHeaderToClassName(headerName),
        events: parseListOfEvents(getListOfEvents(doc)),
        propertySections: parsePropertySections(getPropertiesSections(doc)),
        constructorSection: parseMethodSection(getConstructorSection(doc)),
        methodSections: getMethodsSections(doc).map(parseMethodSection),
    };
};

//#region Parsers

const parseHeaderToClassName = (headerContent: string) => headerContent.trim().replace(/Třída /, '');

const parseListOfEvents = (eventsElement: HTMLUListElement) => {
    if (!eventsElement) {
        return [];
    }

    const parseEvent = (itemEventElement: Element): Page.Event[] => {
        const nameElement = itemEventElement.firstElementChild;
        const description = itemEventElement.lastChild;

        const events: Page.Event[] = [
            {
                name: nameElement.textContent.trim(),
                description: description.textContent.trim().replace(/^\s*-\s*/, ''),
            },
        ];

        if (itemEventElement?.nextElementSibling?.tagName.toLowerCase() === 'li') {
            return [...events, ...parseEvent(itemEventElement.nextElementSibling)];
        } else {
            return events;
        }
    };

    return parseEvent(eventsElement.firstElementChild);
};

//#endregion Parsers

//#region Selectors

const getHeader = (doc: Document) => doc.getElementsByTagName('h1')[0];

const getListOfEvents = (doc: Document) => {
    const descriptionElement = doc.querySelector('p.description');

    if (descriptionElement?.nextElementSibling?.tagName.toLowerCase() === 'ul') {
        return descriptionElement.nextElementSibling as HTMLUListElement;
    } else {
        return null;
    }
};

//#endregion Selectors
