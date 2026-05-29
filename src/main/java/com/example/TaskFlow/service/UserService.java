package com.example.TaskFlow.service;

import com.example.TaskFlow.dto.LoginResponse;
import com.example.TaskFlow.dto.RegisterRequest;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    RegisterRequest registerRequest = new RegisterRequest();


    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    //object responsible for hashing and verifying passwords
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //creating a user
    public User createUser(RegisterRequest registerRequest) {

        //creating User entity object
        User user = new User();

        //copying data from DTO to entity
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPhone(registerRequest.getPhone());
        user.setEmail(registerRequest.getEmail());

        //hashing password before saving
        user.setPassword(
                passwordEncoder.encode(registerRequest.getPassword())
        );

        user.setRole(registerRequest.getRole());

        //saving user entity to database
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
    public LoginResponse loginUser(String email, String password) {

        LoginResponse response = new LoginResponse();

        //searching database for user with provided email
        User existingUser = userRepository.findByEmail(email).orElse(null);

        //checking if user exists
        if (existingUser == null) {
            response.setMessage("User not found!");
            return response;
        }

        //checking if passwords match
        if (passwordEncoder.matches(password, existingUser.getPassword())) {

            //response.setMessage("Login Successful");
            response.setEmail(existingUser.getEmail());
            response.setRole(existingUser.getRole());

            return response;
        }

        //runs if password is incorrect
        response.setMessage("Invalid Password!");
        return response;
    }

}
