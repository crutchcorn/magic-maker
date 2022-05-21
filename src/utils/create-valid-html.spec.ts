import { createValidHTML } from "./create-valid-html";

const findAllTagsFromHTMLString = (html: string, tagNameRegex: RegExp) => [
  ...html.matchAll(tagNameRegex),
];

describe("createValidHTML", () => {
  test("Create valid HTML with only one html tag", async () => {
    const validHTML = (await createValidHTML("<div></div>")).toString();

    expect(findAllTagsFromHTMLString(validHTML, /<html>/g).length).toBe(1);
    expect(findAllTagsFromHTMLString(validHTML, /<\/html>/g).length).toBe(1);
  });

  test("Create valid HTML with only one body tag", async () => {
    const validHTML = (await createValidHTML("<div></div>")).toString();

    expect(findAllTagsFromHTMLString(validHTML, /<body>/g).length).toBe(1);
    expect(findAllTagsFromHTMLString(validHTML, /<\/body>/g).length).toBe(1);
  });

  test("Create valid HTML with only one head tag", async () => {
    const validHTML = (await createValidHTML("<div></div>")).toString();

    expect(findAllTagsFromHTMLString(validHTML, /<head>/g).length).toBe(1);
    expect(findAllTagsFromHTMLString(validHTML, /<\/head>/g).length).toBe(1);
  });
});
