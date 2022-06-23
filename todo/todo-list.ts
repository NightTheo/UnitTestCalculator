import {Item} from "./item";
import {DateComparator} from "../date_comparator/date-comparator";
import {EmailSenderService} from "../email_sender/email-sender.service";
import {User} from "../user/user";

export class TodoList {
    private static readonly CAPACITY = 10;
    private static readonly NOTIFICATION_BEARING = 8;
    private static readonly MINIMUM_MINUTES_BETWEEN_TOW_ADD = 30;
    private static readonly MAX_SIZE_ITEM_CONTENT = 1000;

    items: Item[] = []
    private dateOfLastAddItem: Date = null;

    constructor(
        private readonly dateComparator: DateComparator,
        private readonly emailSenderService: EmailSenderService,
        private readonly creator: User
    ) {}

    add(item: Item) {
        this.checkCanAdd(item);
        this.items.push(item)
        this.dateOfLastAddItem = new Date();
        if(this.items.length === TodoList.NOTIFICATION_BEARING)
            this.emailSenderService.send(
                this.creator.email,
                `You only have ${TodoList.CAPACITY - TodoList.NOTIFICATION_BEARING} empty slots remaining in your ToDo List.`
            )
    }

    private checkCanAdd(item: Item) {
        if(!this.waitedLongEnough()) throw new Error("To soon to add an item");
        if(this.isFull()) throw new Error('To Do List is already full.');
        if(this.alreadyContains(item)) throw new Error(`Item ${item.name} already in To Do List`);
        if(this.itemContentIsTooLong(item)) throw new Error("Item content is too long.")
    }

    private waitedLongEnough(): boolean {
        const isFirstAdd = this.dateOfLastAddItem == null;
        if(isFirstAdd) return true;
        const minutesSinceLastAdd = this.dateComparator.getMinutesBetweenTwoDates(new Date(), this.dateOfLastAddItem);
        return minutesSinceLastAdd > TodoList.MINIMUM_MINUTES_BETWEEN_TOW_ADD;
    }

    private isFull(): boolean {
        return this.items.length >= TodoList.CAPACITY;
    }

    private alreadyContains(item: Item): boolean {
        return this.items.filter(i => i.equals(item)).length > 0;
    }
    private itemContentIsTooLong(item: Item) {
        return item.content.length > TodoList.MAX_SIZE_ITEM_CONTENT;
    }
}
