import { createValidHTML } from "./create-valid-html";
import { findByText, getByText } from "@testing-library/dom";
import ReactDOM from "react-dom/server";
import React from "react";
import { BodyScript } from "../components/script";
import { getByTag } from "./test-utils/queries";

const findAllTagsFromHTMLString = (html: string, tagNameRegex: RegExp) => [
  ...html.matchAll(tagNameRegex),
];

const renderReactElementToString = <T extends React.FC<any>>(
  comp: T,
  props: T extends React.FC<infer P> ? P : never = {} as never,
  children: React.ReactNode[] = []
) => {
  return ReactDOM.renderToStaticMarkup(
    React.createElement(comp, props, children)
  );
};

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

  test("Embed HTML that's been passed in", async () => {
    const validHTML = (await createValidHTML("<p>Test</p>")).toString();

    document.body.innerHTML = validHTML;

    expect(getByText(document.body, "Test")).toBeInTheDocument();
  });

  test("Embed BodyScript into the body", async () => {
    const validHTML = (
      await createValidHTML(
        renderReactElementToString(BodyScript, {
          contents: `console.log("Test")`,
        })
      )
    ).toString();

    document.body.innerHTML = validHTML;

    const scriptTag = getByTag(document.body, "script");
    expect(scriptTag).toBeInTheDocument();
    expect(scriptTag.innerHTML).toContain('console.log("Test")');
  });
});
