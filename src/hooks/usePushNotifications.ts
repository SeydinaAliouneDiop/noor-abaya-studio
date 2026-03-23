import { useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase/client';

const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBkYIRNNX0pHFJ9s7k0';

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function usePushNotifications() {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    setupPushNotifications();
    setupRealtimeNotifications();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  const setupPushNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    try {
      // Enregistrer le service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker enregistré');

      // Demander permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;

      console.log('Notifications autorisées ✓');
    } catch (err) {
      console.error('Erreur setup notifications:', err);
    }
  };

  const setupRealtimeNotifications = () => {
    // Écoute les nouvelles commandes en temps réel via Supabase
    channelRef.current = supabase
      .channel('push-orders')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'orders',
      }, async (payload) => {
        const order = payload.new as any;
        await sendNotification({
          title: '🛍️ Nouvelle commande !',
          body: `${order.customer_first_name} ${order.customer_last_name} — ${order.total?.toLocaleString('fr-FR')} FCFA`,
          url: '/admin/commandes',
        });
      })
      .subscribe();
  };

  const sendNotification = async (data: { title: string; body: string; url: string }) => {
    if (Notification.permission !== 'granted') return;

    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(data.title, {
        body: data.body,
        icon: '/modest-pearl-logo.png',
        badge: '/modest-pearl-logo.png',
        vibrate: [200, 100, 200],
        data: { url: data.url },
        tag: 'new-order',
        renotify: true,
      } as NotificationOptions);
    } catch (err) {
      // Fallback: notification navigateur classique
      if (Notification.permission === 'granted') {
        new Notification(data.title, {
          body: data.body,
          icon: '/modest-pearl-logo.png',
        });
      }
    }
  };
}