import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    cors: {
      allowedHeaders: "*",
      methods: "*",
      origin: "*",
    },
  },
  appType: "spa",
  plugins: [react()],
});
