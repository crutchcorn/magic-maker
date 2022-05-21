// TODO: Improve validation against all kinds of URL paths
import { PageGenerationFail } from "./errors";

const allowedPageNameRegex = /^[A-Za-z0-9\-]+$/;

export function validatePageName(fileNameNoExt: string, fileName: string) {
  if (!allowedPageNameRegex.exec(fileNameNoExt)) {
    throw new PageGenerationFail(`
You provided an invalid page name with your file: ${fileName}
`);
  }
}
