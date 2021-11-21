export const mapNodeList = <T extends Node, R>(list: NodeListOf<T>, callback: (node: T) => R): R[] => {
    const mappedNodes: R[] = [];

    list.forEach((node) => {
        mappedNodes.push(callback(node));
    });

    return mappedNodes;
};
