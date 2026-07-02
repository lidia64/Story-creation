# Stories CRUD App With Authentication

A React + Vite application where users can register, verify their email, log in, and manage stories with full CRUD operations. Unauthenticated users can browse and read stories but cannot create, edit, or delete them.

## Live Demo

[https://story-creation-rose.vercel.app](https://story-creation-rose.vercel.app)

## Features

- Landing page with hero section, stats, features grid, image strip, and CTA
- Story CRUD operations with Axios (all on the same backend domain)
- Two-step registration: sign up → verify email with a 6-digit OTP
- Login with inline error messages (including unverified email guidance)
- Auth Context for `token`, `user`, `login`, `logout`, and `isAuthenticated`
- Local Storage persistence for token and user email
- Protected routes — guests are redirected to `/login` for write operations
- Guests can only view and read stories; Edit and Delete are hidden
- Navbar adapts between guest and logged-in states
- Violet/purple design theme throughout

## Tech Stack

- React + Vite
- React Router
- TanStack Query
- React Context API
- Axios
- Tailwind CSS

## Project Structure

```text
src
|-- Components
|   |-- Navbar.jsx
|   |-- Footer.jsx
|   `-- DeleteStory.jsx
|-- Context
|   `-- AuthContext.jsx
|-- Pages
|   |-- AddStory.jsx
|   |-- Home.jsx
|   |-- Login.jsx
|   |-- Register.jsx
|   |-- StoryDetails.jsx
|   |-- UpdateStory.jsx
|   `-- ViewStory.jsx
|-- Services
|   |-- StoryServices.jsx
|   `-- authService.js
|-- App.jsx
|-- main.jsx
`-- index.css
```

## APIs

Both the Stories API and the Auth API share the same base domain:

```
https://sms-express-app-1-production-a843.up.railway.app
```

### Stories

| Method | Endpoint | Auth required |
|--------|----------|---------------|
| GET | `/api/stories` | No |
| GET | `/api/stories/:id` | No |
| POST | `/api/stories` | Yes |
| PUT | `/api/stories/:id` | Yes |
| DELETE | `/api/stories/:id` | Yes |

Authenticated requests send the token as:

```
Authorization: Bearer <accessToken>
```

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/verify-email` | Verify email with OTP |
| POST | `/api/auth/login` | Login and receive access token |

Register body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Verify email body:

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Login body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Login response:

```json
{
  "accessToken": "token-value"
}
```

## Authentication Flow

1. User opens `/register` and submits email and password.
2. Backend sends a 6-digit OTP to the email address.
3. User enters the OTP in the inline verification step on the same page.
4. On successful verification, user is redirected to `/login`.
5. User logs in — `AuthContext` stores the access token and email in Local Storage.
6. Navbar updates to show the user's email and a Logout button.
7. Logout clears Local Storage and returns the app to guest state.

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` `/Home` | Public | Landing page |
| `/ViewStory` | Public | Browse all stories |
| `/Story/:id` | Public | Read one story |
| `/login` | Public | Login page |
| `/register` | Public | Register + OTP verify |
| `/AddStory` | Protected | Create a story |
| `/UpdateStory/:id` | Protected | Edit a story |

Protected routes redirect unauthenticated users to `/login`.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in your terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```
