import * as assert from 'assert';
import { it } from 'mocha';
import { parseMethodSection } from '../src/scripts/parse/method';
import { insertStructureIntoNamespace } from '../src/scripts/parse/namespace';
import { parseProperties } from '../src/scripts/parse/property';
import { parsePages } from '../src/scripts/parse/structure';
import { Argument, Class, Interface, Namespace, Page, PropertyAccess } from '../src/scripts/types';

describe('parse', () => {
    describe('structure', () => {
        const createPage = (fullName: string): Page => {
            return {
                name: fullName,
                events: [],
                methodSections: [],
                propertySections: [],
                url: '',
            };
        };

        it('parse basic page to class', () => {
            const page = createPage('Class');
            const result = parsePages([page]);

            assert.ok(result.namespace.structures.find((s) => s.name === 'Class'));
        });

        it('parse page to class with parent', () => {
            const page: Page = { ...createPage('Ns.ChildClass'), extends: ['ParentClass'] };
            const parent = createPage('ParentClass');
            const result = parsePages([parent, page]);

            const parentClass = result.namespace.structures.find((s) => s.name === 'ParentClass');
            const childClass = result.namespace.namespaces
                .find((ns) => ns.name === 'Ns')
                .structures.find((s) => s.name === 'ChildClass') as Class;

            assert.ok(parentClass, "Parent class can't be inserted into proper namespace.");
            assert.ok(childClass, "Child class can't be inserted into proper namespace.");
            assert.strictEqual(childClass.parentClass, parentClass.name, "Child class doesn't have proper parent class");
        });
    });

    describe('namespace', () => {
        const testInterface: Interface = {
            type: 'interface',
            name: 'ITest',
            fullName: 'ITest',
            methods: [],
            interfaces: [],
        };

        const rootNamespace: Namespace = {
            namespaces: [],
            structures: [],
        };

        it('assign depth of namespace', () => {
            const ns = insertStructureIntoNamespace({ ...testInterface, namespace: 'N1.N2' }, rootNamespace);

            assert.strictEqual(ns.namespaces[0].depth, 0);
            assert.strictEqual(ns.namespaces[0].namespaces[0].depth, 1);
        });

        it('insert structure into root namespace', () => {
            const namespaceWithStructure = insertStructureIntoNamespace(testInterface, rootNamespace);

            assert.strictEqual(namespaceWithStructure.structures.length, 1);
        });

        it('insert structure into existing nested namespace', () => {
            const namespaceWithStructure = insertStructureIntoNamespace(
                { ...testInterface, namespace: 'l1' },
                {
                    ...rootNamespace,
                    namespaces: [
                        {
                            name: 'l1',
                            namespaces: [],
                            structures: [],
                        },
                    ],
                }
            );

            assert.strictEqual(namespaceWithStructure.namespaces[0].structures[0].namespace, 'l1');
        });

        it('insert structure into not existing nested namespace', () => {
            const namespaceWithStructure = insertStructureIntoNamespace({ ...testInterface, namespace: 'l1' }, rootNamespace);

            assert.strictEqual(namespaceWithStructure.namespaces.length, 1);
            assert.strictEqual(namespaceWithStructure.namespaces[0].structures[0].namespace, 'l1');
        });

        it("don't insert duplicite structure into namespace", () => {
            const namespaceWithStructure = insertStructureIntoNamespace(
                testInterface,
                insertStructureIntoNamespace(testInterface, rootNamespace)
            );

            assert.strictEqual(namespaceWithStructure.structures.length, 1);
        });
    });

    describe('method', () => {
        it('parse arguments', () => {
            const methodSection: Page.MethodSection = {
                name: 'testMethod',
                description: 'test',
                static: false,
                argumentSections: [
                    {
                        name: 'arg1',
                        type: 'boolean',
                        description: 'Test arg 1',
                    },
                ],
            };

            const method = parseMethodSection(methodSection);

            assert.deepStrictEqual(method.arguments, [
                {
                    name: 'arg1',
                    type: 'boolean',
                    comment: 'Test arg 1',
                    defaultValue: null,
                    optional: null,
                },
            ] as Argument[]);
        });
    });

    describe('property', () => {
        it('parse properies', () => {
            const propertySections: Page.PropertySection[] = [
                {
                    name: 'p1',
                    visibility: 'statická',
                },
                {
                    name: 'p2',
                },
                {
                    name: 'p3',
                    visibility: 'konstanta',
                },
            ];

            const properties = parseProperties(propertySections);

            assert.strictEqual(properties[0].name, 'p1');
            assert.strictEqual(properties[0].access, 'static' as PropertyAccess);

            assert.strictEqual(properties[1].name, 'p2');
            assert.strictEqual(properties[1].access, 'normal' as PropertyAccess);

            assert.strictEqual(properties[2].name, 'p3');
            assert.strictEqual(properties[2].access, 'constant' as PropertyAccess);
        });
    });
});
