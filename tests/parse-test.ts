import * as assert from 'assert';
import { it } from 'mocha';
import { insertStructureIntoNamespace } from '../src/scripts/parse/namespace';
import { Interface, Namespace } from '../src/scripts/types';

describe('parse', () => {
    describe('namespace', () => {
        const testInterface: Interface = {
            type: 'interface',
            name: 'ITest',
            methods: [],
        };

        const rootNamespace: Namespace = {
            namespaces: [],
            structures: [],
        };

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
});
