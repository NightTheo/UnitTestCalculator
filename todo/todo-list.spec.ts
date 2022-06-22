import {TodoList} from "./todo-list";
import {BasicItem} from "./basic-item";
import {Item} from "./item";

let emptyTodo: TodoList;
let item: Item;

beforeEach(()=> {
    emptyTodo = new TodoList();
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
})
