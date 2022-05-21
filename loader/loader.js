import {
  load as esbuildLoad,
  resolve as esbuildResolve,
} from "@esbuild-kit/esm-loader";

export async function load(url, context, defaultLoad) {
  return await esbuildLoad(url, context, defaultLoad);
}
export async function resolve(specifier, context, defaultResolve) {
  return await esbuildResolve(specifier, context, defaultResolve);
}
