package com.example.TaskFlow.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UserRegisterRequest {
    @NotBlank(message = "First name  is required!")
    private String firstName;

    @NotBlank(message="last name is required!")
    private String lastName;

    @NotBlank(message="Phone Number is required!")
    @Pattern(regexp = "\\d+", message = "Enter valid Phone Number!")
    private String phone;

    @NotBlank(message="Email is required!")
    @Email
    private String email;

    @NotBlank(message="Password is requiredQ")
    private String password;

    @NotBlank(message = "Role is required!")
    private String role;

}
