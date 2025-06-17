import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5000,
    host: "0.0.0.0",
    allowedHosts: ["localhost", ".replit.dev", ".replit.app", "d5d70c82-46b4-445e-82dd-e514a8e46137-00-3tvzba4rtrtq5.riker.replit.dev"],
    hmr: {
      port: 5000,
    },
    watch: {
      usePolling: true,
    },
  },
});