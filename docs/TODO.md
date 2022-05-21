- [ ] Create ESLint rules that you cannot use any interactive React stuff
  - `useState`
  - `useRef`
  - `useReducer`
  - `useLayoutEffect`
  - `useEffect`
  - `useDebug`
  - `useDeferredValue`
- [ ] Add in simple method for introducing client side logic (not using React)
- [ ] Add support for merging in-body `<head>` tags
  - Use [`rehype-css-to-top`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-css-to-top) as basis for code
  - Potentially use [`rehype-concat-javascript`](https://github.com/rehypejs/rehype-minify/tree/main/packages/rehype-concat-javascript) as basis