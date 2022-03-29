import {User} from "./user";

describe('user', () => {
    it('should validate an email', () => {
        const user = new User(
            'email.test@mail.fr',
            '','',''
        );
        expect(user.isEmailValid()).toBeTruthy();
    })

    it('should not validate a bad email', () => {
        const user = new User(
            'bademail',
            '','',''
        );
        expect(user.isEmailValid()).toBeFalsy();
    })

    it('should not validate empty email', () => {
        const user = new User(
            '',
            '','',''
        );
        expect(user.isEmailValid()).toBeFalsy();
    })

    it('should not validate email with white spaces around', () => {
        const user = new User(
            '       email.test@mail.fr          ',
            '','',''
        );
        expect(user.isEmailValid()).toBeFalsy();
    })
})