import { Page, Property, PropertyAccess } from '../types';

const accessMap: { [visibility: string]: PropertyAccess } = {
    konstanta: 'constant',
    statická: 'static',
};

export const parseProperties = (sections: Page.PropertySection[]) => sections.map(parseProperty);

export const parseProperty = (section: Page.PropertySection): Property => {
    return {
        access: mapPropertyAccess(section.visibility),
        name: section.name,
        type: 'unknown',
    };
};

const mapPropertyAccess = (visibility?: string) => {
    return accessMap[visibility] || 'normal';
};
