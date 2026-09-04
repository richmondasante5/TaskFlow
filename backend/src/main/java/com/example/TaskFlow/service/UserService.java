package com.example.TaskFlow.service;

import com.example.TaskFlow.dto.LoginResponse;
import com.example.TaskFlow.dto.UserRegisterRequest;
import com.example.TaskFlow.entity.User;
import com.example.TaskFlow.repository.UserRepository;
import com.example.TaskFlow.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    UserRegisterRequest userRegisterRequest = new UserRegisterRequest();


    public UserService(UserRepository userRepository, JwtService jwtService){
        this.userRepository = userRepository;
        this.jwtService = jwtService;

    }

    //object responsible for hashing and verifying passwords
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    //creating a user
    public User createUser(UserRegisterRequest userRegisterRequest) {
        //creating User entity object
        User user = new User();

        //copying data from DTO to entity
        user.setFirstName(userRegisterRequest.getFirstName());
        user.setLastName(userRegisterRequest.getLastName());
        user.setPhone(userRegisterRequest.getPhone());
        user.setEmail(userRegisterRequest.getEmail());

        //hashing password before saving
        user.setPassword(
                passwordEncoder.encode(userRegisterRequest.getPassword())
        );

        //setting default role for public registration
        user.setRole("USER");

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

        return userRepository.save(existingUser); // saving updated existing user
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

            // generating JWT token after successful login
            String token = jwtService.generateToken(existingUser.getEmail(), existingUser.getRole());

            // setting login response data
            response.setMessage("Login Successful");
            response.setEmail(existingUser.getEmail());
            response.setRole(existingUser.getRole());
            response.setToken(token);

            return response;
        }

        //runs if password is incorrect
        response.setMessage("Invalid Password!");
        return response;
    }

}
