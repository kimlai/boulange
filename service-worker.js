"use strict";

// file mostly stolen from https://github.com/chriscoyier/Simple-Offline-Site/blob/82b765bf9944844bb50d91364616a52a8b97d464/js/service-worker.js

// this version number should be changed everytime one of the cached assets is changed
const VERSION = "v4";

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then(cache =>
        cache.addAll([
          "/",
          "styles.css",
          "boulange.js",
          "vue@2.6.0.js",
          "fonts/solway-v2-latin-800.woff",
          "fonts/solway-v2-latin-800.woff2",
          "fonts/solway-v2-latin-regular.woff",
          "fonts/solway-v2-latin-regular.woff2"
        ])
      )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => !key.startsWith(VERSION))
            .map(key => caches.delete(key))
        )
      )
  );
});
