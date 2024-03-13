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
    body: resultData.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
