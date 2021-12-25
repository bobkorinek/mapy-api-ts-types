import { Method, StructureRepair } from '../../types';

export const constructorTypeRepair: StructureRepair = {
    tryRepair: (structure) => {
        return {
            ...structure,
            methods: structure.methods.map(removeConstructorsType),
        };
    },
};

const removeConstructorsType = (m: Method) => (m.name === 'constructor' ? { ...m, type: undefined } : m);
