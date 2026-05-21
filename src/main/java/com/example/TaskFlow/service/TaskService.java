package com.example.TaskFlow.service;

import com.example.TaskFlow.repository.TaskRepository;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    //constructor to receive TaskRepository
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

}
