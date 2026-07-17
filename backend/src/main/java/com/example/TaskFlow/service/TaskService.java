package com.example.TaskFlow.service;

import com.example.TaskFlow.dto.TaskRegisterRequest;
import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.TaskRepository;
import com.example.TaskFlow.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.swing.*;
import java.time.LocalDateTime;
import java.util.List;

import static com.example.TaskFlow.entity.Task.Status.PENDING;
import static org.springframework.boot.web.error.ErrorAttributeOptions.Include.STATUS;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;


    //constructor to receive TaskRepository
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }


    //creating a new Task
    public Task createTask(TaskRegisterRequest taskRegisterRequest){
        Task task  = new Task();
        task.setTaskName(taskRegisterRequest.getTaskName());
        task.setTaskDescription(taskRegisterRequest.getTaskDescription());
        task.setStatus(PENDING);
        task.setCreatedAt(LocalDateTime.now());

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
        return taskRepository.save(existingTask);
    }

    //method for assigning task to a user
    public Task assignTaskToUser(Long taskId, Long userId){

        Task existingTask = taskRepository.findById(taskId).orElse(null);
        User existingUser = userRepository.findById(userId).orElse(null);

        if (existingTask == null || existingUser == null) {
            return null;
        }

        existingTask.setAssignedTo(existingUser);
        return taskRepository.save(existingTask);
    }

}
