# TaskFlow

TaskFlow is a task management REST API built using Spring Boot and PostgreSQL. The application allows users to register, securely authenticate using JWT, and manage tasks under role-based access control (RBAC). It demonstrates modern backend development practices, including a layered architecture, DTOs, Spring Security, and stateless authentication.

## Features

* User Registration
* Secure Login with JWT Authentication
* Password Encryption using BCrypt
* Role-Based Access Control (RBAC)
* Task Creation, Retrieval, Update, and Deletion
* PostgreSQL Database Integration
* RESTful API Design
* Spring Security Configuration
* DTO-Based Request and Response Handling

## Technology Stack

### Backend

* Java 25
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate

### Database

* PostgreSQL

### Authentication & Security

* JSON Web Tokens (JWT)
* BCrypt Password Encoding
* Role-Based Access Control (RBAC)

### Development Tools

* IntelliJ IDEA
* Postman
* Git
* GitHub

## Project Structure

```text
src/main/java
├── controller
├── service
├── repository
├── entity
├── dto
├── security
└── config
```

### Architecture

```text
Client Request
      ↓
 Controller
      ↓
   Service
      ↓
 Repository
      ↓
 PostgreSQL
```

Authentication Flow:

```text
Login
  ↓
JWT Generated
  ↓
Client Stores Token
  ↓
Bearer Token Sent With Requests
  ↓
JWT Filter Validates Token
  ↓
Security Context Created
  ↓
Access Granted Based On Role
```

## User Roles

The application supports the following roles:

* ADMIN
* MANAGER
* DEVELOPER
* USER

Role permissions are enforced using Spring Security and JWT authentication.

## API Endpoints

### Authentication

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | /users       | Register User |
| POST   | /users/login | Login User    |

### Users

| Method | Endpoint    | Access |
| ------ | ----------- | ------ |
| GET    | /users      | ADMIN  |
| PUT    | /users/{id} | ADMIN  |
| DELETE | /users/{id} | ADMIN  |

### Tasks

| Method | Endpoint    | Access                          |
| ------ | ----------- | ------------------------------- |
| GET    | /tasks      | ADMIN, MANAGER, DEVELOPER, USER |
| POST   | /tasks      | ADMIN, MANAGER, DEVELOPER       |
| PUT    | /tasks/{id} | ADMIN, MANAGER, DEVELOPER       |
| DELETE | /tasks/{id} | ADMIN, MANAGER                  |

## Key Concepts Demonstrated

* Spring Boot REST API Development
* Layered Architecture
* DTO Pattern
* JWT Authentication
* Stateless Security
* Role-Based Access Control (RBAC)
* Password Hashing with BCrypt
* Database Relationships using JPA/Hibernate
* API Testing with Postman

## Future Enhancements

* React Frontend Integration
* Task Assignment Management
* Dashboard Analytics
* Email Notifications
* Pagination and Filtering
* Docker Deployment
* Cloud Deployment

## Author

Richmond Asante

GitHub: https://github.com/richmondasante5
