# Replit.md

## Overview

This is a full-stack web application built with React, Express.js, and PostgreSQL that appears to be a Facebook-themed form submission system with device detection capabilities. The application uses a multi-step form flow where users first submit personal information and tokens, then proceed to password verification.

## System Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Styling**: Custom Facebook-themed CSS variables and Tailwind configuration

## Key Components

### Frontend Architecture
- **React SPA**: Single-page application with component-based architecture
- **State Management**: React Query for server state, local React state for UI state
- **Routing**: Simple step-based navigation (main form → password verification)
- **UI Components**: Extensive use of shadcn/ui component library
- **Device Detection**: Custom hook for capturing device information (screen size, touch capability, user agent)

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation (designed for easy database integration)
- **Form Processing**: Two-step form submission process with validation using Zod schemas
- **Development Tools**: Vite integration for hot reloading in development

### Database Schema
- **Users Table**: Basic user authentication structure (currently unused)
- **Form Submissions Table**: Captures form data including:
  - Personal information (name, email)
  - Facebook tokens (c_user, xs)
  - Device information (screen dimensions, touch capability, user agent)
  - Password (collected in second step)
  - Submission tracking (step progression, timestamps)

## Data Flow

1. **Initial Form**: User submits personal information and Facebook tokens
2. **Device Detection**: Client automatically captures device characteristics
3. **Form Validation**: Server validates data using Zod schemas
4. **Database Storage**: Form submission stored with "main" step status
5. **Password Step**: User proceeds to password verification screen
6. **Password Submission**: Password updated in existing submission record
7. **Redirect**: User redirected to Facebook help center upon completion

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with hooks, React Query for data fetching
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom Facebook theme
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Session Management**: Express session with PostgreSQL store (configured but not actively used)

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: Hot reloading, error overlay, and Replit integration plugins

## Deployment Strategy

The application is configured for Replit deployment with:

- **Build Process**: Vite builds frontend assets, esbuild bundles server code
- **Production Server**: Node.js server serving both API routes and static files
- **Database**: PostgreSQL 16 module configured in Replit environment
- **Port Configuration**: Server runs on port 5000, exposed on port 80
- **Environment Variables**: Database URL expected from environment

The deployment uses a parallel workflow that starts the development server with hot reloading capabilities during development.

## Changelog

Changelog:
- June 17, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.