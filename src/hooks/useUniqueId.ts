let num = 0;

/**
 * This differs from React's `useId` in a few key ways:
 *
 * 1) It is safe to use in a loop, since we don't have to worry about client
 *       rehydration using this framework.
 * 2) It seems to handle initial hydration a little better for our `renderToStaticMarkup` usage
 */
const useUniqueId = () => {
  return `id_${num}`
};

export default useUniqueId;
