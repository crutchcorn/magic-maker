- [ ] Create ESLint rules that you cannot use any interactive React stuff
  - `useState`
  - `useRef`
  - `useReducer`
  - `useLayoutEffect`
  - `useEffect`
  - `useDebug`
  - `useDeferredValue`
- [x] Add in simple method for introducing client side logic
  - Do not use React for this - too heavy at 100kb
- [ ] Add support for merging in-body `<head>` tags
  - Use [`rehype-css-to-top`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-css-to-top) as basis for code
  - Potentially use [`rehype-concat-javascript`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-concat-javascript) as basis
- [x] Add in simple method to consume SCSS
- [ ] Investigate method of providing IDE syntax highlighting for JS strings using template literal:

```javascript
const script = js`
    console.log("Test");
`;
```

- [ ] Add in container `Document` NextJS API alternative
  - Demo with `index.html` and loading in custom fonts/css
- [ ] Add in live-refresh server (no HMR) for dev mode
- [ ] [Add in `paths` to remap `example` code to `magicmaker`, so it looks like it's using an NPM package](https://github.com/esbuild-kit/tsx/issues/15)
- [ ] Add in TurboRepo to test example and non-example individually
- [x] Add Babel parser to make `<BodyScript contents={fn.toString()}/>` easier
  - This will enable us to do fun stuff to generate script tag logic, such as:
  - `function getScriptFn(id) => () => querySelector(id); <BodyScript contents={getScriptFn().toString()} /> `
- [x] Add in basic integration tests with Jest DOM Testing Library
- [ ] Add in basic E2E tests using `cli-testing-library`
- [ ] Make `getStaticPaths` generate multiple pages. IDEK what this does currently
- [ ] Add easy image optimization step
  - Step 1: Copy files to `dist` after build
  - Step 2: Host images in `dev` mode with the same name so a simple `src=""` works
  - Step 3: Add in `sharp` script to optimize all images, based on query params to `src`
