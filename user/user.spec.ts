import {User} from "./user";
import {EmailValidator} from "./email.validator";

describe('email', () => {
    const date: Date = new Date();

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
    let goodUser: User;
    beforeEach(() => {
        goodUser = new User('good@email.org', 'lastname', 'firstname', new Date())
    });

    it('should validate lastname', () => {
        expect(goodUser.isLastnameValid()).toBeTruthy();
    })

    it('should validate firstname', () => {
        expect(goodUser.isFirstnameValid()).toBeTruthy();
    })

    it('should not validate empty lastname', () => {
        goodUser.lastname = '';
        expect(goodUser.isLastnameValid()).toBeFalsy();
    })

    it('should not validate empty firstname', () => {
        goodUser.firstname = '';
        expect(goodUser.isFirstnameValid()).toBeFalsy();
    })

    it('should not validate lastname full of white spaces', () => {
        goodUser.lastname = '        ';
        expect(goodUser.isLastnameValid()).toBeFalsy();
    })

    it('should not validate firstname full of white spaces', () => {
        goodUser.firstname = '        ';
        expect(goodUser.isFirstnameValid()).toBeFalsy();
    })
});

describe('birthdate', () => {
    const today: Date = new Date;
    const twentyYearsAgo: Date = new Date();
    twentyYearsAgo.setFullYear(today.getFullYear() - 20);
    const tenYearsAgo: Date = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const thirteenYearsAgo: Date = new Date();
    thirteenYearsAgo.setFullYear(today.getFullYear() - 13);

    let goodUser: User;
    beforeEach(() => {
        goodUser = new User('good@email.org', 'lastname', 'firstname', twentyYearsAgo)
    });

    it('should validate birthdate', () => {
        expect(goodUser.isBirthdateValid()).toBeTruthy();
    })

    it('should not validate birthdate for user under 13 yo', () => {
        goodUser.birthdate = tenYearsAgo;
        expect(goodUser.isBirthdateValid()).toBeFalsy();
    })

    it('should validate birthdate for user who have 13 yo today !', () => {
        goodUser.birthdate = thirteenYearsAgo;
        expect(goodUser.isBirthdateValid()).toBeTruthy();
    })

    it('should not validate birthdate for user who have 13 yo tomorrow !', () => {
        const almostThirteenYearsAgo: Date = new Date();
        almostThirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear());
        almostThirteenYearsAgo.setDate(today.getDate() + 1);
        goodUser.birthdate = almostThirteenYearsAgo;
        expect(goodUser.isBirthdateValid()).toBeFalsy();
    })
});

describe('isValid', () => {

    const mockEmailValidator: EmailValidator = {
        check: jest.fn()
    }

    const twentyYearsAgo: Date = new Date();
    twentyYearsAgo.setFullYear(new Date().getFullYear() - 20);
    let goodUser: User;
    beforeEach(() => {
        goodUser = new User('good@email.org', 'lastname', 'firstname', twentyYearsAgo, mockEmailValidator)
    });

    it('should validate a correct user', () => {
        expect(goodUser.isValid()).toBeTruthy();
    })

    it('should not validate a user with all wrong', () => {
        goodUser.email = 'bad_email';
        goodUser.lastname = '';
        goodUser.firstname = '    ';
        goodUser.birthdate = new Date(); // born today
        expect(goodUser.isValid()).toBeFalsy();
    })

    it('should not validate a user with bad email', () => {
        mockEmailValidator.check = jest.fn().mockImplementation(()=> {throw new Error('Bad email');})
        expect(goodUser.isValid()).toBeFalsy();
    })
});

describe('todo list', () => {
    let goodUser: User;
    beforeEach(() => {
        goodUser = new User('good@email.org', 'lastname', 'firstname', new Date())
    });

    it('should create a new todolist', ()=> {
        goodUser.createNewToDoList()
        expect(goodUser.todolist).not.toBeFalsy();
    })

    it('should throw error if user is invalid', () => {
        goodUser.email = ''
        expect(() => goodUser.createNewToDoList()).toThrow(Error)
    })
})
