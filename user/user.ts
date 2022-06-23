import {EmailValidator} from "./email.validator";
import {TodoList} from "../todo/todo-list";
import {SimpleDateComparator} from "../date_comparator/simple.date-comparator";
import {SengridEmailSenderService} from "../email_sender/sengrid.email-sender.service";

export class User {
    todolist: TodoList = null;

    constructor(
        public email: string,
        public lastname: string,
        public firstname: string,
        public password: string,
        public birthdate: Date,
        public emailValidator ?: EmailValidator
    ) {}

    isLastnameValid(): boolean {
        return this.lastname.trim().length > 0;
    }

    isFirstnameValid(): boolean {
        return this.firstname.trim().length > 0;
    }

    isBirthdateValid(): boolean {
        const today: Date = new Date();
        const thirteenYearsAgo: Date = new Date();
        thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
        return this.birthdate <= thirteenYearsAgo;
    }

    public isValid(): boolean {
        return  this.isEmailValid()
            &&  this.isLastnameValid()
            &&  this.isFirstnameValid()
            &&  this.isBirthdateValid()
            &&  this.isPasswordValid();
    }

    public createNewToDoList() {
        const hasAlreadyToDoList = this.todolist != null;
        if(hasAlreadyToDoList) throw new Error("User has already created a To Do List.");
        if(!this.isValid()) throw new Error("User is not valid for create a To Do List.");
        this.todolist = new TodoList(
            new SimpleDateComparator(),
            new SengridEmailSenderService(),
            this
        );
    }

    isPasswordValid() {
        const length = this.password.length;
        return length >= 8 && length <= 40;
    }

    private isEmailValid(): boolean {
        try {
            this.emailValidator.check(this.email);
            return true;
        } catch{
            return false;
        }
    }
}
