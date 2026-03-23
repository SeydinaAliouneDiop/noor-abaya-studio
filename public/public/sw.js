self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'Nouvelle commande reçue !',
    icon: '/modest-pearl-logo.png',
    badge: '/modest-pearl-logo.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/admin/commandes' },
    actions: [
      { action: 'view', title: 'Voir la commande' },
      { action: 'close', title: 'Fermer' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '🛍️ Modest Pearl', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'view' || !event.action) {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(function(clientList) {
        const url = event.notification.data?.url || '/admin/commandes';
        for (const client of clientList) {
          if (client.url.includes('/admin') && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
    );
  }
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});