import { Class, Method, Structure, StructureRepair } from '../../types';

export const coordsStaticFactoryTypeRepair: StructureRepair = {
    tryRepair: <T extends Structure>(structure) => {
        if (structure.fullName === 'SMap.Coords') {
            return repairStructure(structure as Class) as T;
        }

        return structure;
    },
};

const repairStructure = (structure: Class): Class => {
    return { ...structure, methods: structure.methods.map(tryRepairMethod) };
};

const tryRepairMethod = (method: Method): Method => {
    if (method.static && method.name.match(/^from./)) {
        return { ...method, type: 'SMap.Coords' };
    }

    return method;
};
