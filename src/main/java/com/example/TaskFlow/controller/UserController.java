package com.example.TaskFlow.controller;

import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.TaskRepository;
import com.example.TaskFlow.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()//tells Spring Boot this Class handles API, and not ordinary Java class
@RequestMapping("/users")// defines the root/base url
public class UserController {
    private final UserService userService;

    //injecting the UserService in this Controller
    public UserController(UserService userService){
        this.userService=userService;
    }

    //creating a new User
    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    //
}
