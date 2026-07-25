# TaskFlow

TaskFlow is a secure, full-stack task management application built with Java, Spring Boot, React, and PostgreSQL. It provides role-based task management through REST APIs and is being deployed to Microsoft Azure using Docker and modern cloud deployment practices.

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
- Azure Managed Identity
- Azure Role-Based Access Control (RBAC)
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
```

## Cloud Deployment Architecture

```text
Source Code
     |
     v
Docker Image
     |
     v
Azure Container Registry (ACR)
     |
     | AcrPull
     v
Azure App Service
     |
     v
Spring Boot REST API
     |
     v
PostgreSQL
```

The Spring Boot backend is containerized using Docker and published to Azure Container Registry (ACR).

Azure App Service uses a Managed Identity with Azure Role-Based Access Control (RBAC) to securely access container images stored in ACR without requiring registry credentials to be stored directly in the application.

The `AcrPull` role follows the principle of least privilege by allowing the App Service identity to pull container images without granting unnecessary push or administrative permissions.

## Security

TaskFlow implements security at both the application and cloud infrastructure levels.

### Application Security

- Spring Security
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Protected REST API endpoints
- Protected React routes

### Cloud Security

- Azure Managed Identity
- Azure Role-Based Access Control (RBAC)
- Least-privilege access to Azure Container Registry
- Environment-based application configuration

## Project Structure

### Backend

- Authentication & Authorization
- User Management
- Task Management
- REST API Layer
- Service Layer
- Data Access Layer
- Database Integration

### Frontend

- Login & Registration
- Dashboard
- Task Management
- Protected Routes
- Responsive User Interface

## Getting Started

### Backend

1. Clone the repository.

```bash
git clone https://github.com/richmondasante5/TaskFlow.git
```

2. Configure the PostgreSQL database and required environment variables.

3. Run the Spring Boot application.

### Frontend

Navigate to the frontend directory and install the required dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

## Docker

The Spring Boot backend is containerized with Docker, allowing the application to run consistently across development and cloud environments.

Build the Docker image:

```bash
docker build -t taskflow-api .
```

Run the container:

```bash
docker run -p 8080:8080 taskflow-api
```

## Current Development

TaskFlow is actively being developed and deployed.

Current work includes:

- Completing Azure App Service deployment
- Implementing CI/CD pipelines with GitHub Actions
- Automating Docker image builds and Azure deployments
- Improving the frontend UI/UX with Tailwind CSS
- Expanding automated testing

## CI/CD

A GitHub Actions CI/CD pipeline is currently being implemented to automate the application delivery process.

The target workflow is:

```text
GitHub Push
     |
     v
GitHub Actions
     |
     v
Build & Test
     |
     v
Docker Image
     |
     v
Azure Container Registry
     |
     v
Azure App Service
```

Once completed, application changes pushed to GitHub will be automatically built, tested, containerized, published to Azure Container Registry, and deployed to Azure App Service.

## Planned Enhancements

- Task filtering and search
- Email notifications
- Dashboard analytics
- Additional automated tests
- Frontend UI/UX improvements

## Author

**Richmond Asante**

GitHub: github.com/richmondasante5  
LinkedIn: linkedin.com/in/richmondasante5
