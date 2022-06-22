import {Item} from "./item";
import {DateUtils} from "../utils/date.utils";

export interface DateValidator {
    check();
}

export class TodoList {
    private readonly MAX_CAPACITY = 10;
    items: Item[] = []
    private dateOfLastAddItem: Date;
    private readonly dateValidator: DateValidator;

    add(item: Item) {
        this.checkCanAdd(item);
        this.items.push(item)
        this.dateOfLastAddItem = new Date();
    }

    private checkCanAdd(item: Item) {
        if(this.isFull()) throw new Error('To Do List is already full.');
        if(this.alreadyContains(item)) throw new Error(`Item ${item.name} already in To Do List`);

        if(item.content.length > 1000) throw new Error("Item content is too long.") // TODO move it in item

        //this.checkDurationSinceLastAdd();
    }

    private isFull() {
        return this.items.length >= this.MAX_CAPACITY;
    }

    private alreadyContains(item: Item) {
        return this.items.filter(i => i.equals(item)).length > 0;
    }

    private checkDurationSinceLastAdd() {
        if(!this.dateOfLastAddItem) return
        const minutesPassedSinceLastAddedItem = DateUtils.getMinutesDifferenceBetweenTwoDates(
            new Date(),
            this.dateOfLastAddItem
        )
        if(minutesPassedSinceLastAddedItem <= 30)
            throw new Error(`Only ${minutesPassedSinceLastAddedItem} passed since last add in this To Do List.`);
    }
}
