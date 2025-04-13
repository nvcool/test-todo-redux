import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("todos", JSON.stringify(state.todos.items));
  } catch (error) {
    console.error("Error, ", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
