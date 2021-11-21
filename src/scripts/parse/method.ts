import { Method, Page } from '../types';

export const parseMethodSection = (section: Page.MethodSection): Method => {
    return {
        name: section.name,
        arguments: [],
        static: section.static,
        comment: section?.description,
        type: section?.returnValueSection?.type,
        returnComment: section?.returnValueSection?.description,
    };
};

const parseArguments = (section: Page.MethodSection) => {};
