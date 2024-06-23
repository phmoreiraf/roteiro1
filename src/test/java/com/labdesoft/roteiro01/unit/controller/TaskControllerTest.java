package com.labdesoft.roteiro01.unit.controller;
import com.labdesoft.roteiro01.controller.TaskController;
import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setUp() {
        // Configura o comportamento do mock do taskRepository para o método save
        when(taskRepository.save(any(Task.class)))
                .thenAnswer(invocation -> {
                    Task savedTask = invocation.getArgument(0);
                    savedTask.setId(1L); // Supondo que o ID seja atribuído ao salvar
                    return savedTask;
                });
    }

    @Test
    @DisplayName("Should create a new task")
    public void shouldCreateNewTask() {
        // Cria uma nova tarefa para o teste
        Task newTask = new Task();
        newTask.setDescription("Nova Tarefa");

        // Chama o método createTask() no controller
        ResponseEntity<Task> responseEntity = taskController.createTask(newTask);

        // Verifica se a resposta é bem-sucedida
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        // Verifica se a tarefa retornada possui um ID não nulo
        Task createdTask = responseEntity.getBody();
        assertEquals(1L, createdTask.getId()); // Supondo que o ID atribuído seja 1
        assertEquals("Nova Tarefa", createdTask.getDescription()); // Verifica se a descrição está correta
    }
}