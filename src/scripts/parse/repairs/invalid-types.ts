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
    {
        pattern: /^array$/,
        type: 'Array<unknown>',
    },
    {
        pattern: /^xmlDoc$/,
        type: 'XMLDocument',
    },
    {
        pattern: /^coords$/,
        type: 'Array<number>',
    },
    {
        pattern: /^(JAK\.)?Promise$/,
        type: 'JAK.Promise<unknown,unknown>',
    },
    {
        pattern: /^type$/,
        type: 'number',
    },
];

const repairTypeCallbacks: CallableInvalidType[] = [
    {
        /**
         * Convert type Array[] to Array<> and repair its generic type
         */
        tryRepair: (type) => {
            const match = type.match(/^Array(?:\[(?<t>.+)\])?/);

            if (match) {
                const arrayType = match.groups?.['t'] || 'unknown';
                return 'Array<' + tryRepairType(arrayType) + '>';
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
    if (!p.type) {
        return p;
    }

    const types = Array.isArray(p.type) ? p.type : [p.type];
    const repairedType = convertTypesToSingleArray(types.map(tryRepairType));

    return {
        ...p,
        type: repairedType.length === 1 ? repairedType[0] : repairedType,
    };
};

const convertTypesToSingleArray = (types: Array<Type | Type[]>) =>
    types.reduce((allTypes, t) => {
        return [...allTypes, ...(Array.isArray(t) ? t : [t])];
    }, []);

const tryRepairType = (t: Type): Type | Type[] => {
    const invalidReturnType = findInvalidType(t);

    if (invalidReturnType) {
        return invalidReturnType.type;
    }

    return tryRepairWithCallableInvalidType(t);
};

const tryRepairWithCallableInvalidType = (t: Type) => {
    return repairTypeCallbacks.reduce((repairedType, invalidRepair) => {
        return invalidRepair.tryRepair(repairedType);
    }, t);
};

const findInvalidType = (typeName): InvalidType => invalidTypes.find((t) => matchesInvalidType(t, typeName));

const matchesInvalidType = (t: InvalidType, typeName: string) => t.pattern.test(typeName);
