import {EmailValidator} from "./email.validator";
import {DateComparator, TodoList} from "../todo/todo-list";

class SimpleDateComparator implements DateComparator {
    getMinutesBetweenTwoDates(d1: Date, d2: Date) {
        return 40;
    }
}

export class User {
    email: string;
    lastname: string;
    firstname: string;
    birthdate: Date;
    emailValidator: EmailValidator;
    todolist: TodoList = null;
    password: string;


    constructor(email: string, lastname: string, firstname: string, password: string, birthdate: Date, emailValidator ?: EmailValidator) {
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.password = password;
        this.birthdate = birthdate;
        this.emailValidator = emailValidator;
    }

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
        this.todolist = new TodoList(new SimpleDateComparator());
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
