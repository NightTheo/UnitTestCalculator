import {TodoList} from "./todo-list";

let todo: TodoList;

beforeEach(()=> {
    todo = new TodoList();
})

describe('todo list', ()=>{

    it('should create an empty todo list', ()=>{
        expect(todo.items.length).toEqual(0);
    })

    it('should add an item', ()=>{
        todo.add({});
        expect(todo.items.length).toEqual(1);
    })

    it('should not add an 11th item', ()=>{
        for (let i = 0 ; i < 10 ; ++i)
            todo.add({})
        expect(() => todo.add({})).toThrow(Error)
    })
})
