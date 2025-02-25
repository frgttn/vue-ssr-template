# Vue3 SSR Project

A modern Vue 3 application with Server-Side Rendering (SSR) capabilities, built using Vite.

## Features

- **Vue 3** - The Progressive JavaScript Framework
- **Server Side Rendering (SSR)** - Improved performance and SEO
- **Vite** - Next Generation Frontend Tooling
- **Pinia** - State management for Vue
- **Vue Router** - Official router for Vue.js
- **TailwindCSS** - A utility-first CSS framework
- **TypeScript** - Static type checking

## Prerequisites

- Node.js (v16.x or later recommended)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vue-ssr.git
cd vue-ssr

# Install dependencies
npm install
# or
yarn
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start a development server with hot module replacement.

## Building for Production

Building the application for production involves two steps:

### 1. Build the client bundle:

```bash
npm run build:client
# or
yarn build:client
```

This generates client-side assets in the `dist/client` directory and creates an SSR manifest.

### 2. Build the server bundle:

```bash
npm run build:server
# or
yarn build:server
```

This generates the server bundle in the `dist/server` directory.

## Running in Production

After building both client and server bundles, you can run the application in production mode:

```bash
npm run production
# or
yarn production
```

This starts an Express server that serves your application with SSR enabled.

## Project Structure

```
.
├── dist/                # Build output
│   ├── client/          # Client-side build
│   └── server/          # Server-side build
├── public/              # Static assets
├── src/
│   ├── components/      # Vue components
│   ├── router/          # Vue Router configuration
│   ├── store/           # Pinia stores
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   ├── entry-client.js  # Client entry point
│   └── entry-server.js  # Server entry point
├── server.js            # Express server for SSR
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies and scripts
```

## Technologies

- **Vue** - The Progressive JavaScript Framework with Composition API
- **Vue Router** - For application routing
- **Pinia** - State management
- **Vite** - Build tool and dev server
- **Express** - Server for SSR in production
- **TailwindCSS** - Utility-first CSS framework
- **TypeScript** - For type checking

## Scripts

- `dev`: Start the development server
- `preview`: Preview the production build locally
- `build:client`: Build the client bundle
- `build:server`: Build the server bundle
- `production`: Run the production server

## License

MIT
