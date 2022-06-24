export interface Item {
    name: string,
    content: string,
    creationDate: Date

    equals(item: Item): boolean;
}

export class ConflictItemException implements Error {
    message: string;
    name: string;

    constructor(msg: string) {
        this.name = 'ConflictItemException'
        this.message = msg
    }
}


export class ItemContentException implements Error {
    message: string;
    name: string;

    constructor(msg: string) {
        this.name = 'ItemContentException'
        this.message = msg
    }
}
