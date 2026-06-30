# Stories CRUD App With Authentication

This React + Vite project fulfills the assignment to integrate authentication into an existing Story CRUD application. Users can create, view, update, and delete stories, and they can now log in, store an access token, share auth state with Context API, and log out

## Features

- Story CRUD operations with Axios
- Login page using TanStack Query `useMutation`
- Authentication service for the login API request
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

1. The user opens `/login`.
2. The user enters an email and password.
3. `Login.jsx` sends the credentials through React Query.
4. `authService.js` posts the credentials to the backend.
5. On success, `AuthContext` stores the access token and user email in Local Storage.
6. The Navbar updates to show `Welcome back, user@example.com` and a Logout button.
7. Logout clears Local Storage and returns the app to Guest User state.

## Routes

- `/` and `/Home` - Home page
- `/ViewStory` - View all stories
- `/Story/:id` - View one story
- `/AddStory` - Add a story
- `/UpdateStory/:id` - Update a story
- `/login` - Login page

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
