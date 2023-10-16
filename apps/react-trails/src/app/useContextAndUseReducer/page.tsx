"use client";
import { FormEvent, useContext, useReducer, useState } from "react";
import reducer, { TodoAction } from "./reducer";
import { TodoActionTypes, TodoItem, TodoReducer } from "./reducer";
import TodoContext from "./TodoContext";
import TodoList from "./TodoList";
export default function ReducerPage() {
  const initialState: TodoItem[] = [];
  const [id, setId] = useState(0);
  const [text, setText] = useState("");
  const [stateR, dispatch] = useReducer(reducer, initialState);
  
  const addTodoItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newId = id + 1;
    setId(newId);
    dispatch({
      type: TodoActionTypes.ADD_TODO,
      id: newId,
      text: text,
    });
  };



  return (
    <TodoContext.Provider value={[stateR, dispatch]}>
    <div className="App">
      <h1>Todo Example</h1>
      <form className="input" onSubmit={addTodoItem}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={text.length === 0} type="submit">
          +
        </button>
      </form>
      <TodoList></TodoList>
    </div>
    </TodoContext.Provider>
  );
}
