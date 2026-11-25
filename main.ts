// One Star, Written in Sap — a one-line 1-star review from a houseplant
// about its human owner. Writes the review to /output/entry.txt.
// Gate: /output/entry.txt must be UTF-8 text of 1-279 characters.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. He moved me to the bathroom for the humidity and forgot the light. I have filed for adoption by the shower curtain.";

const chars = [...LINE].length;
if (chars < 1 || chars > 279) {
  throw new Error(`entry must be 1-279 characters, got ${chars}`);
}
if (LINE.includes("\n") || LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-empty line without surrounding whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what landed on disk must be exactly the validated line.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== LINE) throw new Error("entry.txt does not match the validated line");
console.log(`Wrote ${chars} characters, 1 line`);
