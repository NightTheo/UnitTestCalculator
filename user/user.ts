import {EmailValidator} from "./email.validator";
import {ConflictTodoListException, TodoList} from "../todo/todo-list";
import {SimpleDateComparator} from "../date_comparator/simple.date-comparator";
import {SengridEmailSenderService} from "../email_sender/sengrid.email-sender.service";

export class User {
    todolist: TodoList = null;
    private static readonly MINIMUM_VALID_AGE = 13;

    constructor(
        public email: string,
        public lastname: string,
        public firstname: string,
        public password: string,
        public birthdate: Date,
        public emailValidator ?: EmailValidator
    ) {}

    lastnameIsValid(): boolean {
        return this.lastname.trim().length > 0;
    }

    firstnameIsValid(): boolean {
        return this.firstname.trim().length > 0;
    }

    isOldEnough(): boolean {
        const today: Date = new Date();
        const thirteenYearsAgo: Date = new Date();
        thirteenYearsAgo.setFullYear(today.getFullYear() - User.MINIMUM_VALID_AGE);
        return this.birthdate <= thirteenYearsAgo;
    }

    public isValid(): boolean {
        return  this.emailIsValid()
            &&  this.lastnameIsValid()
            &&  this.firstnameIsValid()
            &&  this.isOldEnough()
            &&  this.passwordIsValid();
    }

    public createNewToDoList() {
        const hasAlreadyToDoList = this.todolist != null;
        if(hasAlreadyToDoList) throw new ConflictTodoListException("User has already created a To Do List.");
        if(!this.isValid()) throw new UserException("User is not valid for create a To Do List.");

        this.todolist = new TodoList(
            new SimpleDateComparator(),
            new SengridEmailSenderService(),
            this
        );
    }

    passwordIsValid() {
        const length = this.password.length;
        return length >= 8 && length <= 40;
    }

    private emailIsValid(): boolean {
        try {
            this.emailValidator.check(this.email);
            return true;
        } catch {
            return false;
        }
    }
}

export class UserException implements Error {
    message: string;
    name: string;

    constructor(msg: string) {
        this.name = 'UserException'
        this.message = msg;
    }
}
