# Cortex Fullstack Project

A modern fullstack application built with React + Vite for the frontend and Next.js for the backend.

## Project Structure

```
cortex-fullstack/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
├── backend/           # Next.js backend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── next.config.js
├── package.json       # Root workspace configuration
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (>= 18.0.0)
- npm (>= 9.0.0)

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd cortex-fullstack
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```
   This will start both frontend (http://localhost:5173) and backend (http://localhost:3000) concurrently.

## Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend (React + Vite)
- `npm run dev:backend` - Start only the backend (Next.js)
- `npm run build` - Build both frontend and backend for production
- `npm run build:frontend` - Build only the frontend
- `npm run build:backend` - Build only the backend
- `npm run install:all` - Install dependencies for all workspaces
- `npm run clean` - Remove all node_modules directories
- `npm run lint` - Run linting for both frontend and backend
- `npm run lint:frontend` - Run linting for frontend only
- `npm run lint:backend` - Run linting for backend only

### Frontend Scripts (React + Vite)

Navigate to `frontend/` directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (Next.js)

Navigate to `backend/` directory:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

### Backend
- **Next.js** - React framework with API routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## Development

### Frontend Development
The frontend is a React application with Vite. It runs on `http://localhost:5173` in development mode.

Key features:
- Hot module replacement (HMR)
- TypeScript support
- ESLint configuration
- Modern build tooling with Vite

### Backend Development
The backend is a Next.js application with API routes. It runs on `http://localhost:3000` in development mode.

Key features:
- API routes for backend functionality
- Server-side rendering (SSR)
- Static site generation (SSG)
- Tailwind CSS for styling
- TypeScript support

### API Integration
The frontend can communicate with the backend through API calls to `http://localhost:3000/api/*` endpoints.

## Production Deployment

1. **Build the applications:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Frontend: Deploy the `frontend/dist` directory to any static hosting service
   - Backend: Deploy the Next.js application to Vercel, Netlify, or your preferred hosting platform

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting: `npm run lint`
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

MIT
