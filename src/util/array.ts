export const replaceAt = <T>(arr: Array<T>, item: T, index: number): Array<T> => Object.assign([], arr, { [index]: item });
