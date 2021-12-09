export interface Namespace {
    name?: string;
    depth?: number;
    namespaces: Namespace[];
    structures: Structure[];
}

interface StrucutreInterface extends Link {
    name: string;
    namespace?: string;
    interfaces: Interface[];
    methods: Method[];
    comment?: string;
}

export interface Interface extends StrucutreInterface {
    type: 'interface';
}

export interface Class extends StrucutreInterface {
    type: 'class';
    parentClass?: Class;
    properties: Property[];
    methods: Method[];
    comment?: string;
    events: Event[];
}

export interface Method extends Link {
    name: string;
    type?: Type | Type[];
    arguments: Argument[];
    static: boolean;
    comment?: string;
    returnComment?: string;
}

export interface MethodRepair {
    canBeRepaired: (method: Method, structureName: string, structureType: 'class' | 'interface') => boolean;
    repair: (method: Method, structureName: string, structureType: 'class' | 'interface') => Method;
}

export interface StructureRepair {
    tryRepair: <T extends Structure>(structure: T) => T;
}

export interface Variable {
    name: string;
    type: Type | Type[];
    comment?: string;
}

interface Link {
    url?: string;
}

export interface Property extends Variable, Link {
    access: PropertyAccess;
}

export interface Argument extends Variable {
    defaultValue?: string;
    optional?: boolean;
}

export interface Event {
    name: string;
    comment?: string;
}

export type Type = string;

export type PropertyAccess = 'normal' | 'static' | 'constant';

export type Structure = Class | Interface;

//#region Page structures

export interface Page {
    name: string;
    extends?: string[];
    events: Page.Event[];
    description?: string;
    constructorSection?: Page.MethodSection;
    propertySections: Page.PropertySection[];
    methodSections: Page.MethodSection[];
    url: string;
}

export namespace Page {
    export interface Event {
        name: string;
        description?: string;
    }

    export interface PropertySection {
        name: string;
        visibility?: string;
    }

    export interface MethodSection {
        name: string;
        type?: string;
        static: boolean;
        argumentSections: ArgumentSection[];
        returnValueSection?: ReturnValueSection;
        description?: string;
        url?: string;
    }

    export interface ArgumentSection {
        name: string;
        type?: string;
        description?: string;
        optional?: boolean;
        default?: string;
    }

    export interface ReturnValueSection {
        type?: string;
        description?: string;
    }
}

////#endregion Page structures
