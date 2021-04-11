import { Argument, Type } from "../types";
import { parseSentence } from "./comment";
import { resolveType } from "./variable";

export const parseMethodArguments = (methodsArguments: string, detailList: HTMLElement): Argument[] => {
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

            parsedArgument.comment = parseComment(argCommentElement);

            variables.push(parsedArgument)
        }
    }

    return variables;
}

export const parseArgument = (argumentInfo: string): Argument => {
    if (!argumentInfo) {
        return null;
    }

    const r = /(?:\{(?<types>.*)\}\s*)?(?<name>[a-zA-Z0-9]+)\s*(?<optional>volitelný)?(?:.*?výchozí:\s*(?<default>.*))?/m;
    const match = argumentInfo.match(r);

    if (!match) {
        return null;
    }

    const parsedTypes = match.groups['types'] ? parseTypes(match.groups['types']) : 'unknown';

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
        resolvedTypes.push(resolveType(match.toString().trim()));
        match = r.exec(types);
    }

    if (resolvedTypes.length === 0) {
        return null;
    } else if (resolvedTypes.length === 1) {
        return resolvedTypes[0];
    }

    return resolvedTypes;
}

const parseComment = (commentElement: Element) => {
    if (!commentElement) {
        return null;
    }

    return parseSentence(commentElement.textContent);
}
