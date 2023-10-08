'use client'
import {FormEvent, FormEventHandler, MouseEvent, Reducer, useReducer, useState}from 'react'
import reducer, { TodoAction } from './reducer'
import {TodoActionTypes, TodoItem, TodoReducer} from "./reducer"
export default function(){
    const initialState:TodoItem[] = []
    const [id, setId] = useState(0)
    const [text, setText] = useState('');
    const [state, dispatch] = useReducer(reducer,initialState)
    const addTodoItem = (e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const newId = id + 1;
        console.log('asdf')
        setId(newId);
        dispatch({
            type: TodoActionTypes.ADD_TODO,
            id: newId,
            text:text
        })
    }
    
    const removeTodo = (id:TodoItem["id"]) => {
        dispatch({ type: TodoActionTypes.REMOVE_TODO, id });
    };

    const completeTodo = (id:TodoItem["id"]) => {
        dispatch({ type: TodoActionTypes.COMPLETE_TODO, id });
    };
    return (
        <div className="App">
      <h1>Todo Example</h1>
      {/* onSubmit={addTodoItem} */}
      <form className="input" >
        <input value={text} onChange={(e) => setText(e.target.value)} />
        {/* disabled={text.length === 0} */}
        <button  type="submit" onClick={addTodoItem}>
          +
        </button>
      </form>
      <div className="todos">
        {state.map((todo) => (
          <div key={todo.id} className="todoItem">
            <span className={todo.completed ? "strikethrough":""}>{todo.text}</span>
            <span onClick={() => removeTodo(todo.id)}>&#10005;</span>
            <span onClick={() => completeTodo(todo.id)}>&#10003;</span>
          </div>
        ))}
      </div>
    </div>
    )
}