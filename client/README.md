# Movue 🎬

A full-stack movie discovery platform powered by TMDB and OpenAI. Browse trending, top-rated, and genre-based movies, watch trailers, check streaming providers, and get AI-driven recommendations via a built-in concierge.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase |
| APIs | TMDB (movies), OpenAI (AI recommendations) |

> TMDB and OpenAI are called server-side from Express — never exposed to the client.

---

## Features

- 🔥 Trending, latest, upcoming, top-rated, featured movie, and genre-filtered movie browsing
- 🎞️ Movie detail pages with trailers and streaming providers
- 🤖 AI concierge — suggest movies based on a natural language prompt
- 🔖 Watchlist — save and manage movies you want to watch (persisted via Supabase)
- 📱 Fully responsive UI

---

## Project Structure

```
movue/
├── client/          # React + Tailwind frontend
└── server/          # Express backend (TMDB + OpenAI calls, Supabase)
```

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/Ayungcodes/Movue
cd movue
```

### 2. Install dependencies

### 4. Run the app

```bash
npm run dev
```

Starts both frontend and backend concurrently. App runs at `http://localhost:5173` by default.

### 3. Environment variables

Create a `.env` file in `/server`:

```env
TMDB_API_KEY=your_tmdb_api_key
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the app

```bash
npm run dev
```

Starts both frontend and backend concurrently. App runs at `http://localhost:5173` by default.


App runs at `http://localhost:5173` by default.

---

## API Keys

| Service | Where to get it |
|---------|----------------|
| TMDB | [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api) |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Supabase | Your project dashboard → Settings → API |