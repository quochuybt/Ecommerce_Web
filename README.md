# ElectroHub - E-Commerce Electronics Platform

React.js + Vite frontend and Express.js API for an electronics e-commerce website, based on `agents_react_js.md`, `TECH_STACK_REACT_JS.md`, and `REACT_JS_SUMMARY.md`.

## Features

- Customer storefront: home, catalog, product detail, cart, checkout, orders, profile, login, register.
- Admin area: dashboard metrics and product management screen.
- Express API with auth, users, products, orders, cart, upload and analytics routes.
- Mock data now, MongoDB helper included for the database phase.

## Quick Start

Use `npm.cmd` on this Windows machine because PowerShell blocks `npm.ps1`.

```bash
cd frontend
npm.cmd install
npm.cmd run dev
```

```bash
cd backend
npm.cmd install
npm.cmd run dev
```

- Frontend: http://localhost:5173
- Backend health: http://localhost:3001/api/health

## Demo Accounts

- User: `user@example.com` / `User12345`
- Admin: `admin@example.com` / `Admin12345`

## Project Structure

```text
frontend/  React + Vite SPA
backend/   Express API server
docs/      Architecture, API, database and setup documentation
```
