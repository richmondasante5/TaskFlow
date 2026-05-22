package com.example.TaskFlow.controller;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.service.TaskService;
import com.example.TaskFlow.service.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController()
@RequestMapping("/tasks")

public class TaskController {
    private final TaskService taskService;


    //injecting TaskService object into this class via default constructor
    public TaskController(TaskService taskService){
        this.taskService=taskService;
    }

    //method for creating a new task
    @PostMapping()
    public Task createNewTask(@RequestBody Task task){
        return taskService.createtask(task);
    }

}