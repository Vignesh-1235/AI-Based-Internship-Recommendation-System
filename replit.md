# replit.md

## Overview

This is an AI-powered internship recommendation engine designed for the PM Internship Scheme, specifically targeting first-generation learners. The platform helps users discover personalized internship opportunities by collecting their education background, interests, skills, and location preferences through an interactive multi-step form. It uses a decision tree algorithm to match users with relevant internships and presents recommendations in an engaging, government portal-inspired interface.

The application features a modern React-based frontend with animated components, dark/light theme support, multi-language capabilities, and a comprehensive UI component library built with shadcn/ui and Radix UI primitives.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application using React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state and React hooks for local state
- **Animation**: Framer Motion for smooth transitions and micro-interactions
- **Styling**: Tailwind CSS with a custom design system supporting light/dark themes

### Component Design System
- **Base Components**: Built on Radix UI primitives for accessibility
- **UI Library**: shadcn/ui component collection with custom variants
- **Theme System**: CSS custom properties with automatic dark mode switching
- **Typography**: Inter and Poppins fonts with government portal aesthetic
- **Color Palette**: Blue and orange primary colors with neutral backgrounds

### Data Architecture
- **Decision Tree Engine**: Client-side algorithm for internship matching based on user profiles
- **Mock Data Layer**: Comprehensive internship dataset with categorization and filtering
- **User Profiles**: Education, skills, interests, and location preference collection
- **Match Scoring**: Percentage-based compatibility system with detailed reasoning

### Backend Architecture
- **Express.js Server**: RESTful API with middleware for logging and error handling
- **Database Layer**: Drizzle ORM with PostgreSQL (Neon serverless)
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Development Setup**: Vite development server with HMR and error overlay

### Build and Development
- **Build System**: Vite for frontend bundling, esbuild for server compilation
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Development Tools**: Hot module replacement, runtime error modal, and development banner
- **Asset Management**: Static asset serving with alias resolution

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript support
- **Routing**: Wouter for lightweight routing
- **State Management**: TanStack React Query for server state management
- **Animation**: Framer Motion for animations and transitions

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icon library
- **Utility Libraries**: clsx and class-variance-authority for conditional styling

### Database and Backend
- **Database**: PostgreSQL via Neon serverless (@neondatabase/serverless)
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Validation**: Zod for schema validation and type safety
- **Session Store**: connect-pg-simple for PostgreSQL session management

### Development Tools
- **Build Tools**: Vite, esbuild, tsx for development execution
- **Replit Integration**: Vite plugins for error handling and cartographer
- **Form Handling**: React Hook Form with Hookform resolvers
- **Date Utilities**: date-fns for date manipulation

### Additional Utilities
- **WebSocket Support**: ws package for Neon database connections
- **Utilities**: memoizee for function memoization, nanoid for ID generation
- **Command Interface**: cmdk for command palette functionality