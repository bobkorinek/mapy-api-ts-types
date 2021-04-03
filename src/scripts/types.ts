export interface Class {
    name: string;
    extends?: string;

    properties: Property[];
    methods: Method[];
}

export interface Method {
    name: string;
    type: Type | Type[];
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
    access: 'normal' | 'static' | 'constant';
}

export interface Argument extends Variable {
    defaultValue?: string;
    optional?: boolean;
}

export type Type = string;