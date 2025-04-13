import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toogleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo) {
        todo.text = title;
      }
    },
  },
});

export const { addTodo, toogleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
