# EVENTORA — Event Management System

An event-management frontend built with React and Vite. EVENTORA has three account roles: Admin, Event Organizer, and User.

## Run locally

1. Install Node.js (LTS): https://nodejs.org/
2. Open this folder in VS Code.
3. Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Demo accounts

- **Admin:** `admin@eventora.com` / `Admin@123`
- **User:** Create an account using Sign up.
- **Event Organizer:** Create an account using Sign up and choose **Event Organizer** as the account type.

The demo admin account is seeded automatically on first load.

## Features

### Public
- Responsive landing page and event discovery
- Search by event title or venue
- Category filters and event details
- Available seat count

### User
- Sign up, log in and log out
- Register for events
- View and cancel own registrations
- Personal dashboard

### Event Organizer
- Separate organizer dashboard
- Create, edit, search, and delete events created by the signed-in organizer
- View registration counts and participant details for their events
- Organizer-specific dashboard statistics

### Admin
- Dashboard statistics
- Create, edit and delete any event
- View registered participants and manage users

## Deployment to Vercel

1. Push this project to your GitHub repository.
2. Import the repository into Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy. `vercel.json` is included for React Router deep links.

## Important academic/demo limitation

Authentication and application data use browser LocalStorage because this is a frontend-only assignment. This is not secure production authentication: passwords and roles are stored in the browser, and data is isolated to each browser/device. The organizer ownership checks in the UI are useful for this demo but are not a substitute for backend authorization. A public production deployment needs a backend, database, secure password hashing, server-enforced roles, and server-enforced event ownership. For a real platform, organizer accounts should normally be approved by an administrator instead of allowing unrestricted self-registration.
