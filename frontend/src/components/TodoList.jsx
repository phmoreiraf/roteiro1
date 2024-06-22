import React from "react";

export const TodoList = ({ task, completeTodo, deleteTodo }) => {
  const handleCheckboxClick = () => {
    completeTodo(task.id);
  };

  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxClick}
      />
      <div 
        className={`custom-checkbox ${task.completed ? "checked" : ""}`} 
        onClick={handleCheckboxClick}
      ></div>
      <div className="task-details">
        <p className="taskName">{task.description}</p>
        {task.date && <p>Data de Término: {task.date}</p>}
        {task.deadline && <p>Prazo: {task.deadline} dias</p>}
        <p>Prioridade: {task.priority}</p>
      </div>
      <span className="delete-btn" onClick={() => deleteTodo(task.id)}>🗑️</span>
    </div>
  );
};
