package com.example.TaskFlow.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String message; //message user receives upon successful login
    private String email; //email of the user
    private String role; //role of the user
    // JWT token
    private String token;
}
