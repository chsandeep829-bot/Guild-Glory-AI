# Guild Glory AI

A separate Firebase-backed guild statistics dashboard and stats-aware chatbot.

## Features
- Firebase Email/Password and Google sign-in
- Per-user guild workspaces in Cloud Firestore
- Import member totals from pasted guild-message text, CSV-style rows or JSON
- Store timestamped snapshots and daily summaries
- Calculate per-member glory gains from successive observed totals
- Dashboard, member leaderboard, history chart and chatbot
- Responsive dark interface

## Data-source limitation
This version records data supplied by the user through the import screen. It does not connect to or scrape Free Fire servers or read private account tokens. Unattended automatic collection requires a documented, authorized API, webhook, or feed from the source that provides guild data. A source-specific adapter can be added when its documentation is available.

## Firebase setup
This project uses Firebase project `studio-3607214974-ad41a`. The known web-app settings are prefilled in `src/firebase.js`; the Firebase web API key is supplied at build time.

1. Copy `.env.example` to `.env`.
2. Set `VITE_FIREBASE_API_KEY` from Firebase Console → Project settings → Your apps.
3. In Firebase Authentication, enable Email/Password and Google providers.
4. Create a Cloud Firestore database and publish `firestore.rules`.
5. Add your local/deployed domain to Firebase Authentication → Settings → Authorized domains.

## Run locally
```bash
npm install
npm run dev
npm run build
```

## Import formats
Paste rows in `name,uid,glory` format:
```text
PlayerName,12345678,12500
AnotherPlayer,87654321,9800
```
Or JSON:
```json
[{"name":"PlayerName","uid":"12345678","glory":12500}]
```
The glory value must be a cumulative total. Import again later to calculate the difference from the previous snapshot. Daily summaries are keyed by date; timestamped snapshots are retained separately.

## Firestore layout
`users/{uid}/guilds/{guildId}` with subcollections `members`, `snapshots`, and `daily`. Rules restrict all guild data to its signed-in owner.

## Deploy
Build with `npm run build` and deploy the `dist` directory to Cloudflare Pages or another static host. Set the same `VITE_*` variables in the hosting dashboard before building. Never commit `.env`, service-account files, or private API keys.