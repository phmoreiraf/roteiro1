import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      // adicionar tarefa
      addTodo(value);
      // limpar formulário apos envio
      setValue("");
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
            <input type="radio" name="type" value="data" />
            Data
          </label>
          <input type="text" placeholder="DD/MM/AAAA" disabled />
        </div>
        <div>
          <label>
            <input type="radio" name="type" value="prazo" />
            Prazo
          </label>
          <input type="text" placeholder="XX dias" disabled />
        </div>
        <div>
          <label>
            <input type="radio" name="type" value="livre" />
            Livre
          </label>
        </div>
        <div className="priority">
          <label>
            <input type="radio" name="priority" value="alta" />
            Alta
          </label>
          <label>
            <input type="radio" name="priority" value="media" />
            Média
          </label>
          <label>
            <input type="radio" name="priority" value="baixa" />
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
