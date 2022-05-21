/**
 * Given a partial HTML document, provide the `<DOCTYPE>`, `<html>`, `<head>`, etc
 */
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

export function createValidHTML(html: string) {
  return unified()
    .use(rehypeParse)
    .use(rehypeStringify, {
      allowDangerousHtml: true,
      allowDangerousCharacters: true,
      allowParseErrors: true,
    })
    .process(html);
}
