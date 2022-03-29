export class User {
    email: string;
    lastname: string;
    firstname: string;
    birthdate: Date;


    constructor(email: string, lastname: string, firstname: string, birthdate: Date) {
        this.email = email;
        this.lastname = lastname;
        this.firstname = firstname;
        this.birthdate = birthdate;
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
        const thirteenYearsAndADayAgo: Date = new Date();
        thirteenYearsAndADayAgo.setFullYear(today.getFullYear() - 13);
        return this.birthdate <= thirteenYearsAndADayAgo;
    }

    public isValid() {
        return false;
    }
}