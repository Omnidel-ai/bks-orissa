/**
 * One-shot: adapt svgmap-odisha path data into BKS district ids.
 * Source package: svgmap-odisha (ISC) — https://github.com/arav-ind/svgmaps-india
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const codeToId = {
  BHA: "bhadrak",
  DHE: "dhenkanal",
  JAJ: "jajpur",
  SUB: "subarnapur",
  NUA: "nuapada",
  BAL: "balangir",
  BOU: "boudh",
  CUT: "cuttack",
  KAN: "kandhamal",
  NAY: "nayagarh",
  KHO: "khordha",
  KAL: "kalahandi",
  JAG: "jagatsinghpur",
  PUR: "puri",
  NAB: "nabarangpur",
  RAY: "rayagada",
  KOR: "koraput",
  MAL: "malkangiri",
  ANG: "angul",
  KEN: "kendrapara",
  GAN: "ganjam",
  GAJ: "gajapati",
  MAY: "mayurbhanj",
  SUN: "sundargarh",
  KE2: "keonjhar",
  BA2: "balasore",
  JHA: "jharsuguda",
  BAR: "bargarh",
  DEO: "deogarh",
  SAM: "sambalpur",
};

const srcPath = path.join(
  os.tmpdir(),
  "svgmap-odisha-extract",
  "package",
  "src",
  "constants",
  "odisha.ts",
);
const src = fs.readFileSync(srcPath, "utf8");
const assign = src.indexOf("export const drawPath");
const eq = src.indexOf("=", assign);
const brace = src.indexOf("{", eq);
if (brace < 0) throw new Error("drawPath object not found");
let depth = 0;
let end = -1;
let inTick = false;
for (let i = brace; i < src.length; i++) {
  const ch = src[i];
  if (ch === "`") {
    inTick = !inTick;
    continue;
  }
  if (inTick) continue;
  if (ch === "{") depth++;
  else if (ch === "}") {
    depth--;
    if (depth === 0) {
      end = i;
      break;
    }
  }
}
if (end < 0) throw new Error("drawPath object end not found");
const body = src.slice(brace, end + 1);
const obj = {};
const re = /'([A-Z0-9]{3})':\s*`([\s\S]*?)`/g;
let hit;
while ((hit = re.exec(body))) {
  const id = codeToId[hit[1]];
  if (!id) throw new Error(`Unknown map code ${hit[1]}`);
  obj[id] = hit[2].trim();
}
const ids = Object.keys(obj);
if (ids.length !== 30) {
  throw new Error(`Expected 30 districts, got ${ids.length}: ${ids.join(",")}`);
}

const outPath = path.join("src", "content", "presence", "odisha-map-paths.ts");
const header = `/** Odisha district SVG path data (viewBox 0 0 1000 779.88).
 * Adapted from svgmap-odisha (ISC) by Aravind D — https://github.com/arav-ind/svgmaps-india
 * Keys match BKS Odisha Presence district ids.
 */
export const ODISHA_MAP_VIEWBOX = "0 0 1000 779.88" as const;

export const ODISHA_DISTRICT_PATHS: Record<string, string> = `;

fs.writeFileSync(outPath, `${header}${JSON.stringify(obj, null, 2)};\n`);
console.log(`Wrote ${ids.length} paths → ${outPath}`);
