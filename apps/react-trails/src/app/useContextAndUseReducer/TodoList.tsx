import { useContext } from "react"
import TodoContext from "./TodoContext"
import { TodoActionTypes, TodoItem } from "./reducer"

export default function TodoList(){
    const [state, dispatch] = useContext(TodoContext)

    const removeTodo = (id: TodoItem["id"]) => {
      dispatch && dispatch({ type: TodoActionTypes.REMOVE_TODO, id });
    };
    
    const completeTodo = (id: TodoItem["id"]) => {
        dispatch && dispatch({ type: TodoActionTypes.COMPLETE_TODO, id });
    };
    return (
        <div className="todos">
        {state.map((todo:TodoItem) => (
          <div key={todo.id} className="todoItem">
            <span className={todo.completed ? "strikethrough" : ""}>
              {todo.text}
            </span>
            <span onClick={() => removeTodo(todo.id)}>&#10005;</span>
            <span onClick={() => completeTodo(todo.id)}>&#10003;</span>
          </div>
        ))}
      </div>
    )
}