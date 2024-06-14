import React from "react";

export const TodoList = ({ task, completeTodo, deleteTodo }) => {
  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => completeTodo(task.id)}
        />
        <p>{task.description}</p>
        {task.date && <p>Data de Término: {task.date}</p>}
        {task.deadline && <p>Prazo: {task.deadline} dias</p>}
        <p>Prioridade: {task.priority}</p>
      </div>
      <span className="delete-btn" onClick={() => deleteTodo(task.id)}>🗑️</span>
    </div>
  );
};