import React from "react";

export const TodoList = ({ task }) => {
  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <p>{task.description}</p>
      <span className="delete-btn">🗑️</span>
    </div>
  );
};
