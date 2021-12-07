import { Argument, Method, MethodRepair } from '../../types';

export const objectArgumentRepair: MethodRepair = {
    canBeRepaired: (method) => filterObjectArguments(method).length > 0,
    repair: (method) => {
        return { ...method, arguments: repairArguments(method.arguments) };
    },
};

const repairArguments = (args: Argument[]): Argument[] => {
    const argObjects = joinArgumentsToObjects(args);

    return args.filter((arg) => !isObjectsProperty(arg));
};

const joinArgumentsToObjects = (args: Argument[]) => {
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

const filterObjectArguments = (method: Method) => method.arguments.filter(isObjectsProperty);

const isObjectsProperty = (arg: Argument) => arg.name.includes('.');

const getPropertyFromArgName = (argName: string) => argName.replace(/^.+\./, '');

const getObjectNameFromArgName = (argName: string) => argName.replace(/\..+$/, '');
