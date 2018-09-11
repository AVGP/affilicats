const VERSION=1536655486734,OFFLINE_CACHE=`offline_${1536655486734}`,TIMEOUT=5e3,OFFLINE_IMG_URL="./img/offline.svg",TIMEOUT_IMG_URL="./img/timeout.svg",STATIC_FILES=["./","./index.html","./forward.html","./manifest.webmanifest","./js/main.js","./js/forward.js","./img/cat.png","./img/map.svg",OFFLINE_IMG_URL,TIMEOUT_IMG_URL];self.addEventListener("install",async a=>{self.skipWaiting(),a.waitUntil((async()=>{const a=await caches.open(OFFLINE_CACHE);return a.addAll(STATIC_FILES)})())}),self.addEventListener("activate",a=>{a.waitUntil((async()=>{const a=await caches.keys();return Promise.all(a.map(a=>{if(a!==OFFLINE_CACHE)return caches.delete(a)})).then(()=>self.clients.claim())})())}),self.addEventListener("fetch",a=>{const b=async(a,b={},c={})=>{const d=await caches.open(OFFLINE_CACHE),e=await d.match(a,b);return e||fetch(a,c)},c=async(a,c,d)=>{const e=new Promise(a=>setTimeout(()=>{if("image"===c)return a(b(TIMEOUT_IMG_URL));if(!c){if("https://commons.wikimedia.org"===d.origin){const b=new Blob([JSON.stringify({query:{pages:{}}})],{type:"application/json"});return a(new Response(b))}if("https://www.random.org"===d.origin){const b=new Blob(["Offers timed out while loading\n"],{type:"text/plain"});return a(new Response(b))}if("https://baconipsum.com"===d.origin){const b=new Blob([JSON.stringify(["Reviews took too long to load\u2026"])],{type:"application/json"});return a(new Response(b))}if("https://placekitten.com"===d.origin)return a(b(TIMEOUT_IMG_URL))}},TIMEOUT)),f=d.origin===location.origin,g=fetch(a).then(b=>{if(f&&!b.ok)throw new TypeError(`Could not load ${a.url}`);return b}).catch(()=>{if("image"===c)return b(OFFLINE_IMG_URL);if(!c){if("https://commons.wikimedia.org"===d.origin){const a=new Blob([JSON.stringify({query:{pages:{}}})],{type:"application/json"});return new Response(a)}if("https://www.random.org"===d.origin){const a=new Blob(["Offers can't be loaded while offline\n"],{type:"text/plain"});return new Response(a)}if("https://baconipsum.com"===d.origin){const a=new Blob([JSON.stringify(["Reviews can't be loaded while offline\u2026"])],{type:"application/json"});return new Response(a)}if("https://placekitten.com"===d.origin)return b(OFFLINE_IMG_URL)}return new Response});return Promise.race([e,g])};a.respondWith((async()=>{const d=a.request;if("navigate"===d.mode)return b(d,{ignoreSearch:!0});const e=d.destination,f=new URL(d.url);if("chrome-extension:"===f.protocol)return fetch(f);if(e){if("script"===e)return"https://unpkg.com"===f.origin?b(d,{},{mode:"no-cors"}):b(d);if("image"===e)return STATIC_FILES.includes(d.url)?b(d):c(d,e,f)}return"https://unpkg.com"===f.origin?b(d,{},{mode:"no-cors"}):c(d,e,f)})())});