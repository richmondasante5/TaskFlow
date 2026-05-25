package com.example.TaskFlow.controller;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.service.TaskService;
import com.example.TaskFlow.service.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    //getting all tasks
    @GetMapping()
    public List<Task> getAllTasks(Task task){
        return taskService.getAllTasks();
    }

    //getting task by id
    @GetMapping("/{id}")
    public Task getFilterById(@PathVariable Long id){
        return taskService.getTaskById(id);
    }

    //Deleting task by id
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskService.deleteById(id);

    }

    //updating some records
    @PutMapping("/{id}")
    public Task UpdateRecord(@PathVariable Long id, @RequestBody Task updatedTask){
         return taskService.updateTaskRecord(id, updatedTask);
    }
}