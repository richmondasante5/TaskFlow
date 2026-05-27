package com.example.TaskFlow.service;

import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    //object responsible for hashing and verifying passwords
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //creating a user
    public User createUser(User user){
        //hashing raw password before saving to database
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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

    //method for deleting user by id
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    //updating User Records
    public User updateUser(Long id, User updatedUser){

        User existingUser= userRepository.findById(id).orElse(null);

        //checking if the user exist
        if(existingUser==null){
            return null;
        }
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setEmail(updatedUser.getEmail());

        return  userRepository.save(updatedUser);//saving updates
    }

    //method for user login/authentication
    public String loginUser(String email, String password) {

        //searching database for user with provided email
        User existingUser = userRepository.findByEmail(email).orElse(null);

        //checking if user exists
        if (existingUser == null) {
            return "User not found";
        }

        //checking if passwords match
        if (passwordEncoder.matches(password, existingUser.getPassword())) {
            return "Login successful";
        }

        //runs if password is incorrect
        return "Invalid password";
    }
}
