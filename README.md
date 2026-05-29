# TaskFlow

TaskFlow is a backend task management application built with Spring Boot and PostgreSQL. The project enables users to create, manage, update, and track tasks through a RESTful API while following industry-standard backend development practices.

The primary goal of this project is to gain hands-on experience with Java, Spring Boot, REST API development, database integration, and software architecture by building a practical task management system.

---

## Features

### User Management

* User registration
* Password encryption using BCrypt
* Retrieve all users
* Retrieve user by ID
* DTO-based request handling

### Task Management

* Create tasks
* Retrieve all tasks
* Retrieve task by ID
* Update tasks
* Delete tasks
* Task status management using enums
* Automatic task creation timestamps
* User-task relationships

### Backend Architecture

* RESTful API development
* Layered architecture (Controller, Service, Repository)
* DTO to Entity mapping
* Validation
* Exception handling
* PostgreSQL database integration
* Spring Data JPA persistence

---

## Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Maven

### Database

* PostgreSQL

### Development Tools

* IntelliJ IDEA
* Postman
* Git
* GitHub

---

## Project Structure

```text
src/main/java
│
├── controller
│   └── Handles API requests and responses
│
├── service
│   └── Contains business logic
│
├── repository
│   └── Handles database operations
│
├── entity
│   └── Database entities
│
├── dto
│   └── Data Transfer Objects
│
├── exception
│   └── Custom exceptions and error handling
│
└── config
    └── Application configuration
```

---

## Current API Endpoints

### User Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /api/users      | Register a new user |
| GET    | /api/users      | Retrieve all users  |
| GET    | /api/users/{id} | Retrieve user by ID |

### Task Endpoints

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /api/tasks      | Create a new task   |
| GET    | /api/tasks      | Retrieve all tasks  |
| GET    | /api/tasks/{id} | Retrieve task by ID |
| PUT    | /api/tasks/{id} | Update task         |
| DELETE | /api/tasks/{id} | Delete task         |

---

## Example Task Request

```json
{
  "taskName": "Implement User Registration",
  "taskDescription": "Create REST API endpoint for user registration"
}
```

### Example Task Response

```json
{
  "id": 1,
  "taskName": "Implement User Registration",
  "taskDescription": "Create REST API endpoint for user registration",
  "status": "PENDING",
  "createdAt": "2026-05-29T14:30:00"
}
```

---

## Planned Features

* JWT Authentication and Authorization
* React Frontend Integration
* Dashboard and Task Analytics

---

## Learning Objectives

This project is being developed to gain practical experience with:

* Java and Spring Boot
* REST API development
* PostgreSQL database design
* Software architecture and design patterns
* Authentication and security
* Full-stack application development

---

## Author

**Richmond Asante**

GitHub: https://github.com/richmondasante5

---

## Project Status

🚧 Active Development

TaskFlow is currently under active development, with JWT authentication, React frontend integration, and dashboard analytics planned for future releases.
