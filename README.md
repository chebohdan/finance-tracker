

## Overview
Application for transaction categorization, integrating AI, backend services, and a modern frontend. It enables secure, role-based management of finances, including shared accounts to track money collaboratively.

## Modules

### 1. Python/Flask
- **Function:** Transaction categorization using a BERT model.
- **Features:** 
  - Processes transaction data.
  - Returns categorized outputs.
  - Exposed via REST API for backend consumption.

### 2. Spring Boot Backend
- **Function:** Core API layer handling authentication, authorization, and data management.
- **Features:**  
  - JWT-based authentication (access & refresh tokens).  
  - Role-based access control.  
  - WebSocket notifications.  
  - Clean database design.  
  - DTO responses/requests to hide entities.  
  - Communicates with Python AI model via REST.

### 3. React/Vite Frontend
- **Function:** User interface for interacting with the system.
- **Features:**  
  - Role-based access.  
  - JWT access and refresh token interceptors.  
  - Custom reusable input components.  
  - Hooks-based state management.  
  - Styled with Tailwind CSS.
