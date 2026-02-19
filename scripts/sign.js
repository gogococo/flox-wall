#!/usr/bin/env node
import fs from "fs";
import { execSync } from "child_process";

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });
const capture = (cmd) => execSync(cmd, { stdio: ['inherit', 'pipe', 'inherit'] }).toString().trim();

// Header
run(`gum style \
  --foreground 212 --border-foreground 212 --border double \
  --align center --width 52 --padding "1 3" \
  "  ✦ Flox Community Wall ✦  "`);

console.log();

const handle = capture(`gum input --placeholder "@your-handle" --prompt "Handle  : "`);
const message = capture(`gum input --placeholder "Your message" --prompt "Message : "`);

// Save to file
const file = "messages.json";
const data = JSON.parse(fs.readFileSync(file));
data.push({ handle, message, timestamp: Date.now() });
fs.writeFileSync(file, JSON.stringify(data, null, 2));

console.log();

// Commit and push with a spinner on the push
run(`git pull --rebase -q`);
run(`git add messages.json`);
run(`git commit -q -m "Wall: ${handle}"`);
run(`gum spin --spinner dot --title "Sending into the universe..." -- git push -q`);

console.log();
run(`gum style --foreground 212 --align center --width 52 "✨ Your mark is now eternal."`);
console.log();
