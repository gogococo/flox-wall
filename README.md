# Flox Community Wall

A live conference message wall — attendees sign the wall and their messages appear on screen in real time.

## What it does

- Displays messages from `messages.json` in a space-themed terminal UI
- Polls for new messages every 4 seconds and updates live
- Triggers a shooting star animation whenever a new message is added
- Deploys automatically to GitHub Pages on every push to `main`

## Prerequisites

[Flox](https://flox.dev) must be installed.

## Setup

```bash
git clone git@github.com:gogococo/flox-wall.git
cd flox-wall
flox activate
```

`flox activate` drops you into an environment with Node.js and Git available.

## Sign the wall

```bash
./sign
```

This runs an interactive CLI that prompts for a handle and message, appends it to `messages.json`, then commits and pushes automatically. The GitHub Action redeploys the page within ~30 seconds.

## Run locally

Serve the project with any static file server, for example:

```bash
npx serve .
# or
python3 -m http.server
```

Then open `http://localhost:3000` (or whichever port is used).

## Deployment

Pushing to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`, which deploys the site to GitHub Pages.

The live site is available at:
```
https://gogococo.github.io/flox-wall/
```

To enable GitHub Pages for the first time:
1. Go to **Settings → Pages** in the repo
2. Set **Source** to **GitHub Actions**
3. Go to **Settings → Actions → General** and enable **Read and write permissions**
