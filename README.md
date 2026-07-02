# Stories CRUD App With Authentication

This React + Vite project fulfills the assignment to integrate authentication into an existing Story CRUD application. Users can create, view, update, and delete stories, and they can now register, log in, store an access token, share auth state with Context API, and log out.

## Features

- Story CRUD operations with Axios
- Login page using TanStack Query `useMutation`
- Register page using TanStack Query `useMutation`
- Authentication service for register and login API requests
- Auth Context for `token`, `user`, `login`, `logout`, and `isAuthenticated`
- Local Storage persistence for token and user email
- Navbar that changes between guest and logged-in states
- Story list authentication status message

## Tech Stack

- React + Vite
- React Router
- TanStack Query
- React Context API
- Axios
- Tailwind CSS utility classes

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

Story API base URL in `src/Services/StoryServices.jsx`:

```js
https://sms-express-app-1-production.up.railway.app/api/stories
```

Authentication API base URL in `src/Services/authService.js`:

```js
https://sms-express-app-1-production-a843.up.railway.app
```

Register request:

```http
POST /register
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

If the backend returns an `accessToken`, the app logs the new user in immediately. If no token is returned, the user is sent to the login page.

Login request:

```http
POST /login
```

Body:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Expected response:

```json
{
  "accessToken": "token-value"
}
```

## Authentication Flow

1. A new user opens `/register`.
2. `Register.jsx` validates the form and sends the email and password through React Query.
3. `authService.js` posts the registration data to the backend.
4. If registration returns an access token, `AuthContext` stores the token and user email in Local Storage.
5. Existing users open `/login` and submit their credentials through React Query.
6. On successful login, `AuthContext` stores the access token and user email in Local Storage.
7. The Navbar updates to show `Welcome back, user@example.com` and a Logout button.
8. Logout clears Local Storage and returns the app to Guest User state.

## Routes

- `/` and `/Home` - Home page
- `/ViewStory` - View all stories
- `/Story/:id` - View one story
- `/AddStory` - Add a story
- `/UpdateStory/:id` - Update a story
- `/login` - Login page
- `/register` - Register page

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
