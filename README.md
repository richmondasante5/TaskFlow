# TaskFlow

TaskFlow is a secure, full-stack task management application built with Java, Spring Boot, React, and PostgreSQL. It provides role-based task management through REST APIs and is deployed to Microsoft Azure using Docker and modern cloud deployment practices.

## Features

- User registration and authentication
- JWT-based authentication and authorization
- Role-Based Access Control (RBAC)
- Task creation, assignment, and management
- Task status tracking
- Secure REST APIs
- PostgreSQL database integration
- Protected frontend routes
- Responsive React interface

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- JWT
- PostgreSQL

### Frontend

- React
- React Router
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
- Azure Role-Based Access Control (RBAC)
- GitHub Actions
- CI/CD
- Git
- GitHub

## Architecture

```text
React Frontend
      |
      | HTTP / REST API
      v
Spring Boot Backend
      |
      | Spring Data JPA
      v
PostgreSQL Database
