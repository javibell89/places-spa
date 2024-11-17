# Places SPA

A Single Page Application for sharing and managing places. Built with React and Vite, this frontend application allows users to create, view, and manage places with an intuitive user interface.

## Features

- 🔐 User Authentication
- 📍 Place Management
  - Create new places
  - Update existing places
  - View places by user
- 🗺️ Map Integration
- 📱 Responsive Navigation
- 🖼️ Image Upload Support
- 🎨 Modern UI Components
- 🔄 Form Validation

## Tech Stack

- React 18
- React Router v6
- React Transition Group
- Vite
- CSS

## Project Structure

```
src/
├── places/                 # Places feature
│   ├── components/        # Place-related components
│   └── pages/            # Place-related pages
├── shared/                # Shared utilities and components
│   ├── components/       # Reusable UI components
│   ├── context/         # React context
│   ├── hooks/          # Custom hooks
│   └── util/          # Utility functions
├── user/                  # User feature
│   ├── components/      # User-related components
│   └── pages/          # User-related pages
└── App.jsx              # Main application component
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Project Features

### Components

- **Navigation**

  - MainNavigation
  - NavLinks
  - SideDrawer

- **UI Elements**

  - Avatar
  - Card
  - Modal
  - Map
  - LoadingSpinner
  - ErrorModal

- **Form Elements**
  - Input
  - Button
  - ImageUpload

### Custom Hooks

- `auth-hook` - Authentication state management
- `form-hook` - Form state and validation
- `http-hook` - HTTP request handling

### Context

- `auth-context` - Global authentication state management
