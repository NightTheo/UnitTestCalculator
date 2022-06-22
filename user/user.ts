import {EmailValidator} from "./email.validator";

export class User {
    email: string;
    lastname: string;
    firstname: string;
    birthdate: Date;
    emailValidator: EmailValidator;


    constructor(email: string, lastname: string, firstname: string, birthdate: Date, emailValidator ?: EmailValidator) {
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthdate = birthdate;
        this.emailValidator = emailValidator;
    }

    isEmailValid(): boolean {
        const match: RegExpMatchArray = String(this.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        return !!match;
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
}
