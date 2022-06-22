import {Item} from "./item";

export class TodoList {
    items: Item[] = []

    add(item: Item) {
        const itemAlreadyInList = true;//this.items.filter(i => i.equals(item)).length === 0;
        const isFull = this.items.length >= 10;
        if(itemAlreadyInList || isFull) throw new Error()
        this.items.push(item)
    }
}
