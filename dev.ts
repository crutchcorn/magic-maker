import { dirname, resolve } from "node:path";
import { fileURLToPath } from "url";
import { compilePages } from "./src";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dirToScan = resolve(__dirname, "./example");
const outDir = resolve(__dirname, "./dist");
await compilePages(dirToScan, outDir);
