# TaskFlow

TaskFlow is a secure, full-stack task management application built with Java, Spring Boot, React, and PostgreSQL. It enables users to create, assign, track, and manage tasks through a responsive web interface backed by secure REST APIs.

The application is deployed to Microsoft Azure, with a containerized Spring Boot backend, a cloud-hosted PostgreSQL database, and automated CI/CD using GitHub Actions.

## Features

- User authentication with JWT
- Role-Based Access Control (RBAC)
- Secure and protected REST API endpoints
- Task creation, assignment, updating, and deletion
- Task status tracking
- Protected React routes
- PostgreSQL database persistence
- Responsive React interface
- Error handling for API operations

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

## Architecture

```text
                 React Frontend
                       |
                       | HTTPS / REST API
                       v
                Spring Boot Backend
                       |
              Spring Security / JWT
                       |
                       v
                Spring Data JPA
                       |
                       v
                  PostgreSQL
```

## Security

TaskFlow uses Spring Security and JWT-based authentication to protect backend resources. Authenticated requests include a JWT access token, while role-based authorization controls access to protected application functionality.

The React frontend uses protected routes to prevent unauthenticated access to secured pages.

## Deployment

TaskFlow is deployed using Microsoft Azure cloud services:

```text
GitHub
   |
   | GitHub Actions
   v
Docker Build
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

The deployment pipeline automatically builds and deploys application changes through GitHub Actions.

## Application Screenshots

Screenshots of the deployed application will be added as development continues.

## Current Development

User Management is currently being implemented to provide administrative functionality for viewing and managing application users.
