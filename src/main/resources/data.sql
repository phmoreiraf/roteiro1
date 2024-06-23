DROP TABLE IF EXISTS task;

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(250) NOT NULL,
    type ENUM('DATA', 'PRAZO', 'LIVRE') NOT NULL,
    priority ENUM('ALTA', 'MEDIA', 'BAIXA') NOT NULL,
    finalDate DATE,
    completed BOOLEAN DEFAULT 0
);

INSERT INTO task (description, type, priority, finalDate, completed) VALUES
('Primeira tarefa', 'DATA', 'ALTA', '2024-12-31', false),
('Segunda tarefa', 'PRAZO', 'MEDIA', '2024-11-30', false),
('Terceira tarefa', 'LIVRE', 'BAIXA', NULL, false),
('Quarta tarefa', 'DATA', 'BAIXA', '2024-10-15', true),
('Quinta tarefa', 'PRAZO', 'ALTA', '2024-08-25', true),
('Sexta tarefa', 'LIVRE', 'MEDIA', NULL, false);
