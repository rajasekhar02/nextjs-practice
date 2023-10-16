import {Dispatch, createContext} from "react"
import type { TodoAction, TodoItem,  } from "./reducer";
const initialState:[TodoItem[], Dispatch<TodoAction>?] = [[], undefined];
export default createContext(initialState);