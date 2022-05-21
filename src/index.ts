import React from "react";
import ReactDOM from "react-dom/server";

import { readdirSync, promises as fsProm } from "node:fs";
import { resolve, basename, extname } from "node:path";
import { Page } from "./types";
import {
  createValidHTML,
  PageGenerationFail,
  mkdirP,
  validatePageName,
} from "./utils";
import { pathToFileURL } from "url";

export async function compilePages(dirToScan: string, outDir: string) {
  const pagesDir = resolve(dirToScan, "./pages");
  const files = readdirSync(pagesDir);

  for (const fileName of files) {
    const fileNameNoExt = basename(fileName, extname(fileName));
    const data = (await import(
      pathToFileURL(resolve(pagesDir, fileName)) as never
    )) as Page;
    if (fileNameNoExt.startsWith("[...") && fileNameNoExt.endsWith("]")) {
      if (!data.getStaticPaths) {
        throw new PageGenerationFail(`
                You did not provide a 'getStaticPaths' function for your dynamic page: ${fileName}
            `);
      }
      const { paths } = data.getStaticPaths();

      if (!paths.length) {
        throw new PageGenerationFail(`
                Your 'getStaticPaths' function did not return any path data for your dynamic page: ${fileName}
            `);
      }

      const pageHTML = ReactDOM.renderToStaticMarkup(
        React.createElement(data.default, {}, [])
      );

      for (const path of paths) {
        if (Array.isArray(path)) {
          const finalName = path.pop() as string;
          validatePageName(finalName, fileName);
          await mkdirP(outDir, path);
          const filePath = resolve(outDir, ...path);
          const validHTML = await createValidHTML(pageHTML);

          await fsProm.writeFile(
            resolve(filePath, `${finalName}.html`),
            validHTML.toString()
          );

          continue;
        }

        const finalName = path as string;
        validatePageName(finalName, fileName);
        const validHTML = await createValidHTML(pageHTML);
        await fsProm.writeFile(
          resolve(outDir, `${finalName}.html`),
          validHTML.toString()
        );
      }

      return;
    }

    validatePageName(fileNameNoExt, fileName);

    if (data.getStaticPaths) {
      console.warn(`
            You attempted to pass a 'getStaticPaths' method to the page in: ${fileName}.
            
            This is not supported, and you should use the file name of of '[...${fileNameNoExt}]' instead
        `);
    }

    const pageHTML = ReactDOM.renderToStaticMarkup(
      React.createElement(data.default, {}, [])
    );

    const validHTML = await createValidHTML(pageHTML);
    await mkdirP(outDir, ["."]);
    await fsProm.writeFile(
      resolve(outDir, `${fileNameNoExt}.html`),
      validHTML.toString()
    );
  }
}
