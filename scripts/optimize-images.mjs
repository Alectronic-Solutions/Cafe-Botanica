// Pre-generates modern image formats for the static export.
//
// `output: "export"` disables Next's on-the-fly image optimizer, so we bake
// .avif and .webp siblings next to every source .jpg at author time. The
// <Photo> component (src/components/Photo.tsx) serves those with a JPG
// fallback. Also emits the 1200x630 social-share image (public/og.png).
//
//   npm run optimize:images          # create missing .avif/.webp + og.png
//   FORCE=1 npm run optimize:images  # also recompress the source JPGs, rebuild all
//
// The default run is idempotent: existing siblings are skipped and the source
// JPGs are never mutated (avoids cumulative lossy-on-lossy degradation).

import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const FORCE = process.env.FORCE === "1";
const publicDir = "public";
const photosDir = join(publicDir, "photos");

const WEBP = { quality: 72 };
const AVIF = { quality: 50, effort: 4 };
const JPEG = { quality: 72, mozjpeg: true };

function jpgTargets() {
  const files = [join(publicDir, "hero.jpg"), join(publicDir, "hero-portrait.jpg")];
  for (const f of readdirSync(photosDir)) {
    if (/\.jpe?g$/i.test(f)) files.push(join(photosDir, f));
  }
  return files;
}

async function processJpg(jpgPath) {
  const webp = jpgPath.replace(/\.jpe?g$/i, ".webp");
  const avif = jpgPath.replace(/\.jpe?g$/i, ".avif");

  if (FORCE || !existsSync(webp)) {
    await sharp(jpgPath).webp(WEBP).toFile(webp);
    console.log("  webp  ", webp);
  }
  if (FORCE || !existsSync(avif)) {
    await sharp(jpgPath).avif(AVIF).toFile(avif);
    console.log("  avif  ", avif);
  }
  if (FORCE) {
    const buf = await sharp(jpgPath).jpeg(JPEG).toBuffer();
    await sharp(buf).toFile(jpgPath);
    console.log("  jpeg↺ ", jpgPath);
  }
}

// Branded 1200x630 Open Graph card - linen field, espresso wordmark, one
// terracotta rule. Georgia stands in for the Fraunces display serif at render
// time (no web-font loading available to the SVG rasterizer).
async function buildOgImage() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#F7F4EE"/>
  <rect x="90" y="150" width="120" height="4" fill="#B5562F"/>
  <text x="90" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="118" fill="#2C2A29">Cafe Botanica</text>
  <text x="94" y="372" font-family="'Courier New', monospace" font-size="30" letter-spacing="4" fill="#2C2A29">ESPRESSO BAR &amp; BAKERY · GREENHOUSE ROW</text>
  <text x="94" y="418" font-family="'Courier New', monospace" font-size="30" letter-spacing="4" fill="#B5562F">POURING SINCE 1974</text>
  <rect x="90" y="500" width="1020" height="1" fill="#2C2A29" opacity="0.25"/>
  <text x="90" y="548" font-family="'Courier New', monospace" font-size="24" fill="#2C2A29" opacity="0.7">118 Greenhouse Row, Old Fourth Ward, Atlanta GA</text>
</svg>`;
  const out = join(publicDir, "og.png");
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("  og    ", out);
}

// Portrait viewports crop the landscape hero to its centre column anyway, so
// ship that column as its own file: same visible pixels, far fewer bytes.
// Matches the 3:5 crop of the hero-N-portrait.mp4 clips.
async function buildHeroPortrait() {
  const out = join(publicDir, "hero-portrait.jpg");
  if (!FORCE && existsSync(out)) return;
  const src = sharp(join(publicDir, "hero.jpg"));
  const { width, height } = await src.metadata();
  const cropW = Math.round((height * 3) / 5);
  await src
    .extract({ left: Math.round((width - cropW) / 2), top: 0, width: cropW, height })
    .resize({ width: 720 })
    .jpeg(JPEG)
    .toFile(out);
  console.log("  crop  ", out);
}

async function main() {
  console.log(`optimize-images (FORCE=${FORCE ? "1" : "0"})`);
  await buildHeroPortrait();
  for (const jpg of jpgTargets()) {
    console.log(jpg);
    await processJpg(jpg);
  }
  await buildOgImage();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
