interface Iterable<T> {
    [Symbol.iterator](): IterableIterator<T>;
}

export const mapIterator = <I, O>(iterator: IterableIterator<I>, callback: (item: I) => O): O[] => {
    const mappedNodes: O[] = [];

    for (const item of iterator) {
        mappedNodes.push(callback(item));
    }

    return mappedNodes;
};

// @ts-ignore
export function reduceIterator<T>(iterable: Iterable<T>, callback: (previousValue: T, currentValue: T, currentIndex: number) => T): T;
export function reduceIterator<T>(
    iterable: Iterable<T>,
    callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T,
    initialValue: T
): T;
export function reduceIterator<T, U>(
    iterable: Iterable<T>,
    callback: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
): U;

export function reduceIterator<T, U>(
    iterable: Iterable<T>,
    callback: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
): U {
    const iterator = iterable[Symbol.iterator]();
    let index = 0;

    if (arguments.length === 2) {
        const firstValue = iterator.next();

        if (firstValue.done) {
            throw Error('Nothing to reduce');
        }

        initialValue = firstValue.value;
        index++;
    }

    let reducedValue = initialValue;

    for (const item of iterator) {
        reducedValue = callback(reducedValue, item, index++);
    }

    return reducedValue;
}
