export const getSections = (doc: Document, header: string): SectionElements[] => {
    const sectionsHeader = getSectionsHeader(doc, header);

    if (!sectionsHeader) {
        return [];
    }

    const addSectionElement = (sectionElements: SectionElements, e: Element, i: number): SectionElements => {
        if (e.classList.contains('fixedFont')) {
            return { ...sectionElements, main: e };
        } else if (e.classList.contains('description')) {
            return { ...sectionElements, description: e };
        } else if (e.classList.contains('detailList')) {
            return { ...sectionElements, detailLists: [...sectionElements.detailLists, e] };
        } else if (e.tagName == 'A' && (e as HTMLAnchorElement).name) {
            return { ...sectionElements, linkElement: e as HTMLAnchorElement };
        } else {
            return sectionElements;
        }
    };

    const emptySection = {
        main: null,
        description: null,
        detailLists: [],
    };

    const getNext = (e: Element, prev = emptySection, i: number = 0): SectionElements[] => {
        const sectionElements = addSectionElement(prev, e, i);

        if (e.nextElementSibling) {
            const nextElement = e.nextElementSibling;

            if (nextElement.tagName.toLowerCase() !== 'hr' && !nextElement.classList.contains('sectionTitle')) {
                return getNext(e.nextElementSibling, sectionElements, i + 1);
            } else if (
                nextElement.nextElementSibling?.tagName.toLowerCase() === 'a' &&
                nextElement.nextElementSibling?.hasAttribute('name')
            ) {
                return [...getNext(nextElement.nextElementSibling), sectionElements];
            }
        }

        return [sectionElements];
    };

    return getNext(sectionsHeader.nextElementSibling).reverse();
};

const getSectionsHeader = (doc: Document, header: string) => {
    for (const titleElement of doc.querySelectorAll('div.sectionTitle')) {
        if (titleElement.textContent.trim() === header) {
            return titleElement;
        }
    }

    return null;
};

export interface SectionElements {
    main: Element;
    description: Element;
    detailLists: Element[];
    linkElement?: HTMLAnchorElement;
}
