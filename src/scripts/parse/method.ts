import { Argument, Method, Page } from '../types';

export const parseMethodSection = (section: Page.MethodSection): Method => {
    return {
        name: section.name,
        arguments: parseArguments(section),
        static: section.static,
        comment: section?.description,
        type: parseType(section?.returnValueSection?.type),
        returnComment: section?.returnValueSection?.description,
        url: section.url,
    };
};

const parseArguments = (section: Page.MethodSection) => {
    return section.argumentSections.map(parseArgument);
};

const parseArgument = (arg: Page.ArgumentSection): Argument => {
    return {
        name: arg.name,
        type: parseType(arg.type || null),
        comment: arg.description,
        defaultValue: arg.default || null,
        optional: arg.optional || null,
    };
};

const parseType = (type?: string) => {
    if (type) {
        const types = type.split('|').map((p) => p.trim());
        return types.length === 1 ? types[0] : types;
    }

    return type;
};
