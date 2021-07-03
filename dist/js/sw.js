const CACHE_NAME = 'vmori-caches-v0.0.1'

//キャッシュするファイルを定義
const urlsToCache = [

]

//ServuceWerkcer登録時に飛ばれるinstallイベントでキャッシュを登録する
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
          .open(CACHE_NAME)
          .then((cache) => {
            return cache.addAll(urlsToCache);
          })
      )
})

//他のページに移動したりページを更新するとfetchが走る、ここでリクエストをキャッシュとして返したりするらしい
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return response ? response : fetch(event.request);
        })
    )
  })