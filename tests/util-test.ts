import * as assert from 'assert';
import 'mocha';
import { reduceIterator } from '../src/util/iterator';

describe('util', () => {
    describe('iterator', () => {
        it('reduce iterator without inital value', () => {
            const iterable = {
                [Symbol.iterator]: function* createIterator() {
                    yield 3;
                    yield 5;
                    yield 7;
                },
            };

            const reducedValue = reduceIterator(iterable, (prev, next) => prev + next);

            assert.strictEqual(reducedValue, 15);
        });

        it('reduce iterator with inital value', () => {
            const iterable = {
                [Symbol.iterator]: function* createIterator() {
                    yield 3;
                    yield 5;
                },
            };

            const reducedValue = reduceIterator(
                iterable,
                (prev, next) => {
                    return [...prev, next];
                },
                []
            );

            assert.deepStrictEqual(reducedValue, [3, 5]);
        });
    });
});
