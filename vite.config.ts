import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindVite from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindVite()],
});
