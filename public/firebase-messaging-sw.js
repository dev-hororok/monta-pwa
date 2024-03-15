self.addEventListener('install', () => {
  self.skipWaiting(); // 이전 버전의 서비스 워커를 대기 상태로 만들지 않고 즉시 새 버전으로 전환
});

self.addEventListener('activate', () => {
  // event.waitUntil(
  //   self.clients.claim() // 새로운 서비스 워커가 활성화되면, 열려 있는 클라이언트를 즉시 제어
  // );
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-128x128.png',
    tag: 'pomodoro-timer', // 알람 최대 1개 표시
    renotify: true, // 알람이 겹치면 다시 알림
    body: resultData.body,
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
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
