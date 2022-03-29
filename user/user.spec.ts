import {User} from "./user";

describe('email', () => {
    const date: Date = new Date;

    it('should validate an email', () => {
        const user = new User(
            'email.test@mail.fr',
            'lname','fname',date
        );
        expect(user.isEmailValid()).toBeTruthy();
    })

    it('should not validate a bad email', () => {
        const user = new User(
            'bademail',
            'lname','fname',date
        );
        expect(user.isEmailValid()).toBeFalsy();
    })

    it('should not validate empty email', () => {
        const user = new User(
            '',
            'lname','fname',date
        );
        expect(user.isEmailValid()).toBeFalsy();
    })

    it('should not validate email with white spaces around', () => {
        const user = new User(
            '       email.test@mail.fr          ',
            'lname','fname',date
        );
        expect(user.isEmailValid()).toBeFalsy();
    })
});

describe('names', () => {
    const date: Date = new Date;
    it('should validate name', () => {
        const user = new User(
            'email',
            'lastname','firstname',
            date
        );
        expect(user.isLastnameValid()).toBeTruthy();
        expect(user.isFirstnameValid()).toBeTruthy();
    })

    it('should not validate empty names', () => {
        const user = new User(
            'email',
            '','',
            date
        );
        expect(user.isLastnameValid()).toBeFalsy();
        expect(user.isFirstnameValid()).toBeFalsy();
    })

    it('should not validate names of white spaces', () => {
        const user = new User(
            'email',
            '        ','        ',
            date
        );
        expect(user.isLastnameValid()).toBeFalsy();
        expect(user.isFirstnameValid()).toBeFalsy();
    })
});

describe('birthdate', () => {
    const today: Date = new Date;
    it('should validate birthdate', () => {
        const twentyYearsAgo: Date = new Date();
        twentyYearsAgo.setFullYear(today.getFullYear() - 20);

        const user = new User(
            'email',
            'lastname','firstname',
            twentyYearsAgo
        );
        expect(user.isBirthdateValid()).toBeTruthy();
    })

    it('should not validate birthdate for user under 13 yo', () => {
        const tenYearsAgo: Date = new Date();
        tenYearsAgo.setFullYear(today.getFullYear() - 10);
        const user = new User(
            'email',
            'lastname','firstname',
            tenYearsAgo
        );
        expect(user.isBirthdateValid()).toBeFalsy();
    })

    it('should validate birthdate for user who have 13 yo today !', () => {
        const thirteenYearsAgo: Date = new Date();
        thirteenYearsAgo.setFullYear(today.getFullYear() - 13);
        const user = new User(
            'email',
            'lastname','firstname',
            thirteenYearsAgo
        );
        expect(user.isBirthdateValid()).toBeTruthy();
    })

    it('should not validate birthdate for user who have 13 yo tomorrow !', () => {
        const almostThirteenYearsAgo: Date = new Date();
        almostThirteenYearsAgo.setFullYear(today.getFullYear() - 13);
        almostThirteenYearsAgo.setDate(today.getDate() + 1);
        const user = new User(
            'email',
            'lastname','firstname',
            almostThirteenYearsAgo
        );
        expect(user.isBirthdateValid()).toBeFalsy();
    })
});