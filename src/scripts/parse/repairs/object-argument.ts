import { Argument, Method, MethodRepair, StructureRepair } from '../../types';

export const objectArgumentRepair: StructureRepair = {
    tryRepair: (structure) => {
        return {
            ...structure,
            methods: structure.methods.map(tryRepairMethod),
        };
    },
};

const tryRepairMethod = (method: Method): Method => {
    return { ...method, arguments: repairArguments(method.arguments) };
};

const repairArguments = (args: Argument[]): Argument[] => {
    const argObjects = joinArgumentsToObjects(args);

    return args.filter((arg) => !isObjectsProperty(arg)).map((arg) => changeObjectType(arg, argObjects));
};

const joinArgumentsToObjects = (args: Argument[]): JoinedArguments => {
    return args.reduce((objects, curArg) => {
        if (isObjectsProperty(curArg)) {
            return addArgToObject(objects, curArg);
        }

        return objects;
    }, {});
};

const addArgToObject = (objects: object, arg: Argument) => {
    const objectName = getObjectNameFromArgName(arg.name);
    const propertyName = getPropertyFromArgName(arg.name);
    const alteredArg = { ...arg, name: propertyName };

    return Object.keys(objects).includes(objectName)
        ? { ...objects, [objectName]: [...objects[objectName], alteredArg] }
        : { ...objects, [objectName]: [alteredArg] };
};

const changeObjectType = (arg: Argument, argObjects: JoinedArguments): Argument => {
    if (argObjects?.[arg.name]) {
        return { ...arg, type: createObjectType(argObjects[arg.name]) };
    }

    return arg;
};

const createObjectType = (joinedArgs: Argument[]) => {
    return 'object';
    return '{' + joinedArgs.map((arg) => `"${arg.name}"?: ${arg.type}`).join(',') + '}';
};

const isObjectsProperty = (arg: Argument) => arg.name.includes('.');

const getPropertyFromArgName = (argName: string) => argName.replace(/^.+\./, '');

const getObjectNameFromArgName = (argName: string) => argName.replace(/\..+$/, '');

interface JoinedArguments {
    [argName: string]: Argument[];
}
