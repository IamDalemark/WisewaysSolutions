# WISEWAYS SOLUTIONS

A comprehensive web application built with modern development practices and comprehensive testing capabilities.

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm package manager

## Installation

Install project dependencies:

```bash
npm install
```

## Environment Configuration

Create the following environment files in the root directory:

| File               | Purpose                           |
| ------------------ | --------------------------------- |
| `.env`             | Production environment variables  |
| `.env.development` | Development environment variables |
| `.env.test`        | Testing environment variables     |

**Note:** Ensure all three environment files are properly configured before running the application.

## Development

### Running the Application

Choose the appropriate command based on your environment:

**Development Environment:**

```bash
npm run dev
```

**Test Environment:**

```bash
npm run test
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Code Quality

**Linting:**

```bash
npm run lint
```

**Storybook (Component Documentation):**

```bash
npm run storybook
```

## Testing

This project includes comprehensive testing with both unit tests (Jest) and end-to-end tests (Cypress).

### Unit Testing with Jest

**Option 1: Separate Terminal Processes**

1. Start the development server:

```bash
npm run test
```

2. In a new terminal, run Jest tests:

```bash
npm run test:jest
```

**Option 2: Concurrent Execution**

```bash
npm run test:jest--concurrent
```

### End-to-End Testing with Cypress

**Option 1: Separate Terminal Processes**

1. Start the development server:

```bash
   npm run test
```

2. In a new terminal, run Cypress tests:

```bash
   npm run test:cypress
```

**Option 2: Concurrent Execution**

```bash
npm run test:cypress--concurrent
```

## Available Scripts

| Command                            | Description                                           |
| ---------------------------------- | ----------------------------------------------------- |
| `npm run dev`                      | Start development server                              |
| `npm run test`                     | Start test environment server                         |
| `npm run lint`                     | Run ESLint code analysis                              |
| `npm run storybook`                | Launch Storybook component explorer                   |
| `npm run test:jest`                | Run Jest unit tests                                   |
| `npm run test:jest--concurrent`    | Run development server and Jest tests concurrently    |
| `npm run test:cypress`             | Run Cypress e2e tests                                 |
| `npm run test:cypress--concurrent` | Run development server and Cypress tests concurrently |
