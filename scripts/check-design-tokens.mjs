#!/usr/bin/env node
/*
 * Design-token regression guard for the "Crisp Technical" system.
 * Fails (exit 1) if any legacy/forbidden pattern reappears under src/:
 *   - glassmorphism / glow: backdrop-filter, blur(), ambient purple rgba
 *   - old dark surface hexes
 *   - retired token names (--ld-*, --card-*, --ghost-*, legacy aliases)
 * Keeps the clean token contract from rotting. Run via `bun run check:design`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;
const EXT = /\.(css|tsx|ts)$/;

const RULES = [
  [/backdrop-filter/i, "backdrop-filter (glassmorphism)"],
  [/\bblur\(/i, "blur() (glassmorphism)"],
  [/rgba\(\s*11\s*,\s*13\s*,\s*23/i, "hardcoded dark surface rgba(11,13,23,…)"],
  [/rgba\(\s*163\s*,\s*166\s*,\s*255/i, "hardcoded purple glow rgba(163,166,255,…)"],
  [/rgba\(\s*255\s*,\s*139\s*,\s*139/i, "hardcoded dark error color rgba(255,139,139,…) (use var(--danger))"],
  [/#0e0e10|#0b0d17/i, "retired dark surface hex"],
  [/--ld-[a-z-]+/i, "retired --ld-* token"],
  [/--card-(glow|bg|border)\b/i, "retired --card-* token"],
  [/--ghost-[a-z-]*/i, "retired --ghost-* token"],
  [/var\(--foreground\)|var\(--muted\)|var\(--background\)|var\(--surface\)(?![-a-z])/i,
    "retired legacy token (use --text-*/--surface-* instead)"],
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (EXT.test(name)) files.push(p);
  }
})(ROOT);

const hits = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const [re, label] of RULES) {
      if (re.test(line)) hits.push(`${file}:${i + 1}  [${label}]  ${line.trim()}`);
    }
  });
}

if (hits.length) {
  console.error(`✗ Design-token guard: ${hits.length} forbidden pattern(s) found:\n`);
  console.error(hits.join("\n"));
  console.error("\nThese belong to the retired dark/glassmorphism system. See DESIGN.md.");
  process.exit(1);
}
console.log(`✓ Design-token guard: clean (${files.length} files scanned).`);
