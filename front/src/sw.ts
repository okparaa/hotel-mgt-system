const version = 1;
const cacheName = `wurks${version}`;
const cacheList = ["/"];
const shortid = require("shortid");
const __GRAPHQL_URL__ = "http://localhost:5100/api";

self.addEventListener("install", (ev: any) => {
  //load the cacheList array into the cache
  console.log("installing");
  ev.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(cacheList);
    })
  );
});

self.addEventListener("activate", (ev: any) => {
  //delete old versions of the cache
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key != cacheName).map((nm) => caches.delete(nm))
      );
    })
  );
});

self.addEventListener("fetch", async (ev: any) => {
  //handle fetch requests
  //online? external? font? css? img? html? specific folder?
  // const isOnline = self.navigator.onLine;
  const url = ev.request.url;
  if (url === __GRAPHQL_URL__) {
    ev.respondWith(staleWhileRevalidate(ev));
  } else if (ev.request.method === "GET") {
    console.log(ev.request.method);

    ev.respondWith(cacheFirst(ev));
  }
});

export function cacheOnly(ev: any): Promise<any> {
  //only return what is in the cache
  return caches.match(ev.request);
}
export function cacheFirst(ev: any): Promise<any> {
  //return from cache or fetch if not in cache
  return caches.match(ev.request).then((cacheResponse) => {
    const fetchPromise = fetch(ev.request.clone())
      .then(async (response) => {
        return await caches.open(cacheName).then(async (cache) => {
          await cache.put(ev.request.clone(), response.clone());
          return response;
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return cacheResponse || fetchPromise;
  });
}
export function networkOnly(ev: any): Promise<any> {
  //only return fetch response
  return fetch(ev.request);
}
export function networkFirst(ev: any): Promise<any> {
  //try fetch and fallback on cache
  return fetch(ev.request).then((fetchResponse) => {
    if (fetchResponse.ok) {
      return fetchResponse;
    }
    return caches.match(ev.request);
  });
}
async function staleWhileRevalidate(event: any) {
  let cachedResponse = await getCache(event.request.clone());
  let fetchPromise = fetch(event.request.clone())
    .then(async (response) => {
      if (event.request.clone().method == "POST") {
        await setCache(event.request.clone(), response.clone());
      }
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
  return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}
async function serializeResponse(response: any) {
  let serializedHeaders: any = {};
  for (let entry of response.headers.entries()) {
    serializedHeaders[entry[0]] = entry[1];
  }
  let serialized: any = {
    headers: serializedHeaders,
    status: response.status,
    statusText: response.statusText,
  };
  serialized.body = await response.json();
  return serialized;
}

async function setCache(request: any, response: Response) {
  let body = await request.json();
  let id = shortid.generate();
  var entry = {
    id: id,
    query: body.query,
    response: await serializeResponse(response),
    timestamp: Date.now(),
  };
  console.log(entry);
}

async function getCache(request: any) {
  // let data;
  try {
    let body = await request.json();
    console.log(body);

    //   let id = shortid.generate()
    //   // Check cache max age.
    //   let cacheControl = request.headers.get("Cache-Control");
    //   let maxAge = cacheControl ? parseInt(cacheControl.split("=")[1]) : 3600;
    //   if (Date.now() - data.timestamp > maxAge * 1000) {
    //     console.log(`Cache expired. Load from API endpoint.`);
    //     return null;
    //   }
    //   console.log(`Load response from cache.`);
    //   return new Response(JSON.stringify(data.response.body), data.response);
  } catch (err) {
    return null;
  }
}

export async function getPostKey(request: any) {
  let body = await request.json();
  return JSON.stringify(body);
}
self.addEventListener("message", (ev) => {
  //message from a client
  if (ev.data.TYPE && ev.data.TYPE === "PORT") {
    //we are getting a port
    console.log(ev.ports[0]);
  }
});
