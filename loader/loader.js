import {
  load as esbuildLoad,
  resolve as esbuildResolve,
} from "@esbuild-kit/esm-loader";

export async function load(url, context, defaultLoad) {
  const loaded = await esbuildLoad(url, context, defaultLoad);
  if (url.endsWith(".css")) {
    const code = loaded.source.toString();

    // TODO: Extract this to a JavaScript file and run a Function.toString() and finally a REGEX.replace
    //   This will make the DX of modifying this code SIGNIFICANTLY better
    const transformedCode = `
    import React from 'react';
    
    export default () => 
      React.createElement('style', {dangerouslySetInnerHTML: {__html: \`${code}\`}})
    `;

    return {
      format: "module",
      source: transformedCode,
    };
  }

  return loaded;
}
export async function resolve(specifier, context, defaultResolve) {
  const resolved = await esbuildResolve(specifier, context, defaultResolve);

  // This is the default, but is explicit to make sure that we know how to do this in the future if needed
  if (resolved.url.endsWith(".css")) {
    return {
      ...resolved,
      format: "module",
    };
  }

  return resolved;
}
