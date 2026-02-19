# Flox Community Wall

A live conference message wall — attendees sign the wall and their messages appear on screen in real time.

## What it does

- Displays messages from `messages.json` in a space-themed terminal UI
- Polls for new messages every 4 seconds and updates live
- Triggers a shooting star animation whenever a new message is added
- Deploys automatically to GitHub Pages on every push to `main`

## Prerequisites

[Flox](https://flox.dev) must be installed.

## Quick start

```bash
git clone git@github.com:gogococo/flox-wall.git
cd flox-wall
flox activate
flox services start
```

`flox activate` drops you into a reproducible environment with Node.js, Git, and `gum` — no global installs needed. Run `flox activate` first to ensure all packages are installed, then `flox services start` to boot the local web server.

Then open **http://localhost:8080** to see the wall.

## Or activate from FloxHub (no clone needed)

```bash
flox activate -r gogococo/flox-wall
```

Pulls the exact same environment from FloxHub and activates it directly.

## Sign the wall

```bash
./sign
```

Launches a styled interactive CLI (powered by `gum`) that prompts for a handle and message, then commits and pushes to `messages.json` automatically. The GitHub Action redeploys the page and the wall updates live within ~30 seconds.

## Environment contents

| Package | Purpose |
|---------|---------|
| `nodejs` | Runs `server.js` and `scripts/sign.js` |
| `git` | Commits and pushes new messages |
| `gum` | Styled terminal UI for `./sign` and the activation banner |

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
