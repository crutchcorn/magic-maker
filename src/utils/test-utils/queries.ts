import { wrapAllByQueryWithSuggestion } from "@testing-library/dom/dist/query-helpers";
import { checkContainerType } from "@testing-library/dom/dist/helpers";
import {
  GetErrorFunction,
  buildQueries,
  Matcher,
  MatcherOptions,
} from "@testing-library/dom";

const queryAllByTag = <T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  text: string
): T[] => {
  checkContainerType(container);
  return Array.from(container.querySelectorAll(text));
};
const getMultipleError: GetErrorFunction<[unknown]> = (c, text) =>
  `Found multiple elements with the tag name of: ${text}`;
const getMissingError: GetErrorFunction<[unknown]> = (c, text) =>
  `Unable to find an element with the tag name of: ${text}`;

const queryAllByTagWithSuggestions = wrapAllByQueryWithSuggestion<
  // @ts-expect-error -- See `wrapAllByQueryWithSuggestion` Argument constraint comment
  [name: Matcher, options?: MatcherOptions]
>(queryAllByTag, queryAllByTag.name, "queryAll");

const [queryByTag, getAllByTag, getByTag, findAllByTag, findByTag] =
  buildQueries(queryAllByTag, getMultipleError, getMissingError);

export {
  queryByTag,
  queryAllByTagWithSuggestions as queryAllByTag,
  getByTag,
  getAllByTag,
  findAllByTag,
  findByTag,
};
