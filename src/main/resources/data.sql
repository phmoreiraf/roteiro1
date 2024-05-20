DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(250) NOT NULL,
    type VARCHAR(50) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    dueDate DATE,
    dueDays INT,
    completed BOOLEAN,
    status VARCHAR(100)
);

INSERT INTO task (id, description, type, priority, dueDate, dueDays, completed, status) VALUES
    (1, 'Primeira tarefa', 'DATA', 'ALTA', '2024-04-20', NULL, false, '30 dias de atraso'),
    (2, 'Segunda tarefa', 'PRAZO', 'ALTA', NULL, 5, false, 'Prevista'),
    (3, 'Terceira tarefa', 'DATA', 'ALTA', '2024-04-20', NULL, false, '30 dias de atraso');
