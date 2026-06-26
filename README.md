# Stories CRUD App (React + Vite)

A simple “Stories” CRUD web application built with React + Vite. It lets you **create**, **view**, **update**, and **delete** stories using a REST API.

## Tech stack

- React + Vite
- React Router (pages / navigation)
- TanStack Query (imported in the app)
- Axios (API calls)
- Tailwind-style utility classes (used in components)

## API

Base URL is hardcoded in: `src/Services/StoryServices.jsx`

```js
https://sms-express-app-1-production.up.railway.app/api/stories
```

### Endpoints

- **Create story**: `POST /api/stories`
  - Body:
    ```json
    {
      "authorName": "...",
      "content": "..."
    }
    ```

- **Get all stories**: `GET /api/stories`

- **Get story by id**: `GET /api/stories/:storyId`

- **Update story**: `PUT /api/stories/:storyId`
  - Body:
    ```json
    {
      "authorName": "...",
      "content": "..."
    }
    ```

- **Delete story**: `DELETE /api/stories/:storyId`

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (typically `http://localhost:5173`).

## App pages (high level)

- **Home / List**: shows existing stories (uses `getStories()`)
- **AddStory**: form to create a story (`src/Pages/AddStory.jsx`)
- **StoryDetails / View**: shows story details
- **UpdateStory**: edit author/content for a story (`src/Pages/UpdateStory.jsx`)
- **DeleteStory**: deletes a story (`src/Components/DeleteStory.jsx`)

