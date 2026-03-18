import React, { useState } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { formatCFA, formatWhatsApp } from '@/lib/utils';
import { STATUS_LABELS, STATUS_COLORS, OrderStatus } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/whatsapp-messages';
import { MessageCircle, X, Phone, MapPin, CreditCard, ChevronDown } from 'lucide-react';

type FilterTab = 'all' | OrderStatus;

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [openAction, setOpenAction] = useState<string | null>(null);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'Toutes' },
    { key: 'en_attente', label: 'En attente' },
    { key: 'confirmee', label: 'Confirmées' },
    { key: 'expediee', label: 'Expédiées' },
    { key: 'annulee', label: 'Annulées' },
  ];

  const filtered = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);
  const selectedOrder = selectedOrderId ? orders.find(o => o.id === selectedOrderId) : null;

  const handleAction = (orderId: string, action: 'confirm_payment' | 'mark_shipped' | 'cancel') => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const statusMap: Record<string, OrderStatus> = { confirm_payment: 'confirmee', mark_shipped: 'expediee', cancel: 'annulee' };
    updateOrderStatus(orderId, statusMap[action]);
    setOpenAction(null);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Gestion des commandes</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-noor min-h-[44px] ${activeTab === t.key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-muted'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl shadow-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Réf</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Téléphone</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Montant</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Statut</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-noor" onClick={() => setSelectedOrderId(o.id)}>
                  <td className="p-3 font-medium">{o.ref}</td>
                  <td className="p-3">{o.customerFirstName} {o.customerLastName}</td>
                  <td className="p-3 hidden md:table-cell">
                    <a href={formatWhatsApp(o.phone)} target="_blank" rel="noopener noreferrer" className="text-noor-whatsapp hover:underline" onClick={e => e.stopPropagation()}>
                      {o.phone}
                    </a>
                  </td>
                  <td className="p-3">{formatCFA(o.total)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[o.status]}`}>
                      {STATUS_LABELS[o.status]}
                    </span>
                  </td>
                  <td className="p-3" onClick={e => e.stopPropagation()}>
                    <div className="relative">
                      <button onClick={() => setOpenAction(openAction === o.id ? null : o.id)} className="px-3 py-1.5 border border-border rounded-lg text-xs font-medium hover:bg-muted transition-noor flex items-center gap-1">
                        Actions <ChevronDown className="h-3 w-3" />
                      </button>
                      {openAction === o.id && (
                        <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-warm-lg z-20 min-w-[200px]">
                          {o.status === 'en_attente' && (
                            <>
                              <button onClick={() => handleAction(o.id, 'confirm_payment')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-noor">Confirmer paiement</button>
                              <a href={getWhatsAppLink('confirm_payment', { ref: o.ref, customerFirstName: o.customerFirstName, customerPhone: o.phone })} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-noor text-noor-whatsapp">
                                <MessageCircle className="h-3 w-3" /> WhatsApp confirmation
                              </a>
                            </>
                          )}
                          {o.status === 'confirmee' && (
                            <>
                              <button onClick={() => handleAction(o.id, 'mark_shipped')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-noor">Marquer expédiée</button>
                              <a href={getWhatsAppLink('mark_shipped', { ref: o.ref, customerFirstName: o.customerFirstName, customerPhone: o.phone })} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-noor text-noor-whatsapp">
                                <MessageCircle className="h-3 w-3" /> WhatsApp expédition
                              </a>
                            </>
                          )}
                          {o.status !== 'annulee' && o.status !== 'expediee' && (
                            <>
                              <button onClick={() => handleAction(o.id, 'cancel')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted text-destructive transition-noor">Annuler</button>
                              <a href={getWhatsAppLink('cancel', { ref: o.ref, customerFirstName: o.customerFirstName, customerPhone: o.phone })} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition-noor text-destructive">
                                <MessageCircle className="h-3 w-3" /> WhatsApp annulation
                              </a>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="p-8 text-center text-muted-foreground">Aucune commande</div>}
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSelectedOrderId(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-warm-xl overflow-y-auto">
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold">{selectedOrder.ref}</h2>
                <button onClick={() => setSelectedOrderId(null)} className="p-2 hover:bg-muted rounded-lg transition-noor"><X className="h-5 w-5" /></button>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Client</h4>
                  <p className="font-medium">{selectedOrder.customerFirstName} {selectedOrder.customerLastName}</p>
                  <a href={formatWhatsApp(selectedOrder.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-noor-whatsapp mt-1">
                    <Phone className="h-3 w-3" /> {selectedOrder.phone}
                  </a>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" /> {selectedOrder.address} — {selectedOrder.quartier}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <CreditCard className="h-3 w-3" /> {selectedOrder.paymentMethod === 'wave' ? 'Wave' : 'Orange Money'}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Articles</h4>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex gap-3 mb-3">
                      <img src={item.image} alt={item.name} className="w-12 h-14 rounded object-cover" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size} • {item.color} • x{item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCFA(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-sm">
                    <span>Total</span><span className="text-accent">{formatCFA(selectedOrder.total)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Historique</h4>
                  {selectedOrder.statusHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 mb-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <div>
                        <p className="text-sm font-medium">{STATUS_LABELS[h.status]}</p>
                        <p className="text-xs text-muted-foreground">{new Date(h.date).toLocaleString('fr-FR')}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp quick action */}
                {selectedOrder.status !== 'annulee' && (
                  <a
                    href={getWhatsAppLink(
                      selectedOrder.status === 'en_attente' ? 'confirm_payment' : selectedOrder.status === 'confirmee' ? 'mark_shipped' : 'confirm_payment',
                      { ref: selectedOrder.ref, customerFirstName: selectedOrder.customerFirstName, customerPhone: selectedOrder.phone }
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm text-white transition-noor min-h-[48px]"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle className="h-4 w-4" /> Envoyer message WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
