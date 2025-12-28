# Silvestr

A basic single-page web application built with React, TypeScript, and ESLint, deployed on GitHub Pages.

## Features

- ⚛️ React 19 with TypeScript
- 🎨 Modern single-page application
- 🔍 ESLint for code quality
- 🚀 Automated deployment to GitHub Pages via GitHub Actions
- ✅ Testing setup with Jest and React Testing Library

## Live Demo

Visit the live application at: [https://donkeydushan.github.io/silvestr](https://donkeydushan.github.io/silvestr)

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DonkeyDushan/silvestr.git
cd silvestr
```

2. Install dependencies:
```bash
npm install
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run deploy`

Builds and deploys the app to GitHub Pages.

## Technology Stack

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting and quality
- **Create React App** - Build tooling
- **GitHub Pages** - Hosting
- **GitHub Actions** - CI/CD

## Project Structure

```
silvestr/
├── public/          # Static files
├── src/            # Source files
│   ├── App.tsx     # Main application component
│   ├── App.css     # Application styles
│   ├── index.tsx   # Application entry point
│   └── ...
├── .github/
│   └── workflows/  # GitHub Actions workflows
├── package.json    # Project dependencies and scripts
└── tsconfig.json   # TypeScript configuration
```

## Deployment

The application is automatically deployed to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
