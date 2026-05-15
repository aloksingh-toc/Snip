# Snip —  URL Shortener

A full-stack URL shortener built with Node.js, React, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## Features

- **Public shortening** — No login required, shorten URLs instantly
- **User auth** — Register/login with JWT to manage your links
- **Custom aliases** — Choose your own short code (e.g. `/my-link`)
- **Click analytics** — Track how many times each link is clicked
- **Link expiry** — Set an expiration date for any link
- **Delete links** — Remove links you no longer need

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (jsonwebtoken + bcryptjs) |

## Project Structure

```
snip/
├── client/              # React frontend
│   └── src/
│       ├── components/  # Navbar, ShortenForm, UrlCard, Alert, FormField
│       ├── pages/       # HomePage, LoginPage, RegisterPage, DashboardPage
│       ├── contexts/    # AuthContext (JWT state)
│       └── api/         # Axios client
└── server/              # Express backend
    └── src/
        ├── models/      # User, Url (Mongoose)
        ├── routes/      # auth, urls, shorten, redirect
        ├── middleware/  # JWT auth
        └── utils/       # nanoid generator, URL validator
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# Clone the repo
git clone https://github.com/aloksingh-toc/snip.git
cd snip

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Configuration

```bash
# Copy the example env file
cp server/.env.example server/.env
```

Edit `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### Run

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open  **http://localhost:5173** in your browser.

## How It Works

1. **Guest** visits `/` — pastes a URL — gets a short link instantly
2. **Short link** (e.g. `http://localhost:5000/ab3k9x`) redirects to the original URL and logs the click
3. **Registered users** get a dashboard with analytics, custom aliases, expiry and delete controls

## License

MIT
