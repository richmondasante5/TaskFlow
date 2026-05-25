package com.example.TaskFlow.service;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.swing.*;
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

    //getting task by id. This returns one task
    public Task getTaskById(Long id){

        return taskRepository.findById(id).orElse(null);
    }

    //deleting task by id
    public void deleteById(Long id){
        taskRepository.deleteById(id);
    }

    //method for updating task record or data
    public Task updateTaskRecord(Long id, Task updatedTask){

        //checking if the selected task id exist
        Task existingTask = taskRepository.findById(id).orElse(null);

        if (existingTask==null){
            return null;
        }
        //updated values
        existingTask.setTaskName(updatedTask.getTaskName());
        existingTask.setTaskDescription(updatedTask.getTaskDescription());
        existingTask.setUpdatedAt(updatedTask.getUpdatedAt());
        existingTask.setStatus(updatedTask.getStatus());
        existingTask.setDeletedAt(updatedTask.getDeletedAt());
        return taskRepository.save(updatedTask);
    }

}
