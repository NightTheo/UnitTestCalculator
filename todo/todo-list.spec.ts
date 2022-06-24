import {BasicItem} from "./basic-item";
import {ConflictItemException, Item, ItemContentException} from "./item";
import {DateComparator} from "../date_comparator/date-comparator";
import {TodoList, TodoListCapacityException, TodoListException} from "./todo-list";
import {EmailSenderService} from "../email_sender/email-sender.service";
import {User} from "../user/user";

let emptyTodo: TodoList;
let todoWithSevenItems: TodoList;
let user: User;
let item: Item;

let mockDateComparator: DateComparator;
let mockEmailSenderService: EmailSenderService;
const MOCK_MINUTES_BETWEEN_TWO_DATES = 40;

beforeEach(()=> {
    mockDateComparator = {getMinutesBetweenTwoDates: jest.fn().mockReturnValue(MOCK_MINUTES_BETWEEN_TWO_DATES)}
    mockEmailSenderService = {send: jest.fn()}
    user = new User('user@email.ex', '', '', '', new Date())
    emptyTodo = new TodoList(mockDateComparator, mockEmailSenderService, user);
    todoWithSevenItems = new TodoList(mockDateComparator, mockEmailSenderService, user)
    Array.from(Array(7).keys())
        .forEach(i => todoWithSevenItems.add(new BasicItem(`name${i}`, 'content')));
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

        const addingTheSameNameAgain = () => emptyTodo.add(theSameNameAgain);
        expect(addingTheSameNameAgain).toThrow(ConflictItemException)
        expect(addingTheSameNameAgain).toThrow('Item name already in To Do List')
    })

    it('should not add an 11th item', ()=>{
        for (let i = 0 ; i < 10 ; i += 1){
            const uniqueNameItem = new BasicItem(`name${i}`, 'content');
            emptyTodo.add(uniqueNameItem)
        }
        const addingInFullTodoList = () => emptyTodo.add(item);
        expect(addingInFullTodoList).toThrow(TodoListCapacityException)
        expect(addingInFullTodoList).toThrow('To Do List is already full.')
    })

    it('should not add an item with a content too long (1001 chars)', ()=>{
        item.content = Array(1002).join('a'); // string of 1001 'a'
        const addingAnItemWithTooLongContent = () => emptyTodo.add(item)
        expect(addingAnItemWithTooLongContent).toThrow(ItemContentException)
        expect(addingAnItemWithTooLongContent).toThrow('Item content is too long.')
    })

    it('should not add item before 30 mins since the last one', ()=>{
        mockDateComparator.getMinutesBetweenTwoDates = jest.fn().mockReturnValue(30)
        emptyTodo.add(item);
        const addingItem30minutesAfterTheLastOne = () => emptyTodo.add(new BasicItem('name2', 'content'));
        expect(addingItem30minutesAfterTheLastOne).toThrow(TodoListException)
        expect(addingItem30minutesAfterTheLastOne).toThrow('To soon to add an item');
    })

    it('should send an email at the 8th item added', ()=>{
        expect(mockEmailSenderService.send).not.toHaveBeenCalled();

        todoWithSevenItems.add(new BasicItem('8th', 'content'));
        expect(mockEmailSenderService.send).toHaveBeenCalledTimes(1);

        for (let i = 9 ; i <= 10 ; i += 1){
            const uniqueNameItem = new BasicItem(`name${i}`, 'content');
            todoWithSevenItems.add(uniqueNameItem)
        }
        expect(mockEmailSenderService.send).toHaveBeenCalledTimes(1);
    })

    it("should send an email to the To Do List's creator", () => {
        todoWithSevenItems.add(item)
        expect(mockEmailSenderService.send).toHaveBeenCalledWith(user.email, expect.any(String));
    })

    it("should send an email saying that only two slots are available in list", () => {
        todoWithSevenItems.add(item)
        expect(mockEmailSenderService.send).toHaveBeenCalledWith(
            expect.any(String),
            'You only have 2 empty slots remaining in your ToDo List.'
        );
    })
})
