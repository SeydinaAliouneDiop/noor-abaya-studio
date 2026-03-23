import React, { useState } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { Order, STATUS_LABELS } from '@/lib/types';
import { Search } from 'lucide-react';

export default function OrderTrackingPage() {
  const { getOrderByRef } = useOrders();
  const [ref, setRef] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const STEPS: { key: Order['status']; label: string }[] = [
    { key: 'en_attente', label: 'Commande reçue' },
    { key: 'confirmee',  label: 'Paiement confirmé' },
    { key: 'expediee',   label: 'Expédiée / Prête à récupérer' },
  ];

  const stepIndex = order
    ? order.status === 'annulee' ? -1
    : STEPS.findIndex(s => s.key === order.status)
    : -1;

  const handleSearch = async () => {
    if (!ref.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    const found = await getOrderByRef(ref.trim());
    if (found) {
      setOrder(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <h1 className="font-heading text-3xl font-bold mb-2 text-center">Suivi de commande</h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Entrez votre référence de commande pour suivre son statut en temps réel
      </p>

      <div className="flex gap-2 mb-8">
        <input
          value={ref}
          onChange={e => setRef(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Ex : CMD-2026-0042"
          className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-accent outline-none min-h-[48px]"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor min-h-[48px] flex items-center gap-2 disabled:opacity-50"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            : <Search className="h-4 w-4" />
          }
          Rechercher
        </button>
      </div>

      {notFound && (
        <div className="bg-card rounded-xl p-6 text-center shadow-warm">
          <p className="text-muted-foreground text-sm">
            Aucune commande trouvée pour <strong>{ref}</strong>.<br />
            Vérifiez la référence reçue après votre commande.
          </p>
        </div>
      )}

      {order && (
        <div className="bg-card rounded-xl p-6 shadow-warm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-heading text-lg font-bold">{order.ref}</p>
              <p className="text-sm text-muted-foreground">{order.customerFirstName} {order.customerLastName}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              order.status === 'annulee'  ? 'bg-red-100 text-red-800' :
              order.status === 'expediee' ? 'bg-blue-100 text-blue-800' :
              order.status === 'confirmee'? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {STATUS_LABELS[order.status]}
            </span>
          </div>

          {order.status === 'annulee' ? (
            <div className="text-center text-sm text-muted-foreground py-4">
              Cette commande a été annulée. Contactez-nous via WhatsApp pour plus d'informations.
            </div>
          ) : (
            <div className="relative mb-6">
              <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-border" />
              <div className="space-y-6">
                {STEPS.map((step, i) => {
                  const done    = i <= stepIndex;
                  const current = i === stepIndex;
                  return (
                    <div key={step.key} className="flex items-center gap-4 relative">
                      <div className={`relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-noor ${
                        done ? 'bg-primary border-primary' : 'bg-background border-border'
                      } ${current ? 'ring-2 ring-accent ring-offset-2' : ''}`}>
                        {done && (
                          <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                        {order.statusHistory.find(h => h.status === step.key) && (
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.statusHistory.find(h => h.status === step.key)!.date).toLocaleString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Récap articles */}
          <div className="border-t border-border pt-4">
            <p className="text-sm font-semibold mb-3">Articles commandés</p>
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">
                  {item.name} ({item.size} — {item.color}) × {item.quantity}
                </span>
                <span className="font-medium">{(item.price * item.quantity).toLocaleString('fr-FR')} FCFA</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold mt-3 pt-3 border-t border-border">
              <span>Total</span>
              <span className="text-accent">{order.total.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
