export const resolveType = (type: string) => {
    if (!type) {
        return 'unknown';
    }

    if (type === 'int' || type === 'float' || type === 'Number') {
        return 'number';
    } else if (type === 'bool' || type === 'Boolean') {
        return 'boolean';
    } else if (type === 'event') {
        return 'Event';
    } else if (type === 'node') {
        return 'Node';
    } else if (type === 'type') {
        return 'unknown';
    } else if (type === 'function') {
        return 'Function';
    } else if (type === 'String') {
        return 'string';
    } else if (type === 'webgl') {
        return 'WebGL';
    } else if (type === 'webglprogram') {
        return 'WebGLProgram';
    } else if (type === 'id') {
        return 'any';
    } else if (type === 'JAK.ISignals') {
        return 'JAK.Signals';
    }

    const arrayMatch = type.match(/Array(?:[<\[](?<type>.+?)[>\]])?/);

    if (arrayMatch) {
        return 'Array<' + resolveType(arrayMatch.groups['type']) + '>';
    }

    return type;
}
