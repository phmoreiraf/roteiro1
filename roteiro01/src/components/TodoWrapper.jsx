import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([
    { id: 1, description: "Tarefa exemplo", completed: false },
  ]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: uuidv4(), description: todo, completed: false }]);
  };

  return (
    <div className="TodoWrapper">
      <div className="TodoSection">
        <h2>Tarefas a fazer:</h2>
        {todos.filter(todo => !todo.completed).map((item) => (
          <TodoList key={item.id} task={item} />
        ))}
        <h2>Tarefas concluídas:</h2>
        {todos.filter(todo => todo.completed).map((item) => (
          <TodoList key={item.id} task={item} />
        ))}
      </div>
      <TodoForm addTodo={addTodo} />
      <div className="add-task-btn">+</div>
    </div>
  );
};
