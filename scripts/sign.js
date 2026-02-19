#!/usr/bin/env node
import fs from "fs";
import readline from "readline";
import { execSync } from "child_process";

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function intro() {
  const frames = [
`
     ✦        ✦
        ✧
   FLOX COSMIC WALL
        ✧
     ✦        ✦
`,
`
        ✧
     ✦    FLOX    ✦
        ✧
`,
`
     ✦   LEAVE YOUR MARK   ✦
`
  ];

  for (const frame of frames) {
    console.clear();
    console.log(frame);
    await sleep(800);
  }
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    })
  );
}

async function main() {
  await intro();

  const handle = await ask("Your handle (@something): ");
  const message = await ask("Your message: ");

  const file = "messages.json";
  const data = JSON.parse(fs.readFileSync(file));

  data.push({ handle, message, timestamp: Date.now() });

  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  console.log("\n🌠 Sending your message into the universe...\n");

  execSync("git pull --rebase");
  execSync("git add messages.json");
  execSync(`git commit -m "Wall: ${handle}"`);
  execSync("git push");

  console.log("✨ Your mark is now eternal.\n");
}

main();
