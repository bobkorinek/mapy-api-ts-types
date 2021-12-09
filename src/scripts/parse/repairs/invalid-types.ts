import { Argument, Class, Method, Property, Structure, StructureRepair, Type } from '../../types';
interface InvalidType {
    pattern: RegExp;
    type: string | string[];
}

interface CallableInvalidType {
    tryRepair: (type: Type) => Type;
}

const invalidTypes: Array<InvalidType> = [
    {
        pattern: /^node$/,
        type: 'Node',
    },
    {
        pattern: /^bool$/,
        type: 'boolean',
    },
    {
        pattern: /^(int|float)$/,
        type: 'number',
    },
    {
        pattern: /^id$/,
        type: ['string', 'number'],
    },
    {
        pattern: /^function$/,
        type: 'Function',
    },
    {
        pattern: /^webgl$/,
        type: 'WebGL',
    },
    {
        pattern: /^webglprogram$/,
        type: 'WebGLProgram',
    },
    {
        pattern: /^event$/,
        type: 'Event',
    },
];

const repairTypeCallbacks: CallableInvalidType[] = [
    {
        tryRepair: (type) => {
            const match = type.match(/^Array(?:\[(?<t>.+)\])?/);

            if (match) {
                const arrayType = match.groups?.['t'] || 'unknown';
                return 'Array<' + arrayType + '>';
            }

            return type;
        },
    },
];

export const invalidTypeRepair: StructureRepair = {
    tryRepair: <T extends Structure>(structure: T) => {
        return tryRepairProperties({
            ...structure,
            methods: structure.methods.map(tryRepairMethod),
        }) as T;
    },
};

const tryRepairProperties = (structure: Structure): Structure => {
    if (structure.type === 'class') {
        return { ...structure, properties: structure.properties.map(tryRepair) } as Class;
    }

    return structure;
};

const tryRepairMethod = (method: Method): Method => tryRepairArgumentsType(tryRepair(method));

const tryRepairArgumentsType = (method: Method): Method => {
    return {
        ...method,
        arguments: method.arguments.map(tryRepair),
    };
};

const tryRepair = <T extends Property | Method | Argument>(p: T): T => {
    const invalidReturnType = findInvalidType(p.type);

    if (invalidReturnType) {
        return { ...p, type: invalidReturnType.type } as T;
    }

    return tryRepairWithCallableInvalidType(p);
};

const tryRepairWithCallableInvalidType = <T extends Property | Method | Argument>(item: T): T => {
    if (!item.type) {
        return item;
    }

    return repairTypeCallbacks.reduce((p, invalidType) => {
        const repairedType = (Array.isArray(p.type) ? p.type : [p.type]).map(invalidType.tryRepair);

        return { ...p, type: repairedType.length === 1 ? repairedType[0] : repairedType };
    }, item);
};

const findInvalidType = (typeName): InvalidType =>
    typeof typeName === 'string' ? invalidTypes.find((t) => matchesInvalidType(t, typeName)) : null;

const matchesInvalidType = (t: InvalidType, typeName: string) => t.pattern.test(typeName);
