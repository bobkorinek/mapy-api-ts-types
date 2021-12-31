import { Class, Method, Property, Structure, StructureRepair } from '../../types';

export const duplicateMembersRepair: StructureRepair = {
    tryRepair: (structure) => {
        return repairStructure(repairStructure(structure));
    },
};

const repairStructure = <T extends Structure>(structure: T): T => {
    const repairedStructure: T = {
        ...structure,
        methods: structure.methods.reduce(reduceMembers, []),
    };

    if (repairedStructure.type === 'class') {
        return repairProperties(repairedStructure) as T;
    }

    return repairedStructure;
};

const repairProperties = (structure: Class): Class => {
    return {
        ...structure,
        properties: structure.properties.reduce(reduceMembers, []),
    };
};

const reduceMembers = <T extends Method | Property>(members: Array<T>, member: T): T[] => {
    if (members.some((m) => m.name === member.name)) {
        return members;
    }

    return [...members, member];
};
