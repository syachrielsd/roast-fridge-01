// Roast Your Fridge — one line, one laugh.
// Writes the chosen roast to <MAKEFUN_OUTPUT_DIR>/entry.txt (default /output).
// The line is a constant: the program's job is to deliver it byte-exact,
// single line, 1-200 characters, UTF-8, no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Winner from SCREENING.md (#1, 25/25): the door alarm is a detail every
// fridge owner recognises, and "a librarian guarding the cheese" pays off
// in the last few words as a fresh image, not a worn fridge trope.
const LINE =
  "My fridge's door alarm screams if I browse too long, like a librarian guarding the cheese.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Resolve from this file's own directory, never process.cwd().
void dirname(fileURLToPath(import.meta.url));

// Guard the gate before writing: the entry must be UTF-8 text of 1-200
// characters, a single line, not only white space. Fail loudly instead of
// shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
