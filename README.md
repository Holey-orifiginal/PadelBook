# 🎾 PadelBook — Telegram Mini App

A padel court booking system that runs natively inside Telegram.

## What's included

- `index.html` — The full Mini App UI (no build step needed)
- `api/storage.js` — Serverless API for shared persistent bookings
- `vercel.json` — Vercel routing config
- `package.json` — Dependencies

---

## Deploy in 5 minutes

### Step 1 — Push to GitHub

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `padel-miniapp`, set to **Public**, click **Create**
3. Upload all these files (drag & drop in the GitHub UI)

### Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your `padel-miniapp` GitHub repo
3. Click **Deploy** (no config needed — Vercel auto-detects everything)
4. Wait ~60 seconds → you'll get a URL like `padel-miniapp.vercel.app`

### Step 3 — Add Vercel KV (shared storage)

1. In your Vercel project dashboard → **Storage** tab
2. Click **Create Database** → choose **KV**
3. Name it `padel-kv`, click **Create & Connect**
4. Vercel auto-injects the env vars — no code changes needed

### Step 3b — Add your bot credentials (keeps them secret)

1. In Vercel project → **Settings** → **Environment Variables**
2. Add:
   - `BOT_TOKEN` = your bot token from @BotFather
   - `CHAT_ID` = `-5168534708` (your group chat ID)
3. Click **Save**, then **Redeploy** the project (Deployments → ⋯ → Redeploy)

⚠️ Never put the bot token in `index.html` — anyone could read it and take over your bot.

### Step 4 — Connect to your Telegram Bot

1. Open Telegram → go to **@BotFather**
2. Send `/mybots` → select your bot
3. Tap **Bot Settings** → **Menu Button** → **Configure menu button**
4. Enter your Vercel URL: `https://padel-miniapp.vercel.app`
5. Set button text: `🎾 Book a Court`

### Step 5 — Register as Mini App

1. In @BotFather → `/newapp`
2. Select your bot
3. Set title: `PadelBook`
4. Set URL: `https://padel-miniapp.vercel.app`
5. Upload a square icon (512×512px) — optional

### Step 6 — Share with colleagues

Send your bot link to the group: `https://t.me/YOUR_BOT_USERNAME`

Colleagues tap **Menu → 🎾 Book a Court** to open the app!

---

## Features

- 📅 7-day booking calendar
- 🏟 2 courts (Court A & Court B)
- 👥 Up to 4 players per booking
- 📲 Auto-detects Telegram username
- 🔔 Group notifications on every booking/cancellation
- 💾 Shared bookings — everyone sees the same data

---

## Customisation

Edit `index.html` to change:
- `COURTS` array — add/rename courts
- `SLOTS` array — change available time slots
- Player names — managed in-app via the Players button
