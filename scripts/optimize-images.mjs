/**
 * Convert every raster image in public/media/ to WebP (quality 80) and delete
 * the source. Re-run after dropping in new screenshots / photos:
 *
 *   pnpm exec node scripts/optimize-images.mjs
 *
 * Skips files already in WebP / GIF / SVG. Logs before/after byte sizes.
 */
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "media");

const RASTER = new Set([".jpg", ".jpeg", ".png"]);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!RASTER.has(ext)) continue;

  const before = (await stat(file)).size;
  const outPath = file.slice(0, -ext.length) + ".webp";

  await sharp(file).webp({ quality: 80, effort: 6 }).toFile(outPath);
  const after = (await stat(outPath)).size;
  await unlink(file);

  totalBefore += before;
  totalAfter += after;
  count += 1;
  const rel = file.replace(ROOT + "/", "");
  console.log(
    `${rel.padEnd(56)}  ${(await fmt(before)).padStart(8)}  →  ${(await fmt(after)).padStart(8)}`,
  );
}

console.log(
  `\nConverted ${count} file(s):  ${await fmt(totalBefore)}  →  ${await fmt(totalAfter)}  (saved ${await fmt(totalBefore - totalAfter)})`,
);
