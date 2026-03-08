# SpeakArena Backend (Node + MongoDB)

## Quick start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

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
