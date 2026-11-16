// Kill-switch service worker (tam thoi, o scope goc "/").
// Muc dich: go dang ky SW cu cua app OMR (truoc day cai o root) va xoa cache cu,
// de trang chu moi (danh sach app) hien dung. Sau khi moi may da mo lai trang chu
// mot lan, co the xoa file nay khoi repo.
self.addEventListener("install", function (e) { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil((async function () {
    try {
      var ks = await caches.keys();
      await Promise.all(ks.map(function (k) { return caches.delete(k); }));
    } catch (err) {}
    try { await self.registration.unregister(); } catch (err) {}
    try {
      var cs = await self.clients.matchAll({ type: "window" });
      cs.forEach(function (c) { c.navigate(c.url); });
    } catch (err) {}
  })());
});
