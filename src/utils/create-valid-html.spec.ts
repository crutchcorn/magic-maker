import { createValidHTML } from "./create-valid-html";
import { getByText } from "@testing-library/dom";
import ReactDOM from "react-dom/server";
import React from "react";
import { BodyScript, HeadScript } from "../components/script";
import { getAllByTag, getByTag, queryByTag } from "./test-utils/queries";

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
    const findAllTagsFromHTMLString = (html: string, tagNameRegex: RegExp) => [
      ...html.matchAll(tagNameRegex),
    ];

    const validHTML = (await createValidHTML("<div></div>")).toString();

    expect(findAllTagsFromHTMLString(validHTML, /<html>/g).length).toBe(1);
    expect(findAllTagsFromHTMLString(validHTML, /<\/html>/g).length).toBe(1);
  });

  test("Create valid HTML with only one body tag", async () => {
    const validHTML = (await createValidHTML("<div></div>")).toString();

    document.documentElement.innerHTML = validHTML;

    expect(getAllByTag(document.documentElement, "body").length).toBe(1);
  });

  test("Create valid HTML with only one head tag", async () => {
    const validHTML = (await createValidHTML("<div></div>")).toString();

    document.documentElement.innerHTML = validHTML;

    expect(getAllByTag(document.documentElement, "head").length).toBe(1);
  });

  test("Embed HTML body tags that've been passed in", async () => {
    const validHTML = (await createValidHTML("<p>Test</p>")).toString();

    document.documentElement.innerHTML = validHTML;

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

    document.documentElement.innerHTML = validHTML;

    const scriptTag = getByTag(document.body, "script");
    expect(scriptTag).toBeInTheDocument();
    expect(scriptTag.innerHTML).toContain('console.log("Test")');
  });

  test("Don't embed HeadScript into the body", async () => {
    const validHTML = (
      await createValidHTML(
        renderReactElementToString(HeadScript, {
          contents: `console.log("Test")`,
        })
      )
    ).toString();

    document.documentElement.innerHTML = validHTML;

    expect(queryByTag(document.body, "script")).not.toBeInTheDocument();
  });
});
