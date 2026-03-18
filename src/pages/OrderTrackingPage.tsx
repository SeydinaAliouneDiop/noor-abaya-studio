import React, { useState } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { Search } from 'lucide-react';
import { STATUS_LABELS } from '@/lib/types';

const STEPS = [
  { status: 'en_attente', label: 'Commande reçue' },
  { status: 'confirmee', label: 'Paiement confirmé' },
  { status: 'expediee', label: 'En préparation' },
  { status: 'done', label: 'Expédiée / Prête' },
] as const;

export default function OrderTrackingPage() {
  const { getOrderByRef } = useOrders();
  const [ref, setRef] = useState('');
  const [searched, setSearched] = useState(false);

  const order = searched ? getOrderByRef(ref) : undefined;

  const getStepIndex = (status: string) => {
    if (status === 'en_attente') return 0;
    if (status === 'confirmee') return 1;
    if (status === 'expediee') return 3;
    return -1;
  };

  const currentStep = order ? getStepIndex(order.status) : -1;

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg">
      <h1 className="font-heading text-3xl font-bold text-center mb-8">Suivi de commande</h1>

      <div className="flex gap-2 mb-8">
        <input
          value={ref}
          onChange={e => setRef(e.target.value)}
          placeholder="Entrez votre référence de commande"
          className="flex-1 bg-card border border-border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-accent outline-none"
          onKeyDown={e => e.key === 'Enter' && setSearched(true)}
        />
        <button
          onClick={() => setSearched(true)}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-noor min-w-[48px] min-h-[48px] flex items-center justify-center"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {searched && !order && (
        <div className="text-center py-8 bg-card rounded-lg shadow-warm">
          <p className="text-muted-foreground">Aucune commande trouvée pour "{ref}"</p>
        </div>
      )}

      {order && (
        <div className="bg-card rounded-xl p-6 shadow-warm-lg">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">Commande</p>
            <p className="font-heading text-xl font-bold text-accent">{order.ref}</p>
          </div>

          <div className="space-y-0">
            {STEPS.map((s, i) => {
              const completed = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={s.status} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full transition-noor ${completed ? (isCurrent ? 'bg-accent animate-pulse-gold' : 'bg-primary') : 'bg-muted'}`} />
                    {i < STEPS.length - 1 && <div className={`w-0.5 h-10 ${i < currentStep ? 'bg-primary' : 'bg-muted'}`} />}
                  </div>
                  <div className="pb-8">
                    <p className={`text-sm font-semibold ${completed ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                    {order.status === 'annulee' && i === 0 && (
                      <p className="text-xs text-destructive mt-0.5">Commande annulée</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
