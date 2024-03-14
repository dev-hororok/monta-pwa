self.addEventListener('install', function () {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function () {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    tag: 'pomodoro-timer',
    body: resultData.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  const urlToOpen = new URL('/', self.location.origin).href;

  // 이미 열려 있는 탭에 포커스를 주거나, 새 탭을 열기
  const promiseChain = self.clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return self.clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
