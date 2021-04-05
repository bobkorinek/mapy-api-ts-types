import { Property, PropertyAccess } from "../types";

export const parseProperties = (page: Document): Array<Property> => {
    let result = [];

    getPropertyTable(page, (table) => {
        result = mapProperties(table, parseProperty)
    });

    return result;
}

export const parseProperty: MapPropertyCallback<Property> = (accessCell: HTMLTableCellElement, infoCell: HTMLTableCellElement) => {
    return {
        name: parsePropertyName(infoCell),
        access: parsePropertyAccess(accessCell),
        type: 'unknown'
    }
}

const getPropertyTable = (page: Document, callback: (table: HTMLTableElement) => any): void => {
    page.querySelectorAll<HTMLTableElement>('#content>table.summaryTable').forEach(table => {
        if (table?.caption.textContent.trim() === 'Vlastnosti - souhrn') {
            callback(table);
        }
    })
}

const mapProperties = <T>(table: HTMLTableElement, callback: MapPropertyCallback<T>): Array<T> => {
    const rowCount = table.rows.length;
    const result: Array<T> = [];

    for (let i = 0; i < rowCount; i++) {
        const row = table.rows.item(i);
        if (row.firstElementChild.classList.contains('attributes') && row.lastElementChild.classList.contains('nameDescription')) {
            result.push(callback(row.firstElementChild as HTMLTableCellElement, row.lastElementChild as HTMLTableCellElement));
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

interface MapPropertyCallback<T> {
    (accessCell: HTMLTableCellElement, infoCell: HTMLTableCellElement): T;
}