export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}
export enum TodoActionTypes {
  ADD_TODO,
  REMOVE_TODO,
  COMPLETE_TODO,
}
// Omit is used on interface or object type
// Exclude is different, it is used to exclude a union type
export type TodoAction =
  | { type: TodoActionTypes.ADD_TODO } & Omit<TodoItem, "completed"> 
  | { type: TodoActionTypes.REMOVE_TODO} &  Pick<TodoItem, "id">
  | { type: TodoActionTypes.COMPLETE_TODO }&  Pick<TodoItem, "id">

export type TodoReducer = (state: TodoItem[], action: TodoAction) => TodoItem[];
const reducer = (state: TodoItem[], action: TodoAction): TodoItem[] => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      const newTodo = {
        id: action.id,
        text: action.text,
        completed: false,
      };

      return [...state, newTodo];

    case TodoActionTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case TodoActionTypes.COMPLETE_TODO:
      const completeTodo = state.map((todo) => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });

      return completeTodo;

    default:
      return state;
  }
};

export default reducer;
