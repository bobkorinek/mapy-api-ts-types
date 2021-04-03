import { Method } from "../types";
import { parseMethodArguments } from "./argument";
import { resolveType } from "./variable";

export const extractMethods = (page: Document): Method[] => {
    const methods: Method[] = [];

    forEachContentElement(page, 'Metody - detailně', (detailElement) => {
        if (detailElement.classList.contains('fixedFont')) {
            methods.push(parseMethod(detailElement));
        }
    });

    return methods;
}

const parseMethod = (detailElement: HTMLElement): Method => {
    const text = detailElement.textContent.trim();
    const match = text.match(/(?<static><statická>)?[\t\n]*?(?:\{(?<type>.*?)\})?.*?(?<name>[^.]+)\((?<args>.*)\)$/m);

    if (match) {
        const description = detailElement.nextElementSibling.classList.contains('description')
            ? detailElement.nextElementSibling.textContent.trim() : null;

        const parsedArguments = parseMethodArguments(match.groups['args'], getDetailListElement(detailElement));
        const type = match.groups['type'] ? match.groups['type'].trim().split('|').map(resolveType) : 'void';

        return {
            name: match.groups['name'].trim(),
            arguments: parsedArguments,
            type: type,
            static: Boolean(match.groups['static']),
            comment: description,
        }
    }

    return null;
}

const getContentElement = (page: Document) => page.getElementById('content');

const getContentElements = (page: Document) => getContentElement(page).children;

const getDetailListElement = (detailElement: HTMLElement): HTMLElement => {
    if (detailElement.nextElementSibling) {
        if (detailElement.nextElementSibling.nextElementSibling && detailElement.nextElementSibling.nextElementSibling.classList.contains('detailList')) {
            return detailElement.nextElementSibling.nextElementSibling as HTMLElement;
        } else if (detailElement.nextElementSibling.classList.contains('detailList')) {
            return detailElement.nextElementSibling as HTMLElement;
        }
    }

    return null;
};

const forEachContentElement = (page: Document, startHeader: string, callback: (element: HTMLElement) => any) => {
    const elements = getContentElements(page);

    for (let contentElementIndex = 0; contentElementIndex < elements.length; contentElementIndex++) {
        const element = elements.item(contentElementIndex);

        if (element.className === 'sectionTitle' && element.textContent.trim() === startHeader) {
            let detailElementIndex = contentElementIndex + 1;
            let contentElement = elements.item(detailElementIndex);

            while (contentElement && !contentElement.classList.contains('sectionTitle')) {
                callback(contentElement as HTMLElement);
                contentElement = elements.item(++contentElementIndex);
            }
        }
    }
}

