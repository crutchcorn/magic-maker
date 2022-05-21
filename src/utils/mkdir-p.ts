import { promises as fsProm } from "node:fs";
import { resolve } from "node:path";

export async function mkdirP(base: string, paths: string[]) {
  for (let i = 0; i < paths.length; i++) {
    const folderPath = resolve(base, ...[...paths].slice(0, i + 1));
    try {
      const stat = await fsProm.stat(folderPath);
      if (!stat.isDirectory()) {
        // TODO: Throw this without being caught
        console.error(
          "You are attempting to overwrite an existing file with a folder creation"
        );
      }
      // Nothing exists here
    } catch (e) {
      await fsProm.mkdir(folderPath);
    }
  }
}
