# TaskFlow

TaskFlow is a backend task management application built with Spring Boot and PostgreSQL. The project helps users create, manage, and track tasks through a RESTful API while following industry-standard backend development practices.

The primary goal of this project is to strengthen practical experience in backend software development, API design, database integration, and application architecture using modern Java technologies.

---

## Features

### User Management
- User registration
- Password encryption using BCrypt
- DTO-based request handling

### Task Management
- Create tasks
- Retrieve all tasks
- Task status management using enums
- Automatic task creation timestamps

### Backend Architecture
- RESTful API development
- Layered architecture (Controller, Service, Repository)
- DTO to Entity mapping
- PostgreSQL database integration
- Spring Data JPA persistence

---

## Technologies Used

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Maven

### Database
- PostgreSQL

### Development Tools
- IntelliJ IDEA
- Postman
- Git
- GitHub

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
└── config
    └── Application configuration
```

---

## Current API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/users | Register a new user |

### Task Endpoints

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/tasks | Create a new task |
| GET | /api/tasks | Retrieve all tasks |

---

## Example Task Request

```json
{
  "taskName": "Implement User Registration",
  "taskDescription": "Create REST API endpoint for user registration"
}
```

### Example Response

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

- Retrieve task by ID
- Update task details
- Delete tasks
- Input validation
- Global exception handling
- JWT Authentication and Authorization
- User-task relationships
- React frontend integration
- Dashboard and task analytics

---

## Learning Objectives

This project is being developed to gain hands-on experience with:

- Java and Spring Boot
- REST API development
- PostgreSQL database design
- Software architecture and design patterns
- Authentication and security
- Full-stack application development

---

## Author

**Richmond Asante**

GitHub: https://github.com/richmondasante5

---

## Project Status

🚧 Active Development

TaskFlow is currently under development, with new features being added incrementally as part of a continuous learning and portfolio-building process.
