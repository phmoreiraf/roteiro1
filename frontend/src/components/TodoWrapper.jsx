import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import axios from "axios";

const API_URL = "http://localhost:8080/api/task";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => console.error('Erro ao buscar tarefas:', error));
  }, []);

  const addTodo = (todo) => {
    axios.post(API_URL, todo)
      .then(response => {
        setTodos([...todos, response.data]);
      })
      .catch(error => console.error('Erro ao adicionar tarefa:', error));
  };

  const completeTodo = (id) => {
    axios.put(`${API_URL}/${id}/complete`)
      .then(response => {
        setTodos(
          todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      })
      .catch(error => console.error('Erro ao completar tarefa:', error));
  };

  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.error('Erro ao deletar tarefa:', error));
  };

  return (
    <div className="TodoWrapper">
      <div className="TodoSection">
      <div className="todoTaskSection">
        <h2 className="todoTask">Tarefas a fazer:</h2>
        {todos.filter(todo => !todo.completed).map((item) => (
          <TodoList key={item.id} task={item} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))}
        </div>
      <div className="completedSection">
        <h2 className="completedTask">Tarefas concluídas:</h2>
        {todos.filter(todo => todo.completed).map((item) => (
          <TodoList key={item.id} task={item} completeTodo={completeTodo} deleteTodo={deleteTodo} />
        ))}
        </div>
      </div>
      <div className="TodoFormWrapper">
      <h2 className="addTask">Cadastre nova tarefa:</h2>
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
};
