import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
// import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    ViteImageOptimizer({
      png: {
        quality: 40,
      },
      jpeg: {
        quality: 40,
      },
      jpg: {
        quality: 40,
      },
      tiff: {
        quality: 40,
      },
    }),
    // VitePWA({
    //   srcDir: "src",
    //   filename: "sw.ts",
    //   strategies: "injectManifest",
    //   injectRegister: false,
    //   manifest: false,
    //   devOptions: {
    //     enabled: true,
    //     type: "module",
    //   },
    //   injectManifest: {
    //     injectionPoint: null,
    //   },
    // }),
  ],
  define: {
    "globalThis.__DEV__": JSON.stringify(true),
  },
});
