import * as http from 'http';
import { JSDOM } from 'jsdom';
import { Argument, Class, Method, Type, Variable } from './types';

export const parsePage = async (url: string): Promise<Class> => {
    return loadPage(url)
        .then((doc) => parse(doc));
}

const loadPage = (url: string): Promise<Document> => {
    return new Promise((resolve) => {
        http.get(url, (response) => {
            let data = '';

            response.on('data', (c) => {
                data += c;
            });

            response.on('end', () => resolve(new JSDOM(data).window.document));
        })
    });
}

const parse = (page: Document): Class => {
    const methods = extractMethods(page);

    return {
        name: '',
        methods: methods,
        properties: []
    };
}

const extractMethods = (page: Document): Method[] => {
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
    const match = text.match(/(?:\{(?<type>.*?)\})?\s*(?<name>.+)\((?<args>.*)\)$/);

    if (match) {
        const description = detailElement.nextElementSibling.classList.contains('description')
            ? detailElement.nextElementSibling.textContent.trim() : null;

        const parsedArguments = parseMethodArguments(match.groups['args'], getDetailListElement(detailElement));

        return {
            name: match.groups['name'].trim(),
            arguments: parsedArguments,
            type: match.groups['type'] ? match.groups['type'] : 'void',
            static: false,
            comment: description,
        }
    }

    return null;
}

const parseMethodArguments = (methodsArguments: string, detailList: HTMLElement): Argument[] => {
    const variables: Argument[] = [];
    const parsedArgs = [];
    const argsRegex = /[a-zA-Z0-9]+/g;

    let match = argsRegex.exec(methodsArguments);

    while (match) {
        parsedArgs.push(match[0]);
        match = argsRegex.exec(methodsArguments);
    }

    if (parsedArgs.length !== 0 && detailList) {
        for (let i = 1; i < parsedArgs.length * 2; i += 2) {
            const argDetailElement = detailList.children.item(i);
            const argCommentElement = detailList.children.item(i + 1);
            const parsedArgument = parseArgument(argDetailElement.textContent.trim());

            parsedArgument.comment = argCommentElement.textContent.trim();

            variables.push(parsedArgument)
        }
    }

    return variables;
}

export const parseArgument = (argumentInfo: string): Argument => {
    if (!argumentInfo) {
        return null;
    }

    const r = /\{(?<types>.*)\}\s*(?<name>[a-zA-Z0-9]+)\s*(?<optional>volitelný)?(?:.*?výchozí:\s*(?<default>.*))?/m;
    const match = argumentInfo.match(r);

    if (!match) {
        return null;
    }

    const parsedTypes = parseTypes(match.groups['types']);

    return {
        name: match.groups['name'].trim(),
        type: parsedTypes,
        defaultValue: match.groups['default'] ? match.groups['default'].trim() : null,
        optional: Boolean(match.groups['optional'])
    };
}

export const parseTypes = (types: string): Type | Type[] => {
    const resolvedTypes: Type[] = [];
    const r = /[^|{}]+/gm;
    let match = r.exec(types);

    while (match) {
        resolvedTypes.push(match.toString().trim());
        match = r.exec(types);
    }

    if (resolvedTypes.length === 0) {
        return null;
    } else if (resolvedTypes.length === 1) {
        return resolvedTypes[0];
    }

    return resolvedTypes;
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
