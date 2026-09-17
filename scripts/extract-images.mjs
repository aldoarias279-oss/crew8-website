/**
 * One-time extraction of the Crew 8 photographs out of the original single-file concept.
 *
 * reference/Crew8_Website.html embeds every image as an inline base64 data URI, which is
 * why that file is ~33 MB. This script decodes them in DOM order, archives the untouched
 * originals, writes web-sized copies into public/, and records intrinsic dimensions so
 * next/image can reserve exact space and avoid layout shift.
 *
 * Two known quirks of the source file, both handled rather than worked around:
 *   - The hero background and gallery tile s1 are byte-identical, so blobs are deduped by
 *     SHA-256 of the decoded buffer and the shared photo is written once.
 *   - The file was truncated mid-attribute while saving, so the final blob is missing its
 *     tail. Its top 1160 of 1536 rows decode cleanly, so it is cropped to the intact area
 *     rather than discarded; below that the decoder emits flat grey.
 *
 * Run with: npm run extract:images
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import sharp from "sharp";

const SOURCE = "reference/Crew8_Website.html";
const ARCHIVE_DIR = "assets/source-images";
const MANIFEST = "src/lib/image-manifest.ts";

/**
 * Slots in the order the data URIs appear in the source document. `id` is what the site
 * code refers to; alt text lives in src/content/site.ts alongside the rest of the copy.
 */
const SLOTS = [
  { id: "acfdLogo", file: "public/brand/acfd-logo.png", maxWidth: 512, kind: "png" },
  { id: "crew8Group", file: "public/images/crew8-group-photo.jpg", maxWidth: 2560, kind: "jpg" },
  { id: "communityProject", file: "public/images/community-project.jpg", maxWidth: 1800, kind: "jpg" },
  { id: "handCrewShield", file: "public/images/acfd-hand-crew-shield.jpg", maxWidth: 900, kind: "jpg" },
  { id: "vegetationManagement", file: "public/images/vegetation-management.jpg", maxWidth: 1800, kind: "jpg" },
  { id: "stormDamagedTrees", file: "public/images/storm-damaged-trees.jpg", maxWidth: 1800, kind: "jpg" },
  { id: "erosionControl", file: "public/images/erosion-control.jpg", maxWidth: 1800, kind: "jpg" },
];

/**
 * The last data URI in the file is cut off mid-stream. Everything above row 1160 (of 1536)
 * decodes correctly — verified by scanning for the first row the decoder fills with flat
 * grey — so the photograph is cropped to that intact region instead of being thrown away.
 * 1140 leaves a small margin above the damage.
 */
const TRUNCATED = {
  position: 9,
  id: "sandbagOperations",
  file: "public/images/sandbag-operations.jpg",
  intactHeight: 1140,
};

for (const dir of [ARCHIVE_DIR, "public/images", "public/brand", "src/lib"]) {
  mkdirSync(dir, { recursive: true });
}

const html = readFileSync(SOURCE, "utf8");
const found = [...html.matchAll(/data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=]+)/g)];
console.log(`Scanned ${SOURCE} (${(html.length / 1e6).toFixed(1)} MB), found ${found.length} data URIs\n`);

const seen = new Map();
const entries = [];
let slotIndex = 0;
let skipped = 0;

/** Tiny inline placeholder so photographs fade in rather than pop in, at ~400 bytes each. */
async function placeholderFor(input) {
  const webp = await sharp(input).resize({ width: 16 }).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${webp.toString("base64")}`;
}

for (const [index, match] of found.entries()) {
  const label = `#${index + 1}`;
  const [, mime, base64] = match;
  const buffer = Buffer.from(base64, "base64");
  const hash = createHash("sha256").update(buffer).digest("hex");

  const duplicateOf = seen.get(hash);
  if (duplicateOf) {
    console.log(`${label}: byte-identical to "${duplicateOf}" — reusing that file, nothing written`);
    continue;
  }

  if (index + 1 === TRUNCATED.position) {
    const header = await sharp(buffer, { failOn: "none" }).metadata();
    const cropped = await sharp(buffer, { failOn: "none" })
      .extract({ left: 0, top: 0, width: header.width, height: TRUNCATED.intactHeight })
      .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer({ resolveWithObject: true });

    writeFileSync(join(ARCHIVE_DIR, `${TRUNCATED.id}-truncated-original.jpg`), buffer);
    writeFileSync(TRUNCATED.file, cropped.data);

    entries.push({
      id: TRUNCATED.id,
      src: `/${TRUNCATED.file.replace(/^public\//, "")}`,
      width: cropped.info.width,
      height: cropped.info.height,
      blurDataURL: await placeholderFor(cropped.data),
    });

    console.log(
      `${label}: ${TRUNCATED.id} — truncated source, recovered top ${TRUNCATED.intactHeight} of` +
        ` ${header.height} rows -> ${cropped.info.width}x${cropped.info.height}` +
        ` (${(cropped.data.length / 1e3).toFixed(0)} KB)`,
    );
    continue;
  }

  let meta;
  try {
    meta = await sharp(buffer).metadata();
    if (!meta.width || !meta.height) throw new Error("no dimensions in header");
  } catch (error) {
    console.warn(`${label}: SKIPPED — could not decode (${error.message}). Source file is truncated here.`);
    skipped += 1;
    continue;
  }

  const slot = SLOTS[slotIndex];
  if (!slot) {
    console.warn(`${label}: no slot defined for this image, skipping`);
    skipped += 1;
    continue;
  }
  slotIndex += 1;

  const archiveName = `${slot.id}.${mime === "png" ? "png" : "jpg"}`;
  writeFileSync(join(ARCHIVE_DIR, archiveName), buffer);

  const resized = sharp(buffer)
    .rotate()
    .resize({ width: Math.min(slot.maxWidth, meta.width), withoutEnlargement: true });

  const encoded =
    slot.kind === "png"
      ? await resized.png({ compressionLevel: 9, palette: true }).toBuffer({ resolveWithObject: true })
      : await resized.jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" }).toBuffer({ resolveWithObject: true });

  writeFileSync(slot.file, encoded.data);

  entries.push({
    id: slot.id,
    src: `/${slot.file.replace(/^public\//, "")}`,
    width: encoded.info.width,
    height: encoded.info.height,
    blurDataURL: await placeholderFor(buffer),
  });

  seen.set(hash, slot.file);
  console.log(
    `${label}: ${slot.id} — source ${meta.width}x${meta.height} (${(buffer.length / 1e6).toFixed(1)} MB)` +
      ` -> ${encoded.info.width}x${encoded.info.height} (${(encoded.data.length / 1e3).toFixed(0)} KB)`,
  );
}

/*
 * A square crop framed on the ACFD Hand Crew shield itself. The full photograph is a wide
 * shot of the apparatus door, so at badge size the emblem is unreadable; these offsets
 * centre the shield with a little margin.
 */
const shieldSource = readFileSync(join(ARCHIVE_DIR, "handCrewShield.jpg"));
const shieldMark = await sharp(shieldSource)
  .extract({ left: 64, top: 267, width: 1024, height: 1024 })
  .resize({ width: 480, height: 480 })
  .jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toBuffer({ resolveWithObject: true });

writeFileSync("public/images/acfd-hand-crew-mark.jpg", shieldMark.data);
entries.push({
  id: "handCrewMark",
  src: "/images/acfd-hand-crew-mark.jpg",
  width: shieldMark.info.width,
  height: shieldMark.info.height,
  blurDataURL: await placeholderFor(shieldMark.data),
});
console.log(`   + handCrewMark — shield crop -> 480x480 (${(shieldMark.data.length / 1e3).toFixed(0)} KB)`);

const body = entries
  .map(
    (entry) => `  ${entry.id}: {
    src: "${entry.src}",
    width: ${entry.width},
    height: ${entry.height},
    blurDataURL:
      "${entry.blurDataURL}",
  },`,
  )
  .join("\n");

writeFileSync(
  MANIFEST,
  `// Generated by scripts/extract-images.mjs — do not edit by hand.
// Intrinsic dimensions come from the extracted originals so next/image can reserve exact
// space for every photograph. Alt text and captions live in src/content/site.ts.

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const images = {
${body}
} satisfies Record<string, ImageAsset>;

export type ImageId = keyof typeof images;
`,
);

/*
 * Derived brand assets, all from material already in the source file — the official ACFD
 * emblem and the crew photograph. Next.js picks these up from src/app by filename.
 */
const logo = readFileSync(join(ARCHIVE_DIR, "acfdLogo.png"));
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

await sharp(logo)
  .resize({ width: 512, height: 512, fit: "contain", background: transparent })
  .png({ compressionLevel: 9 })
  .toFile("src/app/icon.png");

// iOS ignores transparency on home-screen icons, so this one gets the ink background.
await sharp(logo)
  .resize({ width: 152, height: 152, fit: "contain", background: transparent })
  .extend({ top: 14, bottom: 14, left: 14, right: 14, background: "#101418" })
  .flatten({ background: "#101418" })
  .png({ compressionLevel: 9 })
  .toFile("src/app/apple-icon.png");

// Social card: a 1200x630 crop of the crew photograph, centred on the crew rather than the
// asphalt, so link previews are not a picture of an empty car park.
const heroOriginal = sharp(readFileSync(join(ARCHIVE_DIR, "crew8Group.jpg")));
const heroMeta = await heroOriginal.metadata();
const cropHeight = Math.round(heroMeta.width / (1200 / 630));
const cropTop = Math.max(0, Math.round(heroMeta.height * 0.42 - cropHeight / 2));

await sharp(readFileSync(join(ARCHIVE_DIR, "crew8Group.jpg")))
  .extract({ left: 0, top: cropTop, width: heroMeta.width, height: cropHeight })
  .resize({ width: 1200, height: 630 })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile("src/app/opengraph-image.jpg");

console.log("\nDerived brand assets: src/app/icon.png, apple-icon.png, opengraph-image.jpg");

const expected = SLOTS.length + 2;
console.log(`\nWrote ${entries.length} images and ${MANIFEST}`);
if (skipped) console.log(`${skipped} blob(s) skipped.`);
if (entries.length !== expected) {
  console.error(`\nWARNING: expected ${expected} images but wrote ${entries.length}. Check slot order.`);
  process.exitCode = 1;
}
