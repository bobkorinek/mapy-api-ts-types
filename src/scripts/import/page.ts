import { Page } from '../types';

export const importPage = (doc: Document): Page => {
    const headerName = getHeader(doc).textContent;

    return {
        name: parseHeaderToClassName(headerName),
        events: parseListOfEvents(getListOfEvents(doc)),
        propertySections: parsePropertySections(getPropertiesSections(doc)),
        constructorSection: parseMethodSection(getConstructorSection(doc)),
        methodSections: [],
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

const parsePropertySections = (propertiesSections: SectionElements[]): Page.PropertySection[] => {
    if (propertiesSections.length === 0) {
        return [];
    }

    const parse = (i: number = 0): Page.PropertySection[] => {
        const elements = propertiesSections[i];
        const visibility = elements.main.firstChild.textContent.trim().match(/^<(?<v>.+)>$/);

        return [
            {
                name: elements.main.lastElementChild.textContent.trim(),
                visibility: visibility.groups['v'] ? visibility.groups['v'] : null,
            },
            ...(propertiesSections[i + 1] ? parse(i + 1) : []),
        ];
    };

    return parse();
};

const parseMethodSection = (methodSection: SectionElements): Page.MethodSection => {
    if (!methodSection) {
        return null;
    }

    return {
        name: methodSection.main.firstElementChild.textContent.trim(),
        argumentSections: [],
        description: '',
        returnValueSection: null,
    };
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

const getConstructorSection = (doc: Document): SectionElements => getSections(doc, 'Konstruktor - detail')[0];

const getPropertiesSections = (doc: Document): SectionElements[] => getSections(doc, 'Vlastnosti - detailně');

const getSectionsHeader = (doc: Document, header: string) => {
    for (const titleElement of doc.querySelectorAll('div.sectionTitle')) {
        if (titleElement.textContent.trim() === header) {
            return titleElement;
        }
    }

    return null;
};

const getSections = (doc: Document, header: string): SectionElements[] => {
    const sectionsHeader = getSectionsHeader(doc, header);

    if (!sectionsHeader) {
        return [];
    }

    const addSectionElement = (sectionElements: SectionElements, e: Element, i: number): SectionElements => {
        if (e.classList.contains('fixedFont')) {
            return { ...sectionElements, main: e };
        } else if (e.classList.contains('description')) {
            return { ...sectionElements, description: e };
        } else if (e.classList.contains('detailList')) {
            return { ...sectionElements, detailLists: [...sectionElements.detailLists, e] };
        } else {
            return sectionElements;
        }
    };

    const emptySection = {
        main: null,
        description: null,
        detailLists: [],
    };

    const getNext = (e: Element, prev = emptySection, i: number = 0): SectionElements[] => {
        const sectionElements = addSectionElement(prev, e, i);

        if (e.nextElementSibling) {
            const nextElement = e.nextElementSibling;

            if (nextElement.tagName.toLowerCase() !== 'hr' && !nextElement.classList.contains('sectionTitle')) {
                return getNext(e.nextElementSibling, sectionElements, i + 1);
            } else if (
                nextElement.nextElementSibling.tagName.toLowerCase() === 'a' &&
                nextElement.nextElementSibling.hasAttribute('name')
            ) {
                return [...getNext(nextElement.nextElementSibling), sectionElements];
            }
        }

        return [sectionElements];
    };

    return getNext(sectionsHeader.nextElementSibling).reverse();
};

//#endregion Selectors

//#region Types

interface SectionElements {
    main: Element;
    description: Element;
    detailLists: Element[];
}

//#endregion Types
