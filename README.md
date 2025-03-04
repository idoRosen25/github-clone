# GitHub Repository Explorer

A React-based web application that enables users to explore GitHub repositories through a user-friendly interface. Users can search for GitHub usernames to view their repositories, sort them by stars, and access detailed information about each repository including its contributors. The application features a modern, responsive design with a clean user interface.

## Tech Stack
- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Data Management**: 
  - React Query for API data fetching and caching
  - Zustand for application state management
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **API**: GitHub REST API v3
- **Styling**: Pure CSS with modern features

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (version 20.0.0 or higher)
- npm (comes with Node.js)

## Running the Project

1. Clone the repository:
```bash
git clone <repository-url>
cd github-repository-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`

Additional commands:
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Run tests: `npm test`

## Features
- Search GitHub repositories by username
- Sort repositories by star count
- View detailed repository information
- See repository contributors
- Responsive design for all screen sizes
- Infinite scroll for repository list
- Persistent search state across navigation
