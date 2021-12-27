import { Class, Property, Structure, StructureRepair } from '../../types';

export const duplicatePropertiesRepair: StructureRepair = {
    tryRepair: <T extends Structure>(structure: T): T => {
        if (structure.type === 'class') {
            return removeDuplicateProperties(structure as Class) as T;
        }

        return structure;
    },
};

export const removeDuplicateProperties = (structure: Class) => {
    return { ...structure, properties: structure.properties.reduce(reduceDuplicateProperties, []) };
};

const reduceDuplicateProperties = (passedProperties: Property[], property: Property) => {
    if (isDuplicate(passedProperties, property)) {
        return passedProperties;
    }

    return [...passedProperties, property];
};

const isDuplicate = (properties: Property[], property: Property) => properties.some((p) => p.name === property.name);
