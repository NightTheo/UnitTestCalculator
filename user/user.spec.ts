import {User} from "./user";
import {EmailValidator} from "./email.validator";

const twentyYearsAgo: Date = new Date();
twentyYearsAgo.setFullYear(new Date().getFullYear() - 20);

let goodUser: User;
let mockEmailValidator: EmailValidator;
beforeEach(() => {
    mockEmailValidator = {check: jest.fn()}
    goodUser = new User(
        'good@email.org',
        'lastname',
        'firstname',
        'myVerySecurePassword',
        twentyYearsAgo,
        mockEmailValidator)
});

describe('names', () => {

    it('should validate lastname', () => {
        expect(goodUser.lastnameIsValid()).toBeTruthy();
    })

    it('should validate firstname', () => {
        expect(goodUser.firstnameIsValid()).toBeTruthy();
    })

    it('should not validate empty lastname', () => {
        goodUser.lastname = '';
        expect(goodUser.lastnameIsValid()).toBeFalsy();
    })

    it('should not validate empty firstname', () => {
        goodUser.firstname = '';
        expect(goodUser.firstnameIsValid()).toBeFalsy();
    })

    it('should not validate lastname full of white spaces', () => {
        goodUser.lastname = '        ';
        expect(goodUser.lastnameIsValid()).toBeFalsy();
    })

    it('should not validate firstname full of white spaces', () => {
        goodUser.firstname = '        ';
        expect(goodUser.firstnameIsValid()).toBeFalsy();
    })
});

describe('birthdate', () => {
    const today: Date = new Date;
    const tenYearsAgo: Date = new Date();
    tenYearsAgo.setFullYear(today.getFullYear() - 10);
    const thirteenYearsAgo: Date = new Date();
    thirteenYearsAgo.setFullYear(today.getFullYear() - 13);

    it('should validate birthdate', () => {
        expect(goodUser.isOldEnough()).toBeTruthy();
    })

    it('should not validate birthdate for user under 13 yo', () => {
        goodUser.birthdate = tenYearsAgo;
        expect(goodUser.isOldEnough()).toBeFalsy();
    })

    it('should validate birthdate for user who have 13 yo today !', () => {
        goodUser.birthdate = thirteenYearsAgo;
        expect(goodUser.isOldEnough()).toBeTruthy();
    })

    it('should not validate birthdate for user who have 13 yo tomorrow !', () => {
        const almostThirteenYearsAgo: Date = new Date();
        almostThirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear());
        almostThirteenYearsAgo.setDate(today.getDate() + 1);
        goodUser.birthdate = almostThirteenYearsAgo;
        expect(goodUser.isOldEnough()).toBeFalsy();
    })
});


describe('password', ()=> {
    it('should validate password', ()=> {
        expect(goodUser.passwordIsValid()).toBeTruthy()
    })

    it('should not validate password of 7', ()=> {
        goodUser.password = '1234567'
        expect(goodUser.passwordIsValid()).toBeFalsy()
    })

    it('should not validate password of 41', ()=> {
        goodUser.password = Array(42).join('a'); // string of 41 'a'
        expect(goodUser.passwordIsValid()).toBeFalsy()
    })
})

describe('isValid', () => {

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

    it('should create a new todolist', ()=> {
        goodUser.createNewToDoList()
        expect(goodUser.todolist).not.toBeFalsy();
    })

    it('should throw error if user is invalid', () => {
        goodUser.firstname = ''
        expect(() => goodUser.createNewToDoList()).toThrow(Error)
    })

    it('should throw error if user has already a todolist', () => {
        goodUser.createNewToDoList();
        expect(() => goodUser.createNewToDoList()).toThrow(Error)
    })
})
