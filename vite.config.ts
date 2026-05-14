import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // UNCOMMENTED AND SET TO YOUR REPO NAME
  base: '/nikkahcelebration/', 
  
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "dist",
  },
});
