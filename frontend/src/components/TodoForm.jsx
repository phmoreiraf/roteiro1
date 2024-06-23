import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("BAIXA");
  const [type, setType] = useState("LIVRE");

  const calculateFinalDate = (days) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + parseInt(days, 10));
    return currentDate.toISOString().split('T')[0]; // Retorna no formato YYYY-MM-DD
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      const finalDate = type === "DATA" ? date : type === "PRAZO" ? calculateFinalDate(deadline) : null;

      const newTodo = {
        description: value,
        type: type.toUpperCase(),
        priority: priority.toUpperCase(),
        finalDate: finalDate,
        completed: false
      };

      addTodo(newTodo);
      setValue("");
      setDate("");
      setDeadline("");
      setPriority("BAIXA");
      setType("LIVRE");
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="TaskDetails">
        <label>
          Nome:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="todo-input"
            placeholder="Descrição da Tarefa"
          />
        </label>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="DATA"
              checked={type === "DATA"}
              onChange={(e) => setType(e.target.value)}
            />
            Data
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={type !== "DATA"}
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="PRAZO"
              checked={type === "PRAZO"}
              onChange={(e) => setType(e.target.value)}
            />
            Prazo
          </label>
          <input
            type="number"
            placeholder="XX dias"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={type !== "PRAZO"}
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="LIVRE"
              checked={type === "LIVRE"}
              onChange={(e) => setType(e.target.value)}
            />
            Livre
          </label>
        </div>
        <div className="priority">
          <label>
            <input
              type="radio"
              name="priority"
              value="ALTA"
              checked={priority === "ALTA"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Alta
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="MEDIA"
              checked={priority === "MEDIA"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Média
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="BAIXA"
              checked={priority === "BAIXA"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Baixa
          </label>
        </div>
      </div>
      <button type="submit" className="todo-btn">
        Adicionar Tarefa
      </button>
    </form>
  );
};
