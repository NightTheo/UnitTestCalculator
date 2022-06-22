import {Item} from "./item";

export class BasicItem implements Item{
    content: string;
    creationDate: Date;
    name: string;


    constructor(name: string, content: string) {
        this.content = content;
        this.creationDate = new Date();
        this.name = name;
    }

    equals(item: Item): boolean {
        return this.name === item.name;
    }
}
