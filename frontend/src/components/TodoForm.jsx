import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Baixa");
  const [type, setType] = useState("Livre");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      // Construir novo objeto de tarefa
      const newTodo = {
        description: value,
        completed: false,
        date: type === "Data" ? date : null,
        deadline: type === "Prazo" ? deadline : null,
        priority: priority,
      };
      // Adicionar tarefa
      addTodo(newTodo);
      // Limpar formulário após envio
      setValue("");
      setDate("");
      setDeadline("");
      setPriority("Baixa");
      setType("Livre");
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
              value="Data"
              checked={type === "Data"}
              onChange={(e) => setType(e.target.value)}
            />
            Data
          </label>
          <input
            type="text"
            placeholder="DD/MM/AAAA"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={type !== "Data"}
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="Prazo"
              checked={type === "Prazo"}
              onChange={(e) => setType(e.target.value)}
            />
            Prazo
          </label>
          <input
            type="text"
            placeholder="XX dias"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={type !== "Prazo"}
          />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="type"
              value="Livre"
              checked={type === "Livre"}
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
              value="Alta"
              checked={priority === "Alta"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Alta
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Media"
              checked={priority === "Media"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Média
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="Baixa"
              checked={priority === "Baixa"}
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
