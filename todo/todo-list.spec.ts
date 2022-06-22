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
        const i1: Item = new BasicItem('name', 'content1');
        const i2: Item = new BasicItem('name', 'content2');
        emptyTodo.add(i1);
        expect(() => emptyTodo.add(i2)).toThrow(Error)
    })

    it('should not add an 11th item', ()=>{
        for (let i = 0 ; i < 10 ; ++i)
            emptyTodo.add(item)
        expect(() => emptyTodo.add(item)).toThrow(Error)
    })
})
