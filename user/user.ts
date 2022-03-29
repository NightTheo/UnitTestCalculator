export class User {
    email: string;
    lastname: string;
    firstname: string;
    birthdate: string;


    constructor(email: string, lastname: string, firstname: string, birthdate: string) {
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
        return false;
    }

    isFirstnameValid(): boolean {
        return false;
    }

    pisBirthdateValid(): boolean {
        return false;
    }

    public isValid() {
        return false;
    }
}