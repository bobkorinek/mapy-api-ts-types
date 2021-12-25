import * as assert from 'assert';
import 'mocha';
import { objectArgumentRepair } from '../src/scripts/parse/repairs/object-argument';
import { Class, Method } from '../src/scripts/types';

const testStructure: Class = {
    events: [],
    interfaces: [],
    methods: [],
    name: 'TestClass',
    properties: [],
    type: 'class',
};

describe('repair', () => {
    it('repair object as argument', () => {
        const method: Method = {
            name: 'test',
            static: false,
            arguments: [
                {
                    name: 'options',
                    type: 'object',
                },
                {
                    name: 'options.arg1',
                    type: 'number',
                },
                {
                    name: 'options.arg2',
                    type: 'string',
                },
            ],
        };

        const repairedStructure = objectArgumentRepair.tryRepair({ ...testStructure, methods: [method] });
        const args = repairedStructure.methods[0].arguments;

        assert.ok(args.length === 1);
        // assert.ok(/^\{.+\}$/.test(args[0].type as string));
    });
});
