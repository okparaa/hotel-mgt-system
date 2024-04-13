type AppProps = {
  SW: ServiceWorker | null;
  init: () => void;
  DB: typeof indexedDB | null;
  registerSW: () => void;
};
export const SwInit: AppProps = {
  SW: null,
  DB: null,
  init() {
    //APP.registerSW();
  },
  registerSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(
          import.meta.env.MODE === "production"
            ? "/sw.ts"
            : "/dev-sw.js?dev-sw",
          { type: import.meta.env.MODE === "production" ? "classic" : "module" }
        )
        .then((registeration) => {
          SwInit.SW =
            registeration.installing ||
            registeration.waiting ||
            registeration.active;
          console.log("registered service worker");
        });
      if (navigator.serviceWorker.controller) {
        console.log("service worker is installed");
      }
      navigator.serviceWorker.oncontrollerchange = (evt: any) => {
        console.log("service worker updated " + JSON.stringify(evt));
      };
    } else {
      console.log("service worker is not supported");
    }
  },
};
