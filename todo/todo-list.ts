import {Item} from "./item";
import {DateComparator} from "../date_comparator/date-comparator";
import {EmailSenderService} from "../email_sender/email-sender.service";

export class TodoList {
    private readonly CAPACITY = 10;
    items: Item[] = []
    private dateOfLastAddItem: Date = null;
    private readonly dateComparator: DateComparator;
    private readonly emailSenderService:  EmailSenderService;


    constructor(
        dateComparator: DateComparator,
        emailSenderService: EmailSenderService
    ) {
        this.dateComparator = dateComparator;
        this.emailSenderService = emailSenderService
    }

    add(item: Item) {
        this.checkCanAdd(item);
        this.items.push(item)
        this.dateOfLastAddItem = new Date();
        if(this.items.length === 8) this.emailSenderService.send()
    }

    private checkCanAdd(item: Item) {
        if(!this.waitedLongEnough()) throw new Error("To soon to add an item");
        if(this.isFull()) throw new Error('To Do List is already full.');
        if(this.alreadyContains(item)) throw new Error(`Item ${item.name} already in To Do List`);

        if(item.content.length > 1000) throw new Error("Item content is too long.")
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
