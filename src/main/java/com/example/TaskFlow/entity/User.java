package com.example.TaskFlow.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Getter
//@Setter
//@NoArgsConstructor

@Data//includes the annotations commented above
@Entity
@NoArgsConstructor()

@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

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



    //initializing the object of User
    public User(Long id) {
        this.id = id;// the id of the user=id; (thus, User.id=Long id)
    }

    //full constructor
    public User(Long id, String firstName, String lastName, String email, String password, String phone, String role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = role;
    }



}
