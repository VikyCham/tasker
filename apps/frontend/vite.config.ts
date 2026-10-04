import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    dedupe: ["zod"],
    alias: [
      { find: /^zod$/, replacement: path.resolve(__dirname, "../../node_modules/zod/index.js") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@tasker/openapi", replacement: path.resolve(__dirname, "../../packages/openapi/src") },
      { find: "@tasker/zod", replacement: path.resolve(__dirname, "../../packages/zod/src") },
    ],
  },
});
