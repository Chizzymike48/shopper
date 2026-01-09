Admin routes (development)

The admin UI (`/admin`) is included for development and demo purposes. For safety, admin routes are only mounted when the app is running in development mode or when the environment variable `VITE_ENABLE_ADMIN` is set to `true`.

To enable admin in production builds (not recommended for public sites), set in your environment or `.env` file:

```
VITE_ENABLE_ADMIN=true
```

Use this flag with caution — proper server-side authentication and role enforcement are required before exposing admin functionality publicly.

E2E tests

We include a Playwright test that signs in using the demo admin credentials and verifies `/admin` content. Run:

- npm install
- npm run test:e2e

Make sure the dev server is running (`npm run dev`) before running Playwright tests unless you configure the runner to start the app automatically.
