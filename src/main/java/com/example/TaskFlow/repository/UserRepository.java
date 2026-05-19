package com.example.TaskFlow.repository;

import com.example.TaskFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
