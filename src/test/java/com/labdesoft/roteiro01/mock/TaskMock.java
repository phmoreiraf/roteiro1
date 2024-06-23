package com.labdesoft.roteiro01.mock;

import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.entity.TaskPriority;
import com.labdesoft.roteiro01.entity.TaskType;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class TaskMock {
public static List<Task> createTasks() {
        List<Task> tasks = new ArrayList<>();

        // Criando algumas tarefas fictícias
        Task task1 = new Task("Descrição da Tarefa 1", TaskType.DATA, TaskPriority.ALTA);
        task1.setFinalDate(LocalDate.now().plusDays(7)); // Defina a data final da tarefa
        task1.setCompleted(false); // Defina se a tarefa está completa ou não

        Task task2 = new Task("Descrição da Tarefa 2", TaskType.PRAZO, TaskPriority.MEDIA);
        task2.setFinalDate(LocalDate.now().plusDays(5)); // Defina a data final da tarefa
        task2.setCompleted(true); // Defina se a tarefa está completa ou não

        // Adicionando as tarefas à lista
        tasks.add(task1);
        tasks.add(task2);

        return tasks;
    }
}

