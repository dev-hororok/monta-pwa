self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-96x96.png', // 96x96이 넘어가면 기본 문자열로 적용됨
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
