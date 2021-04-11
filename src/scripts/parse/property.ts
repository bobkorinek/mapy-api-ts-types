import { Property, PropertyAccess } from "../types";
import { parseSentence } from "./comment";

export const parseProperties = (page: Document, url?: string): Array<Property> => {
    let result = [];

    getPropertyTable(page, (table) => {
        result = mapProperties(table, (accessCell, infoCell) => parseProperty(accessCell, infoCell, url))
    });

    return result;
}

export const parseProperty: MapPropertyCallback<Property> = (accessCell: HTMLTableCellElement, infoCell: HTMLTableCellElement, url?: string) => {
    const name = parsePropertyName(infoCell);

    return {
        name: name,
        access: parsePropertyAccess(accessCell),
        type: 'unknown',
        url: url ? url + '#' + name : null,
        comment: parsePropertyComment(infoCell)
    }
}

const getPropertyTable = (page: Document, callback: (table: HTMLTableElement) => any): void => {
    page.querySelectorAll<HTMLTableElement>('#content>table.summaryTable').forEach(table => {
        if (table?.caption.textContent.trim() === 'Vlastnosti - souhrn') {
            callback(table);
        }
    })
}

const mapProperties = (table: HTMLTableElement, callback: MapPropertyCallback<Property>): Array<Property> => {
    const rowCount = table.rows.length;
    const result: Array<Property> = [];

    for (let i = 0; i < rowCount; i++) {
        const row = table.rows.item(i);
        if (row.firstElementChild.classList.contains('attributes') && row.lastElementChild.classList.contains('nameDescription')) {
            const property = callback(row.firstElementChild as HTMLTableCellElement, row.lastElementChild as HTMLTableCellElement);

            if (!result.find(p => p.name === property.name)) {
                result.push(property);
            }
        }
    }

    return result;
}

const parsePropertyAccess = (accessCell: HTMLTableCellElement): PropertyAccess => {
    switch (accessCell.textContent.trim()) {
        case '<konstanta>':
            return 'constant';
        case '<statická>':
            return 'static';
        default:
            return 'normal'
    }
}

const parsePropertyName = (infoCell: HTMLTableCellElement) => {
    return infoCell.firstElementChild.textContent.trim().replace(/^.+\./, '');
}

const parsePropertyComment = (infoCell: HTMLTableCellElement): string => {
    const commentElement = infoCell.lastElementChild;

    if (commentElement && commentElement.classList.contains('description')) {
        return parseSentence(commentElement.textContent);
    }

    return null;
}

interface MapPropertyCallback<T> {
    (accessCell: HTMLTableCellElement, infoCell: HTMLTableCellElement, url?: string): T;
}