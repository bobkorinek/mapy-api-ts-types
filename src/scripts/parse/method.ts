import { Argument, Method, Page } from '../types';

export const parseMethodSection = (section: Page.MethodSection): Method => {
    return {
        name: section.name,
        arguments: parseArguments(section),
        static: section.static,
        comment: section?.description,
        type: section?.returnValueSection?.type,
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
        type: arg.type || null,
        comment: arg.description,
        defaultValue: arg.default || null,
        optional: arg.optional || null,
    };
};
