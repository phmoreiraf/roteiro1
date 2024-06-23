package com.labdesoft.roteiro01.integration;


import com.labdesoft.roteiro01.Roteiro01Application;
import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.repository.TaskRepository;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.ActiveProfiles;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(classes = Roteiro01Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class TaskControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    public void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = port;
        taskRepository.deleteAll(); // Limpa os dados antes de cada teste
    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasRequiredKV_thenCorrect() {
        // Adiciona uma tarefa para garantir que haja pelo menos uma na lista
        Task task = new Task();
        task.setDescription("Primeira tarefa");
        taskRepository.save(task);

        // Testa a rota /task para verificar se a resposta é 200 OK
        given()
            .contentType("application/json")
        .when()
            .get("/api/task")
        .then()
            .statusCode(200);
    }

    @Test
    public void givenUrl_whenSuccessOnGetsResponseAndJsonHasOneTask_thenCorrect() {
        // Adiciona uma tarefa para garantir que haja pelo menos uma na lista
        Task task = new Task();
        task.setDescription("Primeira tarefa");
        taskRepository.save(task);

        // Testa a rota /task/{id} para verificar se a resposta é 200 OK e a descrição está correta
        given()
            .contentType("application/json")
        .when()
            .get("/api/task/{id}", task.getId())
        .then()
            .statusCode(200)
            .assertThat()
            .body("description", equalTo("Primeira tarefa"));
    }
}