package com.example.TaskFlow.service;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    //constructor to receive TaskRepository
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    //creating Tasks
    public Task createtask(Task task){
        return taskRepository.save(task);
    }

    //getting all Tasks into list
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }


}
