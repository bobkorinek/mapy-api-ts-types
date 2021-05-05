export interface Namespace {
    name?: string;
    parent?: Namespace;
    namespaces: Namespace[];
    classes: Class[];
    interfaces: Interface[];
}

export interface Interface extends Link {
    type: 'interface';
    name: string;
    namespace?: string;
    extends?: string[];
    methods: Method[];
    comment?: string;
}

export interface Class extends Link {
    type: 'class';
    name: string;
    namespace?: string;
    extends?: string;
    implements?: string[];
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

//#region Page structures

export interface Page {
    name: string;
    extends?: string;
    implements?: string[];
    events: Page.Event[];
    description?: string;
    constructorSection?: Page.MethodSection;
    propertySections: Page.PropertySection[];
    methodSections: Page.MethodSection[];
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
        argumentSections: ArgumentSection[];
        returnValueSection?: ReturnValueSection;
        description?: string;
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
