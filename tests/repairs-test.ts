import * as assert from 'assert';
import 'mocha';
import { duplicateMembersRepair } from '../src/scripts/parse/repairs/duplicate-members';
import { objectArgumentRepair } from '../src/scripts/parse/repairs/object-argument';
import { Class, Method, Property } from '../src/scripts/types';

const testStructure: Class = {
    events: [],
    interfaces: [],
    methods: [],
    name: 'TestClass',
    properties: [],
    type: 'class',
};

describe('repair', () => {
    describe('object argument', () => {
        it('convert arguments to single object argument', () => {
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

    describe('duplicate members', () => {
        const testClass: Class = {
            name: 'Test',
            events: [],
            interfaces: [],
            methods: [],
            type: 'class',
            properties: [],
        };

        it('remove duplicate property', () => {
            const classesProperties: Property[] = [
                {
                    name: 'p1',
                    access: 'constant',
                    type: 'unknown',
                },
                {
                    name: 'p2',
                    access: 'constant',
                    type: 'unknown',
                },
                {
                    name: 'p1',
                    access: 'constant',
                    type: 'unknown',
                },
            ];

            const c: Class = {
                ...testClass,
                properties: classesProperties,
            };

            const alteredClass = duplicateMembersRepair.tryRepair(c);

            assert.strictEqual(alteredClass.properties.length, 2);
            assert.strictEqual(alteredClass.properties[0].name, 'p1');
            assert.strictEqual(alteredClass.properties[1].name, 'p2');
        });

        it('remove duplicate methods', () => {
            const classesMethods: Method[] = [
                {
                    name: 'm1',
                    arguments: [],
                    static: false,
                },
                {
                    name: 'm2',
                    arguments: [],
                    static: false,
                },
                {
                    name: 'm1',
                    arguments: [],
                    static: false,
                },
            ];
            const c: Class = {
                ...testClass,
                methods: classesMethods,
            };

            const alteredClass = duplicateMembersRepair.tryRepair(c);

            assert.strictEqual(alteredClass.methods.length, 2);
            assert.strictEqual(alteredClass.methods[0].name, 'm1');
            assert.strictEqual(alteredClass.methods[1].name, 'm2');
        });
    });
});
