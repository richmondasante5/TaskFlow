package com.example.TaskFlow.repository;

import com.example.TaskFlow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //method for finding user by email
    Optional<User> findByEmail(String email); // spring does this
}
