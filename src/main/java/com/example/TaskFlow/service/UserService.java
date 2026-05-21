package com.example.TaskFlow.service;

import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    //creating a user
    public User createUser(User user){
        return userRepository.save(user);
    }

    //getting all users
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //finding User by ID
    public User findUserById(Long id){
       return userRepository.findById(id).orElse(null);
    }
}
