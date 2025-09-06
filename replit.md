# Overview

This is a cybersecurity portfolio application showcasing professional experience, skills, projects, and certifications. The app features a terminal-themed dark interface with cybersecurity aesthetics, including animated elements and a responsive design. It serves as a digital resume for a cybersecurity professional named Prathamesh Santosh Pendkar, highlighting expertise in penetration testing, cloud security, SOC operations, and digital forensics.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom cybersecurity-themed design system including terminal aesthetics and neon accent colors
- **UI Components**: Comprehensive component library built on Radix UI primitives (shadcn/ui) providing accessible, unstyled components
- **Animations**: GSAP (Green Sock Animation Platform) loaded dynamically via CDN for scroll-triggered animations and smooth transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management with custom query client configuration

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: Custom Vite integration for hot module replacement in development mode
- **Storage Interface**: Abstracted storage layer with in-memory implementation for user management
- **Error Handling**: Centralized error middleware with structured error responses

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle with Zod schema validation for type-safe database operations
- **Connection**: Neon Database serverless PostgreSQL with connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-backed session storage using connect-pg-simple

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage backend
- **User Model**: Basic user schema with username/password authentication
- **Storage Interface**: Modular storage abstraction supporting CRUD operations for users
- **Security**: Prepared for authentication implementation with user creation and retrieval methods

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **CDN Resources**: 
  - Google Fonts (Inter, JetBrains Mono font families)
  - GSAP and ScrollTrigger animation libraries
- **Development Tools**: 
  - Replit integration for development environment
  - Vite plugins for runtime error overlay and development tooling
- **UI Framework**: Radix UI component primitives for accessible base components
- **Validation**: Zod for runtime type validation and schema definitions