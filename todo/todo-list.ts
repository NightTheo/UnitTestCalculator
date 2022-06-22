import {Item} from "./item";

export class TodoList {
    private readonly MAX_CAPACITY = 10;
    items: Item[] = []

    add(item: Item) {
        this.checkAddItem(item);
        this.items.push(item)
    }

    private checkAddItem(item: Item) {
        const itemAlreadyInList = this.items.filter(i => i.equals(item)).length > 0;
        if(itemAlreadyInList) throw new Error(`Item ${item.name} already in To Do List`);

        const isFull = this.items.length >= this.MAX_CAPACITY;
        if(isFull) throw new Error('To Do List is already full.');

        if(item.content.length > 1000) throw new Error("Item content is too long.")
    }
}
