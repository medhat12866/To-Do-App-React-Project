import React, { useEffect, useRef, useState } from "react";
import TodoIcon from "../assets/todo_icon.png";
import TodoItems from "./TodoItems";

function Todo() {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };
  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };
  const toggle = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white p-7 rounded-xl place-self-center flex flex-col w-11/12 max-w-md min-h-[550px]">
      {/* ~~~~~~~~~~ Title ~~~~~~~~~~~~~ */}
      <div className="flex items-center justify-center gap-2 mt-7">
        <img src={TodoIcon} alt="Todo icon" width={40} />
        <h1 className="text-3xl font-semibold">To-Do List</h1>
      </div>

      {/* ~~~~~~~~~~ Input ~~~~~~~~~~~~~ */}
      <div className="bg-neutral-300 my-6 flex rounded-full overflow-hidden">
        <input
          ref={inputRef}
          className="py-3 px-5 border-0 outline-0 flex-1 "
          type="text"
          placeholder="Add Your Task"
        />
        <button
          onClick={add}
          onDragEnter={add}
          className="bg-orange-500 py-3 px-6 rounded-full text-white font-semibold cursor-pointer"
        >
          ADD +
        </button>
      </div>

      {/* ~~~~~~~~~~ Todo List ~~~~~~~~~~~~~ */}
      <div>
        {
          // console.log(todoList)
          todoList.map((item, index) => {
            return (
              <TodoItems
                key={index}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Todo;
