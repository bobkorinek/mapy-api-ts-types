import { replaceAt } from '../../../util/array';
import { Method, Structure, StructureRepair } from '../../types';

export const scaleConstructorArgumentRepair: StructureRepair = {
    tryRepair: <T extends Structure>(structure: T): T => {
        if (isSMapControlScale(structure)) {
            return repairConstructor(structure);
        }

        return structure;
    },
};

const repairConstructor = <T extends Structure>(structure: T): T => {
    const constructor = getConstructor(structure);

    if (constructor && constructor.arguments[0].name === 'conf' && constructor.arguments[1].name === 'conf') {
        return setConstructor(structure, repairConstructorsArgument(constructor));
    }

    return structure;
};

const repairConstructorsArgument = (constructor: Method): Method => {
    const reducedArguments = constructor.arguments.slice(1);
    const confArg = reducedArguments[0];

    return {
        ...constructor,
        arguments: replaceAt(reducedArguments, { ...confArg, type: ['number', confArg.type as string] }, 0),
    };
};

const getConstructor = (structure: Structure) => structure.methods.find((m) => m.name === 'constructor');

const setConstructor = <T extends Structure>(structure: T, constructor: Method): T => {
    return { ...structure, methods: structure.methods.map((m) => (m.name === constructor.name ? constructor : m)) };
};

const isSMapControlScale = (structure: Structure) => structure.name === 'Scale';
