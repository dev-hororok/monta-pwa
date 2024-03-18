self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    icon: 'https://d2quahb2ygxiv.cloudfront.net/3235712d0c0f11899f4bf.png',
    badge: 'https://d2quahb2ygxiv.cloudfront.net/23235712d0c0f11899f4b.png', // cdn
    tag: 'pomodoro-timer', // 알람 최대 1개 표시
    renotify: true, // 알람이 겹치면 다시 알림
    body: resultData.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
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
