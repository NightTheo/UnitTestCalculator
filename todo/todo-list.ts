export interface Item {
}

export class TodoList {
    items: Item[] = []

    add(item: Item) {
        if(this.items.length >= 10) throw new Error()
        this.items.push(item)
    }
}
