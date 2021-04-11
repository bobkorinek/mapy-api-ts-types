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

export type Type = string;

export type PropertyAccess = 'normal' | 'static' | 'constant';