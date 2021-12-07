import * as assert from 'assert';
import 'mocha';
import { objectArgumentRepair } from '../src/scripts/parse/repairs/object-argument';
import { Method } from '../src/scripts/types';

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

        const repairedMethod = objectArgumentRepair.repair(method, 'test', 'class');
        const args = repairedMethod.arguments;

        assert.ok(args.length === 1);
    });
});
