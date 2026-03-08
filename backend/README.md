# SpeakArena Backend (Node + MongoDB + Gemini)

## Quick Start

1. Create `backend/.env` from `.env.example`
2. Fill in your values (`MONGODB_URI`, `DB_NAME`, `GEMINI_API_KEY`)
3. Install and run:

```bash
cd backend
npm install
npm run dev
```

If successful, terminal shows `✅ MongoDB connected`.

Server default: `http://localhost:4000`

## Environment Variables

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=speakarena
GEMINI_API_KEY=...
ELEVENLABS_API_KEY=...
NODE_ENV=development
```

## API Surface

### Health

- `GET /health`

### Modules

- `GET /api/modules`
- `POST /api/modules/import`

### Profiles

- `POST /api/profiles` - create user profile (optionally parse resume with Gemini)
- `GET /api/profiles/:userId` - fetch profile
- `PATCH /api/profiles/:userId` - update profile fields
- `POST /api/profiles/:userId/parse-resume` - re-parse resume and refresh profile fields

### Debates (P2P)

- `POST /api/debates/start` - returns `{ debateId, topic }`
- `POST /api/debates/turn` - submit one 15s turn with base64 audio
- `POST /api/debates/finish` - judge debate and persist result

### Gemini Test Utilities

- `POST /api/gemini/test/resume`
- `POST /api/gemini/test/speech`
- `POST /api/gemini/test/question`
- `POST /api/gemini/test/judge`
- `POST /api/gemini/test/recommendations`

## Debate Flow Payloads

### 1) Start debate

`POST /api/debates/start`

```json
{
  "mode": "p2p",
  "topic": "Should AI replace traditional homework?"
}
```

### 2) Submit turn

`POST /api/debates/turn`

```json
{
  "debateId": "<id-from-start>",
  "speaker": "A",
  "turnIndex": 0,
  "mimeType": "audio/m4a",
  "audioBase64": "<base64-audio>"
}
```

Rules:
- exactly 4 turns are accepted
- order is fixed: `A(0) -> B(1) -> A(2) -> B(3)`

### 3) Finish and judge

`POST /api/debates/finish`

```json
{
  "debateId": "<id-from-start>"
}
```

Returns final:
- `score_a`, `score_b`, `winner`, `reasoning`, `feedback_a`, `feedback_b`

## Notes

- JSON body limit is `50mb` for base64 audio uploads.
- Audio is expected client -> backend -> Gemini (never client directly to Gemini).

## Seed Modules

```bash
npm run seed
```
