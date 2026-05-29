package com.example.TaskFlow.dto;

import lombok.Data;

@Data
public class LoginRequest {

    /* this dto is used to prevent the api from exposing fields in the user table */
    private String email;// email user enters during login
    private String password;// password user enters during login

}
