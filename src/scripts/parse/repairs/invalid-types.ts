import { Method, MethodRepair } from '../../types';

interface InvalidType {
    pattern: RegExp;
    type: string;
}

const invalidTypes: InvalidType[] = [
    {
        pattern: /^node$/,
        type: 'Node',
    },
    {
        pattern: /^bool$/,
        type: 'boolean',
    },
    {
        pattern: /^int$/,
        type: 'number',
    },
    {
        pattern: /^id$/,
        type: 'unknown',
    },
];

export const invalidTypeRepair: MethodRepair = {
    canBeRepaired: (method) => containsInvalidType(method),
    repair: (method) => repairTypes(method),
};

const repairTypes = (method: Method): Method => tryRepairArgumentsType(tryRepairReturnType(method));

const tryRepairReturnType = (method: Method): Method => {
    const invalidReturnType = findInvalidType(method.type);

    if (invalidReturnType) {
        return { ...method, type: invalidReturnType.type };
    }

    return method;
};

const tryRepairArgumentsType = (method: Method): Method => {
    return {
        ...method,
        arguments: method.arguments.map((arg) => {
            const invalidReturnType = findInvalidType(arg.type);

            if (invalidReturnType) {
                return { ...arg, type: invalidReturnType.type };
            }

            return arg;
        }),
    };
};

const containsInvalidType = (method: Method) =>
    Boolean(method.arguments.find((arg) => isInvalidType(arg.type))) || isInvalidType(method.type);

const findInvalidType = (typeName) => (typeof typeName === 'string' ? invalidTypes.find((t) => matchesInvalidType(t, typeName)) : null);

const matchesInvalidType = (t: InvalidType, typeName: string) => t.pattern.test(typeName);

const isInvalidType = (typeName) => typeof typeName === 'string' && Boolean(findInvalidType(typeName));
