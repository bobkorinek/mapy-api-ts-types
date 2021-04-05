declare namespace JAK {
    class Signals {
        addListener(type: string, handleFunction: string, sender: object): void;

        removeListener(id: string): void;

        removeListeners(array: string[]): void;

        makeEvent(type: string, data: object): void;
    }

    class Promise<T, R> {
        constructor(resolver: (resolve: (result: T) => any, reject: (result: R) => any) => any);

        when(all: Promise<any, any>[]);

        then(onFulfilled: (value: T) => any, onRejected: (value: R) => any);

        chain(promise);
    }

    class Vector {

    }

    abstract class AbstractDecorator {
        decorate<T extends object>(instance: T): T;
    }

    class EXIF {
        constructor(data: number[]);

        getTags(): Array<unknown>;
    }
}
