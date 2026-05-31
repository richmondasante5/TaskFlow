# TaskFlow

TaskFlow is a backend task management application built with Spring Boot and PostgreSQL. The project demonstrates modern backend development practices including layered architecture, DTO-based request and response handling, validation, exception handling, password encryption, and JWT-based authentication.

## Features

### User Management

* User registration
* User login and authentication
* Password encryption using BCrypt
* DTO-based request and response handling
* JWT token generation after successful login

### Task Management

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Task assignment support

### Security

* Password hashing with BCrypt
* JWT token generation
* Request validation
* Global exception handling

## Technologies Used

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok
* JWT (JSON Web Token)
* Git & GitHub
* Postman

## Project Architecture

### Controller Layer

Handles incoming HTTP requests and returns responses.

### Service Layer

Contains business logic and application rules.

### Repository Layer

Handles database operations using Spring Data JPA.

### DTO Layer

Transfers data between clients and the backend while protecting internal entities.

### Security Layer

Responsible for JWT generation and request filtering.

## Current Progress

### Completed

* User Registration
* User Login
* Password Encryption
* DTO Architecture
* Validation and Error Handling
* PostgreSQL Integration
* Task CRUD Operations
* JWT Token Generation
* JWT Authentication Filter Foundation

### In Progress

* JWT Token Validation
* Spring Security Configuration
* Protected API Endpoints
* Role-Based Authorization

## Future Enhancements

* React Frontend
* Dashboard Interface
* Task Status Tracking
* Task Priority Levels
* Due Dates
* Swagger/OpenAPI Documentation
* User-Specific Task Management

## Learning Objectives

This project is being developed as a hands-on learning project to strengthen practical experience with:

* Spring Boot
* REST API Development
* Authentication and Authorization
* Database Design
* Backend Architecture
* Full-Stack Development
