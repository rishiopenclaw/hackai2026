# SpeakArena Backend (Node + MongoDB)

## Quick Start & Database Setup

To run this backend locally, it must connect to your MongoDB database.

1. **Create Environment File**
   In the `backend/` folder, create a file named `.env`.

2. **Add Connection String**
   Paste the following directly into `.env` (using your real password):
   ```env
   MONGODB_URI="mongodb+srv://<username>:<password>@speakarena.aceitet.mongodb.net/?appName=SpeakArena"
   ```

3. **Install & Run**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

If successful, check the terminal for: `✅ MongoDB connected`

### Troubleshooting
* **`EADDRINUSE: address already in use :::4000`**: The server is already running! Force quit it by typing: `lsof -ti :4000 | xargs kill -9`, then run `npm run dev` again.
* **`Cannot find module 'dotenv'`**: You forgot to run `npm install`.

Server: `http://localhost:4000`

## Endpoints

- `GET /health`
- `GET /api/modules`
- `POST /api/modules/import`

### Import payload example

```json
{
  "modules": [
    {
      "title": "Warmup Echo",
      "subtitle": "Articulation",
      "type": "articulation_drill",
      "pathIndex": 0,
      "status": "available",
      "xpReward": 20,
      "estimatedDurationSeconds": 30
    }
  ]
}
```

## Seed

```bash
npm run seed
```
