import { Page } from '../types';
import { getSections, SectionElements } from './section';

export const parsePropertySections = (propertiesSections: SectionElements[]): Page.PropertySection[] => {
    if (propertiesSections.length === 0) {
        return [];
    }

    const parse = (i: number = 0): Page.PropertySection[] => {
        const elements = propertiesSections[i];
        const visibility = elements.main.firstChild.textContent.trim().match(/^<(?<v>.+)>$/);

        return [
            {
                name: elements.main.lastElementChild.textContent.trim(),
                visibility: visibility.groups['v'] ? visibility.groups['v'] : null,
            },
            ...(propertiesSections[i + 1] ? parse(i + 1) : []),
        ];
    };

    return parse();
};

export const getPropertiesSections = (doc: Document): SectionElements[] => getSections(doc, 'Vlastnosti - detailně');
