# Octofit Tracker Frontend

React 19 + Vite presentation tier for the Octofit Tracker multi-tier application.

## Environment Configuration

Define `VITE_CODESPACE_NAME` in `.env.local` for Codespaces API routing.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When set, the frontend uses this API base URL pattern:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api`

If `VITE_CODESPACE_NAME` is unset, the app safely falls back to:

`http://localhost:8000/api`

## Run

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
