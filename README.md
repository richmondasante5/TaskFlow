# TaskFlow

TaskFlow is a Spring Boot REST API for task and user management. The project is designed to demonstrate modern backend development practices including layered architecture, DTO-based request/response handling, validation, exception handling, authentication, and relational database integration.

## Features

### User Management

* User registration
* User login
* Password encryption using BCrypt
* DTO-based request and response handling
* JWT token generation after successful authentication

### Task Management

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Task assignment support

### Security

* Password hashing with BCrypt
* JWT token generation
* Input validation
* Global exception handling

### Technologies Used

* Java
* Spring Boot
* Spring Data JPA
* PostgreSQL
* Maven
* Lombok
* JWT (JSON Web Token)

### Project Structure

* controller/ – REST API endpoints
* service/ – Business logic
* repository/ – Database access layer
* entity/ – Database entities
* dto/ – Request and response objects
* exception/ – Global exception handling
* security/ – JWT authentication components

### Current Progress

* User registration implemented
* User login implemented
* DTO architecture implemented
* Password encryption implemented
* JWT token generation implemented
* Task CRUD operations implemented
* PostgreSQL integration completed

### Planned Enhancements

* JWT validation filter
* Role-based authorization
* React frontend
* Task ownership and permissions
* Dashboard and reporting features
