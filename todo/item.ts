export interface Item {
    name: string,
    content: string,
    creationDate: Date

    equals(item: Item): boolean;
}
