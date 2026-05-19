package com.example.TaskFlow.repository;

import com.example.TaskFlow.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends JpaRepository<Task,Long> {

}
