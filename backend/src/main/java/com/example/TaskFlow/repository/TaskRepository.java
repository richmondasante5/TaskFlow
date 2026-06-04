package com.example.TaskFlow.repository;

import com.example.TaskFlow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task,Long> {
    Optional<Task> findByStatus(String Status);//selecting all tasks by their status
}
