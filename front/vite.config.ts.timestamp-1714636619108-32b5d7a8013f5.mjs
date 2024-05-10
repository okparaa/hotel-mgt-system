// vite.config.ts
import { defineConfig } from "file:///var/www/hotels/moxok/front/node_modules/vite/dist/node/index.js";
import preact from "file:///var/www/hotels/moxok/front/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import { ViteImageOptimizer } from "file:///var/www/hotels/moxok/front/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    preact(),
    ViteImageOptimizer({
      png: {
        quality: 40
      },
      jpeg: {
        quality: 40
      },
      jpg: {
        quality: 40
      },
      tiff: {
        quality: 40
      }
    })
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
    "globalThis.__DEV__": JSON.stringify(true)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvdmFyL3d3dy9ob3RlbHMvbW94b2svZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi92YXIvd3d3L2hvdGVscy9tb3hvay9mcm9udC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vdmFyL3d3dy9ob3RlbHMvbW94b2svZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHByZWFjdCBmcm9tIFwiQHByZWFjdC9wcmVzZXQtdml0ZVwiO1xuaW1wb3J0IHsgVml0ZUltYWdlT3B0aW1pemVyIH0gZnJvbSBcInZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplclwiO1xuLy8gaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBwcmVhY3QoKSxcbiAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgcG5nOiB7XG4gICAgICAgIHF1YWxpdHk6IDQwLFxuICAgICAgfSxcbiAgICAgIGpwZWc6IHtcbiAgICAgICAgcXVhbGl0eTogNDAsXG4gICAgICB9LFxuICAgICAganBnOiB7XG4gICAgICAgIHF1YWxpdHk6IDQwLFxuICAgICAgfSxcbiAgICAgIHRpZmY6IHtcbiAgICAgICAgcXVhbGl0eTogNDAsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIC8vIFZpdGVQV0Eoe1xuICAgIC8vICAgc3JjRGlyOiBcInNyY1wiLFxuICAgIC8vICAgZmlsZW5hbWU6IFwic3cudHNcIixcbiAgICAvLyAgIHN0cmF0ZWdpZXM6IFwiaW5qZWN0TWFuaWZlc3RcIixcbiAgICAvLyAgIGluamVjdFJlZ2lzdGVyOiBmYWxzZSxcbiAgICAvLyAgIG1hbmlmZXN0OiBmYWxzZSxcbiAgICAvLyAgIGRldk9wdGlvbnM6IHtcbiAgICAvLyAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvLyAgICAgdHlwZTogXCJtb2R1bGVcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBpbmplY3RNYW5pZmVzdDoge1xuICAgIC8vICAgICBpbmplY3Rpb25Qb2ludDogbnVsbCxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSksXG4gIF0sXG4gIGRlZmluZToge1xuICAgIFwiZ2xvYmFsVGhpcy5fX0RFVl9fXCI6IEpTT04uc3RyaW5naWZ5KHRydWUpLFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1RLFNBQVMsb0JBQW9CO0FBQ2hTLE9BQU8sWUFBWTtBQUNuQixTQUFTLDBCQUEwQjtBQUluQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxtQkFBbUI7QUFBQSxNQUNqQixLQUFLO0FBQUEsUUFDSCxTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0EsTUFBTTtBQUFBLFFBQ0osU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWVIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixzQkFBc0IsS0FBSyxVQUFVLElBQUk7QUFBQSxFQUMzQztBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
