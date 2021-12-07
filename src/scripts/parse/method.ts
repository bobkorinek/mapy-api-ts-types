import { Argument, Method, MethodRepair, Page } from '../types';
import { repairs } from './repairs';

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

export const repair = (method: Method, structureName: string, structureType: 'class' | 'interface') => {
    const methodsRepairs = repairs.filter((r) => r.canBeRepaired(method, structureName, structureType));

    const apply = (currentMethod: Method, index: number = 0): Method => {
        if (methodsRepairs[index]) {
            return apply(methodsRepairs[index].repair(currentMethod, structureName, structureType), index + 1);
        }

        return currentMethod;
    };

    return apply(method);
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
