package com.labdesoft.roteiro01.service;

import com.labdesoft.roteiro01.repository.TaskRepository;
import com.labdesoft.roteiro01.entity.Task;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Operation(summary = "Excluir uma tarefa pelo ID")
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Operation(summary = "Listar todas as tarefas")
    public Page<Task> listAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }
}