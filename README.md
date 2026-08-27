# TaskFlow

**Secure Full-Stack Task Management Platform | Java • Spring Boot • React • PostgreSQL • Docker • Azure • CI/CD**

TaskFlow is a production-deployed full-stack task management application built to demonstrate secure backend development, modern React frontend development, cloud deployment, and automated CI/CD.

The platform provides authenticated task and user management with **JWT authentication, role-based access control (RBAC), protected REST APIs, PostgreSQL persistence, Docker containerization, and Microsoft Azure deployment**.

---

## 🎥 Application Demo

▶️ [Watch the TaskFlow Demo on YouTube](https://youtu.be/Kd6N09ep9Aw)

A short walkthrough of the deployed application demonstrating authentication, task management, user management, role-based access control, and core application workflows.

---


## Application Preview

> Screenshots below showcase the deployed TaskFlow application.

### Login & Authentication

<img width="367" height="415" alt="image" src="https://github.com/user-attachments/assets/dd939ce8-aad7-49e4-bef5-26099fae187c" />



### Dashboard

<img width="950" height="423" alt="image" src="https://github.com/user-attachments/assets/cd9224f7-7e7f-4fc7-adc9-327fdfff45d5" />



### Task Management

<img width="953" height="409" alt="image" src="https://github.com/user-attachments/assets/085aaec9-342c-42df-902b-bf9829c269c3" />



### User Management

<img width="945" height="406" alt="image" src="https://github.com/user-attachments/assets/ae2125ae-0058-49f7-8dc1-93bda9f605c4" />



---

## Key Features

### Authentication & Security

- Secure user authentication using JWT
- Spring Security integration
- Role-Based Access Control (RBAC)
- Protected backend REST API endpoints
- Protected React routes
- Authorization headers for authenticated API requests
- Role-restricted administrative functionality

### Task Management

- Create, view, update, and delete tasks
- Assign tasks to application users
- Track task status
- Manage task information through a responsive interface
- Persistent task storage using PostgreSQL

### User Management

- Administrative user management
- Create new users
- View registered users
- Update user information and roles
- Delete users
- Assign application roles
- Restrict User Management functionality to administrators

### Frontend

- Responsive React interface
- React Router navigation
- Shared authentication state using React Context
- Axios-based REST API integration
- Loading and error handling
- Conditional UI rendering based on user roles

---

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- JWT Authentication
- PostgreSQL

### Frontend

- React
- React Router
- React Context API
- Axios
- Tailwind CSS
- Bootstrap

### Cloud & DevOps

- Docker
- Microsoft Azure
- Azure App Service
- Azure Container Registry (ACR)
- Azure Static Web Apps
- Azure Managed Identity
- Azure Role-Based Access Control
- GitHub Actions
- CI/CD
- Git
- GitHub

---

## Architecture

```text
                  React Frontend
                        |
                        | HTTPS / REST API
                        |
                        v
                Spring Boot REST API
                        |
               Spring Security + JWT
                        |
                        v
                  Service Layer
                        |
                        v
                 Spring Data JPA
                        |
                        v
                    PostgreSQL
```

TaskFlow follows a layered application architecture that separates the frontend, REST API, business logic, security, and persistence layers.

---

## Authentication Flow

```text
User enters credentials
        |
        v
React Login
        |
        | POST /login
        v
Spring Boot API
        |
        v
Spring Security
        |
        | Successful authentication
        v
JWT generated
        |
        v
React receives token
        |
        | Authorization: Bearer <token>
        v
Protected REST API requests
```

The frontend uses the authenticated user's token when communicating with protected backend endpoints.

---

## Role-Based Access Control

TaskFlow supports role-based application access, including:

- `ADMIN`
- `MANAGER`
- `DEVELOPER`
- `USER`

Administrative functionality such as **User Management** is restricted based on the authenticated user's role.

Authorization is enforced by the backend using Spring Security, while the frontend conditionally exposes functionality based on the authenticated user's permissions.

---

## Cloud Deployment

TaskFlow is deployed on Microsoft Azure using a containerized backend architecture.

```text
                    GitHub
                       |
                       | Push
                       v
                GitHub Actions
                       |
                       | Build
                       v
                  Docker Image
                       |
                       v
           Azure Container Registry
                       |
                       v
              Azure App Service
                       |
                       v
               Spring Boot API


                React Frontend
                       |
                       v
             Azure Static Web Apps
```

### Deployment Infrastructure

**Backend**
- Spring Boot application packaged using Docker
- Docker image stored in Azure Container Registry
- Container deployed through Azure App Service

**Frontend**
- React application deployed using Azure Static Web Apps

**CI/CD**
- GitHub Actions automatically builds and deploys application changes

---

## Project Highlights

TaskFlow demonstrates hands-on experience with:

- Full-stack application development
- REST API design and integration
- Authentication and authorization
- JWT-based security
- Role-Based Access Control
- React state and context management
- CRUD operations
- Relational database persistence
- Docker containerization
- Cloud application deployment
- CI/CD automation
- Git-based development workflow

---

## Testing

Automated backend testing with **JUnit and Mockito** is the next engineering enhancement planned for TaskFlow.

The goal is to integrate automated tests into the CI/CD pipeline so application functionality is validated before deployment.

---

## Upcoming Engineering Enhancements

- JUnit automated testing
- Mockito-based service-layer testing
- Automated test execution in GitHub Actions
- Event-driven communication using Apache Kafka
- Kubernetes container orchestration
- Further architecture improvements

---

## Project Status

**Actively developed and deployed.**

Core functionality currently includes:

- Authentication
- Authorization
- Task management
- User management
- PostgreSQL persistence
- React frontend
- Docker containerization
- Azure cloud deployment
- GitHub Actions CI/CD

Additional automated testing and distributed-system enhancements are being implemented as the project evolves.
