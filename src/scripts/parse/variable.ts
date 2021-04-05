export const resolveType = (type: string) => {
    if (!type) {
        return 'unknown';
    }

    switch (type) {
        case 'int':
        case 'float':
        case 'Number':
        case 'integer':
            return 'number';

        case 'bool':
        case 'Boolean':
            return 'boolean';

        case 'event':
            return 'Event';

        case 'node':
            return 'Node';

        case 'type':
            return 'unknown';

        case 'function':
            return 'Function';

        case 'String':
            return 'string';

        case 'webgl':
            return 'WebGL';

        case 'webglprogram':
            return 'WebGLProgram';

        case 'id':
            return 'any';

        case 'JAK.ISignals':
            return 'JAK.Signals';

        case 'xmlDoc':
            return 'XMLDocument'

        case 'coords':
            return 'SMap.Coords';
    }

    const arrayMatch = type.match(/Array(?:[<\[](?<type>.+?)[>\]])?/);

    if (arrayMatch) {
        return 'Array<' + resolveType(arrayMatch.groups['type']) + '>';
    }

    return type;
}
