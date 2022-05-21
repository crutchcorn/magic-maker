import React from "react";
import ReactDOM from "react-dom/server";

import { readdirSync } from "node:fs";
import { resolve, basename, extname } from "node:path";
import { Page } from "./types";
import { PageGenerationFail } from "./utils";
import { pathToFileURL } from "url";

export async function compilePages(dirToScan: string) {
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

      const pageHTML = ReactDOM.renderToStaticMarkup(
        React.createElement(data.default, {}, [])
      );

      console.log({ paths, fileNameNoExt, pageHTML });
      return;
    }

    // TODO: Improve validation against all kinds of URL paths
    const allowedPageNameRegex = /^[A-Za-z0-9\-]+$/;
    if (!allowedPageNameRegex.exec(fileNameNoExt)) {
      throw new PageGenerationFail(`
               You provided an invalid page name with your file: ${fileName}
            `);
    }

    if (data.getStaticPaths) {
      console.warn(`
            You attempted to pass a 'getStaticPaths' method to the page in: ${fileName}.
            
            This is not supported, and you should use the file name of of '[...${fileNameNoExt}]' instead
        `);
    }

    const pageHTML = ReactDOM.renderToStaticMarkup(
      React.createElement(data.default, {}, [])
    );
    // TODO: Add in HTML generation
    console.log({ fileNameNoExt, pageHTML });
  }
}
