import fs from "node:fs";
import path from "node:path";

const SCREEN_EXT = /\.(png|jpe?g|webp|avif)$/i;
const SCREENS_PUBLIC_DIR = path.join(
  process.cwd(),
  "public",
  "projects",
  "screens",
);

export function getProjectGalleryImages(slug: string): string[] {
  const dir = path.join(SCREENS_PUBLIC_DIR, slug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => SCREEN_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => `/projects/screens/${slug}/${name}`);
}
