export interface Namespace {
    name?: string;
    parent?: Namespace;
    namespaces: Namespace[];
    classes: Class[];
    interfaces: Interface[];
}

export interface Interface {
    type: 'interface';
    name: string;
    namespace?: string;
    extends?: string[];
    methods: Method[];
}

export interface Class {
    type: 'class';
    name: string;
    namespace?: string;
    extends?: string;
    implements?: string[];
    properties: Property[];
    methods: Method[];
}

export interface Method {
    name: string;
    type?: Type | Type[];
    arguments: Argument[];
    static: boolean;
    comment?: string;
}

export interface Variable {
    name: string;
    type: Type | Type[];
    comment?: string;
}

export interface Property extends Variable {
    access: PropertyAccess;
}

export interface Argument extends Variable {
    defaultValue?: string;
    optional?: boolean;
}

export type Type = string;

export type PropertyAccess = 'normal' | 'static' | 'constant';