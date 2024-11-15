import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// @ts-ignore
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  server: {
    open: "/Gnome-Bazaar/login",
    host: "0.0.0.0",
    port: 3000,
    cors: {
      allowedHeaders: "*",
      methods: "*",
      origin: "*",
    },
  },
  appType: "spa",
  plugins: [react(), eslintPlugin()],
});
