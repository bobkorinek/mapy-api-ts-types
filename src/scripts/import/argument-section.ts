import { Page } from '../types';
import { parseType } from './type';

export const parseItemListToArgument = (itemElement: Element): Page.ArgumentSection => {
    const contentElements = itemElement.children;

    const parseItemContentToArgument = (index: number = 0): object => {
        const itemsContentElement = contentElements[index];

        if (!itemsContentElement) {
            return {};
        }

        const parseArgumentAttribute = () => {
            switch (itemsContentElement.tagName.toUpperCase()) {
                case 'SPAN':
                    return { type: parseType(itemsContentElement.textContent) };
                case 'B':
                    const name = itemsContentElement.textContent.trim();
                    return { name: name };
                case 'EM':
                    const optionalReturnInfo = itemsContentElement.textContent.trim().match(/výchozí:\t*(?<default>.*)$/);

                    if (optionalReturnInfo) {
                        return { optional: true, default: optionalReturnInfo.groups['default'].trim() };
                    } else {
                        return { optional: true };
                    }
            }
        };

        return { ...parseArgumentAttribute(), ...parseItemContentToArgument(index + 1) };
    };

    return parseItemContentToArgument() as Page.ArgumentSection;
};