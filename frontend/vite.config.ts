import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Serve over HTTP
    https: false,
    // Adjust the port to a compatible one (e.g., 80 or 8080)
    port: 80,
    // Allow external access (e.g., for testing on a TV)
    host: "0.0.0.0",
    // Enable strict mode for better compatibility
    strictPort: true,
  },
  build: {
    // Transpile to ES5 for compatibility
    target: "es5",
    // Set a compatible output directory
    outDir: "dist",
  },
  // Adjust other options as needed for your project
});
