# What is this?

This is a Node loader that handles the following extensions and converts them to ESM files:

- `ts`
- `tsx`
- `js`
- `jsx`
- `json`
- `mjs`
- `cjs`
- `cts`
- `mts`
- `css`* (exports as a `<style>` tag inside a React component)

> \* marked files are ones that we added that were not originally present in [`@esbuild-kit/esm-loader`](https://github.com/esbuild-kit/esm-loader)

# Motivation

We didn't want to use Webpack :)

# Contributing

These files must stay in JavaScript since:

1) Node can only read JS loaders
2) I don't want to introduce a build step yet
