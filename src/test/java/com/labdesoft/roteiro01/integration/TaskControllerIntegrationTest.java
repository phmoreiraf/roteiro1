package com.labdesoft.roteiro01.integration;

import com.labdesoft.roteiro01.Roteiro01Application;
import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.enums.Priority;
import com.labdesoft.roteiro01.enums.TaskType;
import com.labdesoft.roteiro01.repository.TaskRepository;

import io.restassured.RestAssured;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.get;
import static org.hamcrest.Matchers.equalTo;


import static io.restassured.RestAssured.given;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(classes = Roteiro01Application.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080";
        RestAssured.port = 8080;

    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
        get("/api/task").then().statusCode(200);
    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasOneTask_thenCorrect() {
        get("/api/task/1").then().statusCode(200)
                .assertThat().body("description", equalTo("Primeira tarefa"));
    }

    @Test
    public void givenTask_whenPostTask_thenCorrect() {
        String taskJson = "{ \"description\": \"Quarta tarefa\", \"type\": \"DATA\", \"priority\": \"ALTA\", \"dueDate\": null, \"dueDays\" : null , \"completed\" : false, \"status\" : \"Prevista\"}";
        given()
                .header("Content-Type", "application/json")
                .body(taskJson)
                .post("/api/task")
                .then()
                .statusCode(201)
                .assertThat().body("description", equalTo("Quarta tarefa"));
    }

    @Test
    public void givenUpdatedTask_whenPutTask_thenCorrect() {
        // Crie uma instância do enum correspondente ao tipo e prioridade da tarefa
        TaskType taskType = TaskType.DATA; // Suponha que DATA é um valor válido do enum TaskType
        Priority taskPriority = Priority.ALTA; // Suponha que ALTA é um valor válido do enum TaskPriority

        // Crie uma tarefa usando os enums
        Task task = new Task();
        task.setDescription("Quarta tarefa");
        task.setType(taskType); // Defina o tipo usando o enum
        task.setPriority(taskPriority); // Defina a prioridade usando o enum
        task.setDueDate(null); // Defina a data de vencimento como null
        task.setDueDays(null); // Defina os dias de vencimento como null
        task.setCompleted(false); // Define como não concluída

        // Salve a tarefa usando o repositório
        taskRepository.save(task);
    

        // Atualize a tarefa criada
        String updateTaskJson = "{ \"id\": " + task.getId()
                + ", \"description\": \"Tarefa atualizada\", \"type\": \"DATA\", \"priority\": \"MEDIA\", \"dueDate\": \"2024-12-31\" }";
        given()
                .header("Content-Type", "application/json")
                .body(updateTaskJson)
                .put("/api/task/" + task.getId())
                .then()
                .statusCode(200)
                .assertThat().body("description", equalTo("Quarta"));
    }

    @Test
    public void givenTaskId_whenDeleteTask_thenCorrect() {
        RestAssured.delete("/api/task/1")
                .then()
                .statusCode(204);
    }

    @Test
    public void givenTaskId_whenPutCompleteTask_thenCorrect() {
        RestAssured.put("/api/task/1/complete")
                .then()
                .statusCode(200)
                .assertThat().body("completed", equalTo(true));
    }
}
