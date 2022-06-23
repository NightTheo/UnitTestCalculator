import {BasicItem} from "./basic-item";
import {Item} from "./item";
import {DateComparator} from "../date_comparator/date-comparator";
import {TodoList} from "./todo-list";
import {EmailSenderService} from "../email_sender/email-sender.service";
import {User} from "../user/user";

let emptyTodo: TodoList;
let user: User;
let item: Item;
let mockDateComparator: DateComparator;
let mockEmailSenderService: EmailSenderService;
const MINUTES_BETWEEN_TWO_DATES = 40;

beforeEach(()=> {
    mockDateComparator = {getMinutesBetweenTwoDates: jest.fn().mockReturnValue(MINUTES_BETWEEN_TWO_DATES)}
    mockEmailSenderService = {send: jest.fn()}
    user = new User('user@email.ex', '', '', '', new Date())
    emptyTodo = new TodoList(mockDateComparator, mockEmailSenderService, user);
    item = new BasicItem('name', 'content')
})

describe('todo list', ()=>{

    it('should create an empty todo list', ()=>{
        expect(emptyTodo.items.length).toEqual(0);
    })

    it('should add an item', ()=>{
        emptyTodo.add(item);
        expect(emptyTodo.items.length).toEqual(1);
    })

    it('should not add two items with same name', ()=>{
        const firstItem: Item = new BasicItem('name', 'content1');
        const theSameNameAgain: Item = new BasicItem('name', 'content2');
        emptyTodo.add(firstItem);
        expect(() => emptyTodo.add(theSameNameAgain)).toThrow(Error)
    })

    it('should not add an 11th item', ()=>{
        for (let i = 0 ; i < 10 ; i += 1){
            const uniqueNameItem = new BasicItem(`name${i}`, 'content');
            emptyTodo.add(uniqueNameItem)
        }
        expect(() => emptyTodo.add(item)).toThrow(Error)
    })

    it('should not add an item with a content too long (1001 chars)', ()=>{
        item.content = Array(1002).join('a'); // string of 1001 'a'
        expect(() => emptyTodo.add(item)).toThrow(Error)
    })

    it('should not add item before 30 mins since the last one', ()=>{
        mockDateComparator.getMinutesBetweenTwoDates = jest.fn().mockReturnValue(30)
        emptyTodo.add(item);
        expect(() => emptyTodo.add(new BasicItem('name2', 'content'))).toThrow(Error)
    })

    it('should send an email at the 8th item added', ()=>{
        for (let i = 1 ; i <= 7 ; i += 1){
            const uniqueNameItem = new BasicItem(`name${i}`, 'content');
            emptyTodo.add(uniqueNameItem)
        }
        expect(mockEmailSenderService.send).not.toHaveBeenCalled();

        emptyTodo.add(new BasicItem('8th', 'content'));
        expect(mockEmailSenderService.send).toHaveBeenCalledTimes(1);

        for (let i = 9 ; i <= 10 ; i += 1){
            const uniqueNameItem = new BasicItem(`name${i}`, 'content');
            emptyTodo.add(uniqueNameItem)
        }
        expect(mockEmailSenderService.send).toHaveBeenCalledTimes(1);
    })

    it("should send an email to the To Do List's creator", () => {
        Array.from(Array(10).keys())
            .forEach(i => emptyTodo.add(new BasicItem(`name${i}`, 'content')));
        expect(mockEmailSenderService.send)
            .toHaveBeenCalledWith(user.email, 'You only have 2 items remaining in your ToDo List.');
    })
})
