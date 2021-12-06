import { Page } from '../types';
import { getSections, SectionElements } from './section';
import { parseType } from './type';
import { parseItemListToArgument } from './argument-section';

export const parseMethodSection = (methodSection: SectionElements, pageUrl?: string): Page.MethodSection => {
    if (!methodSection) {
        return null;
    }

    return {
        name: methodSection.main.querySelector('b').textContent.trim(),
        argumentSections: parseArgumentSections(methodSection),
        description: methodSection?.description?.textContent.trim(),
        returnValueSection: parseReturnTypeSection(methodSection),
        static: isStatic(methodSection),
        url: createMethodUrl(pageUrl, methodSection?.linkElement?.name),
    };
};

const parseArgumentSections = (methodSection: SectionElements): Page.ArgumentSection[] => {
    const argumentListElement = findSpecificListElement(methodSection, 'Parametry');

    if (argumentListElement) {
        const itemElements = argumentListElement.children;

        const isArgumentDescriptionElement = (element: Element) => element?.tagName.toUpperCase() === 'DD';

        const parseDetailListElement = (index: number = 0): Page.ArgumentSection[] => {
            if (index >= itemElements.length) {
                return [];
            }

            const itemElement = itemElements[index];

            if (isListHeading(itemElement)) {
                return parseDetailListElement(index + 1);
            }

            if (isArgumentDescriptionElement(itemElements[index + 1])) {
                return [
                    { description: itemElements[index + 1].textContent.trim(), ...parseItemListToArgument(itemElement) },
                    ...parseDetailListElement(index + 2),
                ];
            } else {
                return [parseItemListToArgument(itemElement), ...parseDetailListElement(index + 1)];
            }
        };

        return parseDetailListElement();
    }

    return [];
};

const parseReturnTypeSection = (methodSection: SectionElements): Page.ReturnValueSection => {
    const returnValueListElement = findSpecificListElement(methodSection, 'Vrací');

    if (!returnValueListElement) {
        return null;
    }

    const returnValueElement = returnValueListElement.lastElementChild;
    const typeElement = returnValueElement.firstElementChild;

    // Checks if node type is text (Node.TEXT_NODE = 3)
    if (returnValueElement.lastChild.nodeType === 3) {
        const description = returnValueElement.lastChild.textContent.trim();

        if (description) {
            return {
                type: parseType(typeElement.textContent),
                description: description,
            };
        }
    }

    return {
        type: parseType(typeElement.textContent),
    };
};

const isStatic = (methodSection: SectionElements) => {
    return Boolean(methodSection.main.textContent.trim().match(/^<statická>/));
};

//#region Section selectors

export const getConstructorSection = (doc: Document): SectionElements => getSections(doc, 'Konstruktor - detail')[0];

export const getMethodsSections = (doc: Document): SectionElements[] => getSections(doc, 'Metody - detailně');

//#endregion Section selectors

const findSpecificListElement = (methodSection: SectionElements, searchHeader: 'Parametry' | 'Vrací') => {
    return methodSection.detailLists.find((e) => {
        const listHeadElement = e.firstElementChild;

        if (isListHeading(listHeadElement)) {
            const header = listHeadElement.textContent.trim().replace(/:$/, '');

            if (header === searchHeader) {
                return true;
            }
        }

        return false;
    });
};

const isListHeading = (listHeadElement: Element) => listHeadElement.classList.contains('heading');

const createMethodUrl = (pageUrl?: string, methodLink?: string) => (pageUrl && methodLink ? `${pageUrl}#${methodLink}` : null);
