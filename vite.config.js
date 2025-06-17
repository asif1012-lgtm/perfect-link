import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: [
      "all",
      "a717b297-aec9-4783-b642-7606be697441-00-20voswj26j5rz.pike.replit.dev"
    ],
  },
});