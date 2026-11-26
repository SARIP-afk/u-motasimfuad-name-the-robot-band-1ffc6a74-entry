// Name the Robot Band — written to /output/entry.txt.
//
// Node 22, no dependencies, deterministic, no network. The program writes one
// fixed string on every run, so the two server runs produce byte-identical
// output.
//
// The line (122 chars): The Terms and Conditions — the robot band nobody
// actually read, whose hit single 'I Agree' went platinum before anyone
// heard it. It won an 8-candidate head-to-head against the judge brief
// (5/5 on every criterion: the name is funny on its own, the hit line is
// funny on its own, and the two lock together — 'I Agree' is only funny
// because the band is The Terms and Conditions) over the runners-up, the
// encore-loop Encores and the soulless Metronomes. Full comparison:
// u-motasimfuad-name-the-robot-band-1ffc6a74-candidates.md.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The Terms and Conditions — the robot band nobody actually read. Hit single 'I Agree' went platinum before anyone heard it.";

// The sealed gate accepts UTF-8 text of 1-200 characters that is not only
// whitespace. Check the same bound here (counting code points, the way the
// gate counts characters) and refuse to write anything the gate would reject.
// Also pin the exact byte length: places tie on Judge win rate go to the
// smaller text in bytes, so a silent change to the line (a different dash,
// a trailing space) must fail loudly here instead of shipping a longer file.
const EXPECTED_CHARS = 122;
const EXPECTED_BYTES = 124;
const length = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf-8");
if (length < 1 || length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry is ${length} chars, outside the 1-200 gate`);
}
if (length !== EXPECTED_CHARS || bytes !== EXPECTED_BYTES) {
  throw new Error(
    `entry changed: got ${length} chars / ${bytes} bytes, expected ${EXPECTED_CHARS} / ${EXPECTED_BYTES}`
  );
}

// Write exactly LINE — no trailing newline, so the file holds 122 chars
// (122 code points, the way the gate counts) and nothing else.
const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf-8");
