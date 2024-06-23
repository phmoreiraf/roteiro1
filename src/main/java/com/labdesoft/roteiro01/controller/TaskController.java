package com.labdesoft.roteiro01.controller;

import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.repository.TaskRepository;
import com.labdesoft.roteiro01.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class TaskController {

@Autowired

    TaskRepository taskRepository;
    @Autowired
    private TaskService taskService;

    @GetMapping("/task")
    @Operation(summary = "Lista todas as tarefas da lista")
    public ResponseEntity<List<Task>> listAll() {
    try {
        List<Task> taskList = taskRepository.findAll();
        if (taskList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }


    @PostMapping("/task")
    @Operation(summary = "Cria uma nova tarefa")
    public ResponseEntity<Task> createTask(@RequestBody Task newTask) {
        try {
            newTask.setCompleted(false);
            Task createdTask = taskRepository.save(newTask);
            return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/task/{id}")
    @Operation(summary = "Exclui uma tarefa")
    public ResponseEntity<HttpStatus> deleteTaskById(@PathVariable("id") Long id) {
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/task/{id}/complete")
    @Operation(summary = "Marca uma tarefa como concluida")
    public ResponseEntity<Task> completeTask(@PathVariable("id") Long id) {
    try {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            Task existingTask = taskData.get();
            existingTask.setCompleted(true); 
            Task updatedTask = taskRepository.save(existingTask);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    } catch (Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    // apagar depois do teste
    @GetMapping("/task/{id}")
    @Operation(summary = "Recupera uma tarefa pelo ID")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
        try {
            Optional<Task> taskData = taskRepository.findById(id);

            if (taskData.isPresent()) {
                Task retrievedTask = taskData.get();
                return new ResponseEntity<>(retrievedTask, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}