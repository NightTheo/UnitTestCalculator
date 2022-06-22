import {EmailValidator} from "./email.validator";
import {TodoList} from "../todo/todo-list";

export class User {
    email: string;
    lastname: string;
    firstname: string;
    birthdate: Date;
    emailValidator: EmailValidator;
    todolist?: TodoList;
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

    public isValid() {
        try {
            this.emailValidator.check(this.email);
        } catch (e) {
            return false;
        }
        return  this.isLastnameValid()
            &&  this.isFirstnameValid()
            &&  this.isBirthdateValid();
    }

    public createNewToDoList() {
        if(!this.isValid())
            throw new Error();
        this.todolist = new TodoList();
    }

    isPasswordValid() {
        const length = this.password.length;
        return length >= 8 && length <= 40;
    }
}
