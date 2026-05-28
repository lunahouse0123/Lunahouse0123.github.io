const CACHE_NAME = 'dog-salon-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  // 如果您有額外的 CSS 或 JS 檔案，請在此添加，例如：
  // '/style.css',
  // '/app.js',
  // 請確保快取常用的外部資源（如果允許）或圖標
  'https://wcfbcayehdwwphymcwmh.supabase.co/storage/v1/object/public/logo/logo.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// 安裝 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 激活 Service Worker 並清理舊快取
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 攔截請求並使用快取策略
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取中有，就直接回傳；沒有則發送網路請求
      return response || fetch(event.request);
    })
  );
});