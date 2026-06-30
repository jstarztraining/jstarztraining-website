// Starts `next dev`, waits until the server is actually responding, then opens
// the app in Windows Chrome (default, already-signed-in profile) from WSL.
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';

const PORT = process.env.PORT || 3000;
const APP_URL = `http://localhost:${PORT}`;

// Chrome profile to open in. Profile 9 = jstarztraining.web@gmail.com (the
// dedicated build account). Override with CHROME_PROFILE if needed.
const CHROME_PROFILE = process.env.CHROME_PROFILE || 'Profile 9';

// Known Windows Chrome locations as seen from WSL.
const CHROME_PATHS = [
  '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
  '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];

// Run Next's dev server, passing through any extra CLI args, with normal output.
const next = spawn('npx', ['next', 'dev', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
});

let opened = false;

function openChrome() {
  if (opened) return;
  opened = true;
  const chrome = CHROME_PATHS.find((p) => fs.existsSync(p));
  if (!chrome) {
    console.log(`\n[dev] Chrome not found — open ${APP_URL} manually.`);
    return;
  }
  // Open as a new tab in the already-running window for the chosen profile.
  spawn(chrome, [`--profile-directory=${CHROME_PROFILE}`, APP_URL], {
    stdio: 'ignore',
    detached: true,
  }).unref();
  console.log(`\n[dev] Opened ${APP_URL} in Chrome.`);
}

// Poll the server until it answers, then open the browser once. Only one
// request is ever in flight: we retry only on a real connection error (server
// not up yet), never on a slow-but-pending response (Next compiling a route).
function poll() {
  if (opened) return;
  const req = http.get(APP_URL, (res) => {
    res.resume(); // drain so the socket frees
    openChrome();
  });
  req.on('error', () => {
    if (!opened) setTimeout(poll, 500);
  });
}
setTimeout(poll, 800);

next.on('exit', (code) => process.exit(code ?? 0));
process.on('SIGINT', () => next.kill('SIGINT'));
process.on('SIGTERM', () => next.kill('SIGTERM'));
