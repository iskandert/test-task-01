import path from "path";
import { defineConfig } from "vite";

const SRC_DIR = path.resolve(__dirname, "./src");
const PUBLIC_DIR = path.resolve(__dirname, "./public");
const BUILD_DIR = path.resolve(__dirname, "./build");

export default defineConfig({
  root: path.resolve(__dirname),
  publicDir: PUBLIC_DIR,
  build: {
    outDir: BUILD_DIR,
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": SRC_DIR,
    },
  },
  server: {
    host: true,
  },
});
