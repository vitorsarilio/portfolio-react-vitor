# Vitor Sarilio — Personal Portfolio

A modern personal portfolio built with React and Vite, featuring an AI-powered chatbot (C137) connected to Google's Gemini API. Deployed as a full-stack application on Vercel, with the frontend served as a static site and the chatbot backend running as a serverless function.

---

## Features

- Responsive portfolio with sections for About, Projects, Personal Projects, and Resume
- Interactive 3D elements via Three.js / React Three Fiber
- Dark/light theme with localStorage persistence
- Floating AI chatbot (C137) restricted to portfolio context, powered by Gemini
- Google Analytics 4 integration
- Fully deployed on Vercel (frontend + serverless API)

---

## Tech Stack

### Frontend (`/`)
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool and dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Three.js + React Three Fiber | 3D scene rendering |
| Lucide React | Icon library |
| React GA4 | Google Analytics 4 |

### Backend (`/api`)
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Serverless API handler |
| `@google/genai` | Google Gen AI SDK (new unified SDK) |
| Gemini 3.5 Flash | AI model powering the chatbot |
| dotenv | Local environment variable loading |
| cors | Cross-origin request control |

---

## Project Structure

```
portfolio-react-vitor/
├── api/
│   ├── index.js          # Express serverless function — /api/chat endpoint
│   ├── package.json      # Backend dependencies
│   ├── .env              # Local secrets (gitignored)
│   └── .env.example      # Environment variable template
│
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx   # Floating AI chat widget
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SkillLogo.jsx
│   │   └── ExpandingContactLink.jsx
│   ├── pages/
│   │   └── PortfolioPage.jsx
│   ├── sections/
│   │   ├── AboutSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── PersonalProjectsSection.jsx
│   │   └── ResumeSection.jsx
│   ├── data/
│   │   └── portfolioData.js  # All static content (bio, projects, experience)
│   ├── App.jsx           # Root layout, navbar, theme toggle
│   └── main.jsx          # Router configuration
│
├── vite.config.js        # Vite config with dev proxy for /api
├── vercel.json           # Vercel routing rules
└── tailwind.config.js
```

---

## Environment Variables

All secrets live exclusively in the backend (`/api`). The frontend has no custom environment variables.

### `api/.env` (local development)

```env
# Google Gemini API key
# Get yours at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_google_ai_api_key_here

# Frontend origin allowed by CORS (for local dev, this is the Vite dev server)
FRONTEND_URL=http://localhost:5173

# Port for the local backend server (must differ from Vite's port)
PORT=3001
```

> **Note:** Legacy TMDB variables (`VITE_TMDB_READ_ACCESS_TOKEN`, `VITE_TMDB_ACCOUNT_ID`, `VITE_TMDB_API_KEY`) have been fully removed. The project no longer depends on TMDB.

### Vercel Production

In the Vercel dashboard under **Settings → Environment Variables**, add:

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Your Google AI API key |
| `FRONTEND_URL` | Your production Vercel URL (e.g. `https://portfolio-vitor.vercel.app`) |

`PORT` is not required on Vercel — the function is serverless.

---

## Running Locally

You need **two terminals** running simultaneously.

### 1. Backend (`/api`)

```bash
cd api
npm install
node index.js
# Server running at http://localhost:3001
```

### 2. Frontend (root)

```bash
npm install
npm run dev
# App running at http://localhost:5173
```

Vite is configured to proxy all `/api/*` requests to `http://localhost:3001`, so the frontend and backend communicate without CORS issues during development.

### Other commands

```bash
# Run tests
npm test

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

The project is configured for **Vercel** out of the box.

- The frontend is built by Vite and served as a static site from `dist/`.
- `api/index.js` is automatically detected and deployed as a serverless function.
- `vercel.json` contains two rewrite rules:
  - `/api/*` → `api/index.js` — routes chatbot requests to the serverless function
  - `/*` → `index.html` — serves the SPA for all other routes

To deploy, push to your connected Vercel project or run:

```bash
vercel --prod
```

---

## Chatbot — C137

The chatbot is intentionally restricted to answering questions about Vitor's portfolio only. It is powered by the `gemini-3.5-flash` model and uses a system instruction that limits its scope to the content in `src/data/portfolioData.js`. Questions outside that scope receive a standard redirect response.

The chat session maintains full conversation history, formatted as alternating `user` / `model` turns per the Gemini API requirement.
