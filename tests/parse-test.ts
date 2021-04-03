import * as assert from 'assert';
import 'mocha';
import { parseArgument, parseTypes } from '../src/scripts/parse';

const x = 'asd';

describe('export', () => {
    describe('parseTypes', () => {
        it('should parse single type', () => {
            const result = parseTypes('int');

            assert.deepStrictEqual(result, 'int');
        })

        it('should parse multiple types', () => {
            const result = parseTypes('int|string|boolean');

            assert.deepStrictEqual(result, ['int', 'string', 'boolean']);
        })
    })


    describe('parseArguments', () => {
        it('should parse optional argument', () => {
            const result = parseArgument(' {SMap.Coords} center volitelný ');

            assert.strictEqual(result.name, 'center');
            assert.strictEqual(result.type, 'SMap.Coords');
            assert.strictEqual(result.optional, true);
        })

        it('should parse non-optional argument', () => {
            const result = parseArgument('{SMap.Coords} center');

            assert.strictEqual(result.name, 'center');
            assert.strictEqual(result.type, 'SMap.Coords');
            assert.notStrictEqual(result.optional, true);
        })

        it('should parse argument with default value', () => {
            const result = parseArgument(' {int|string} options.projection volitelný, výchozí: new SMap.Projection.Mercator() ');

            assert.strictEqual(result.name, 'options.projection');
            assert.deepStrictEqual(result.type, ['int', 'string']);
            assert.strictEqual(result.optional, true);
            assert.strictEqual(result.defaultValue, 'new SMap.Projection.Mercator()');
        });
    })
})