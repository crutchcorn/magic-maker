/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./vite-global-setup.ts"],
    globals: true,
  },
});
