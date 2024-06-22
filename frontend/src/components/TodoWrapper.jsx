import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([
    { id: 1, description: "Tarefa exemplo", completed: false, priority: 'Alta' },
  ]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), ...todo }
    ]);
  };

  const completeTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="TodoWrapper">
      <div className="TodoSection">
        <h2 className="todoTask">Tarefas a fazer:</h2>
        {todos.filter(todo => !todo.completed).map((item) => (
          <TodoList key={item.id} task={item} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))}
        <h2 className="completedTask">Tarefas concluídas:</h2>
        {todos.filter(todo => todo.completed).map((item) => (
          <TodoList key={item.id} task={item} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))}
      </div>
      <div className="TodoFormWrapper">
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};
