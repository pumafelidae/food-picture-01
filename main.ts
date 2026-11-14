// food-picture-01 entry (Node 22, standard library only): its picture is the entry.png beside this file,
// and the program copies it to /output/entry.png. The gate takes a whole PNG or JPEG of at most 1 MiB
// and 1024 by 1024 pixels, and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { chmodSync, copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
copyFileSync(src, dest);
// The grader must be able to read the output: leave it world-readable, never mode 0600.
chmodSync(dest, 0o644);
// A truncated copy would still be a file: refuse to exit clean unless every byte arrived.
if (statSync(dest).size !== statSync(src).size) throw new Error('entry.png copy is incomplete');
