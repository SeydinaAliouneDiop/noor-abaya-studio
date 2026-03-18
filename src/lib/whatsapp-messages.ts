import { formatWhatsApp } from './utils';

export type OrderAction = 'confirm_payment' | 'mark_shipped' | 'cancel';

interface OrderInfo {
  ref: string;
  customerFirstName: string;
  customerPhone: string;
}

const messages: Record<OrderAction, (order: OrderInfo) => string> = {
  confirm_payment: (o) =>
    `Bonjour ${o.customerFirstName}, votre commande ${o.ref} a bien été reçue et votre paiement confirmé. Votre abaya est en cours de préparation. Merci de votre confiance ! - Boutique Noor`,
  mark_shipped: (o) =>
    `Bonjour ${o.customerFirstName}, votre commande ${o.ref} est en route ! Vous serez contacté(e) pour la livraison. Merci ! - Boutique Noor`,
  cancel: (o) =>
    `Bonjour ${o.customerFirstName}, votre commande ${o.ref} a été annulée. N'hésitez pas à nous contacter pour toute question. - Boutique Noor`,
};

export function getWhatsAppMessage(action: OrderAction, order: OrderInfo): string {
  return messages[action](order);
}

export function getWhatsAppLink(action: OrderAction, order: OrderInfo): string {
  const baseUrl = formatWhatsApp(order.customerPhone);
  const message = encodeURIComponent(getWhatsAppMessage(action, order));
  return `${baseUrl}?text=${message}`;
}
