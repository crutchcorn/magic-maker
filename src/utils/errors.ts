export class PageGenerationFail extends Error {
  constructor(message: string) {
    super(`Page generation failure: ${message}`);
  }
}
