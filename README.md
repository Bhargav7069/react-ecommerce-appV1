# React E-commerce Application

## Overview
This is a professional E-commerce application built with React, Redux Toolkit, and Vanilla CSS. It fulfills the interview task requirements, providing authentication, product browsing, cart management, and a checkout simulation.

## Tech Stack
- **Framework**: React 18 (Vite)
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Styling**: Vanilla CSS (Component-scoped & Global)

## Project Structure
```
src/
├── components/         # Reusable UI components (Navbar, ProductCard)
├── pages/              # Application pages (Home, Login, Checkout)
├── redux/              # Redux setup
│   ├── slices/         # State slices (auth, product, cart)
│   └── store.js        # Store configuration
├── services/           # API services (Axios configuration)
├── routes/             # Routing configuration & PrivateRoute wrapper
├── utils/              # Helper functions
├── App.jsx             # Main App layout
└── main.jsx            # Entry point with Providers
```

## Features
1.  **Authentication**: 
    - Login using DummyJSON API (`https://dummyjson.com/auth/login`).
    - JWT stored in `localStorage`.
    - Protected routes for authenticated users.
2.  **Product Catalog**:
    - Fetches products from DummyJSON.
    - Server-side pagination support.
    - Category filtering.
3.  **Shopping Cart**:
    - Redux-managed cart state.
    - Persisted to `localStorage` (optional enhancement included).
    - Add, remove, update quantities.
    - Dynamic header badge.
4.  **Checkout**:
    - Order summary calculation.
    - Simulation of order placement.

## How to Run
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Credentials for Demo
The application uses the `dummyjson.com` API. You can use any valid user from their database, for example:
- **Username**: `emilys`
- **Password**: `emilyspass`
