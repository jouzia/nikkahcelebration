import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// This config removes the Cloudflare-specific server requirement
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist",
  },
  // If publishing to GitHub Pages, uncomment the line below and put your repo name
  // base: '/nikkahcelebration/', 
});
