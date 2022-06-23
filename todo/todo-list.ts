import {Item} from "./item";
import {DateUtils} from "../utils/date.utils";
import {User} from "../user/user";

export interface DateComparator {
    getMinutesBetweenTwoDates(d1: Date, d2: Date);
}


export class TodoList {
    private readonly CAPACITY = 10;
    items: Item[] = []
    private dateOfLastAddItem: Date = null;
    private readonly dateComparator: DateComparator;


    constructor(dateComparator: DateComparator) {
        this.dateComparator = dateComparator;
    }

    add(item: Item) {
        this.checkCanAdd(item);
        this.items.push(item)
        this.dateOfLastAddItem = new Date();
    }

    private checkCanAdd(item: Item) {
        if(!this.waitedLongEnough()) throw new Error("To soon to add an item");
        if(this.isFull()) throw new Error('To Do List is already full.');
        if(this.alreadyContains(item)) throw new Error(`Item ${item.name} already in To Do List`);

        if(item.content.length > 1000) throw new Error("Item content is too long.") // TODO move it in item
    }

    private waitedLongEnough(): boolean {
        const isFirstAdd = this.dateOfLastAddItem == null;
        if(isFirstAdd) return true;
        const minutesSinceLastAdd = this.dateComparator.getMinutesBetweenTwoDates(new Date(), this.dateOfLastAddItem);
        return minutesSinceLastAdd > 30;
    }

    private isFull(): boolean {
        return this.items.length >= this.CAPACITY;
    }

    private alreadyContains(item: Item): boolean {
        return this.items.filter(i => i.equals(item)).length > 0;
    }

    private checkDurationSinceLastAdd() {
        if(!this.dateOfLastAddItem) return
        const minutesPassedSinceLastAddedItem = this.dateComparator.getMinutesBetweenTwoDates(
            new Date(),
            this.dateOfLastAddItem
        )
        if(minutesPassedSinceLastAddedItem <= 30)
            throw new Error(`Only ${minutesPassedSinceLastAddedItem} passed since last add in this To Do List.`);
    }
}
