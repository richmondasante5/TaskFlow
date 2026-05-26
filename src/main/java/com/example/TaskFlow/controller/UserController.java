package com.example.TaskFlow.controller;

import com.example.TaskFlow.entity.Task;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.TaskRepository;
import com.example.TaskFlow.repository.UserRepository;
import com.example.TaskFlow.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

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
    public User createUser(@Valid @RequestBody User user){
        return userService.createUser(user);
    }

    //getting all the user
    @GetMapping
    public List<User> AllUsers(){
        return userService.getAllUsers();
    }

    //getting user by id
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id){
        return userService.findUserById(id);
    }

    //deleting a specific user
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.deleteUser(id);
    }

    //updating user records
    @PutMapping("/{id}")
    public User updateUserData(@PathVariable Long id, @RequestBody User updateUser){
        return userService.updateUser(id, updateUser);
    }

}
