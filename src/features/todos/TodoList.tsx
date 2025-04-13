import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { addTodo, deleteTodo, editTodo, toogleTodo } from "./todoSlice";

export const TodoList = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const todos = useSelector((state: RootState) => state.todos.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (text.trim()) {
      if (editId !== null) {
        dispatch(editTodo({ id: editId, title: text }));
        setEditId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };

  const handleEdit = (todoId: number, currentText: string) => {
    setEditId(todoId);
    setText(currentText);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className=" flex gap-2 mt-10">
        <input
          className="py-2 border-[1px] rounded-md px-2 bg-gray-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editId !== null ? "Edit todo..." : "New todo"}
          type="text"
        />
        <button onClick={handleSubmit}>
          {editId !== null ? "Save" : "Add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}>
            Cancel
          </button>
        )}
      </form>

      <ul className="my-4 grid gap-2">
        {todos.map((todo) => {
          return (
            <li className="flex gap-2 items-center">
              <span
                className="py-2 border-[1px] rounded-md px-2 bg-gray-500"
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                onClick={() => dispatch(toogleTodo(todo.id))}>
                {todo.text}
              </span>
              <button onClick={() => handleEdit(todo.id, todo.text)}>
                Edit
              </button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
