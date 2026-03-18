import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { formatCFA } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, deliveryFee, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-heading text-2xl mb-4">Votre panier est vide</h1>
        <Link to="/catalogue" className="text-accent underline">Découvrir nos abayas</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl font-bold mb-8">Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 bg-card rounded-lg p-4 shadow-warm">
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-sm truncate">{item.name}</h3>
                <p className="text-xs text-muted-foreground">{item.size} • {item.color}</p>
                <p className="text-accent font-bold text-sm mt-1">{formatCFA(item.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)} className="w-8 h-8 rounded bg-muted flex items-center justify-center min-w-[44px] min-h-[44px]">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)} className="w-8 h-8 rounded bg-muted flex items-center justify-center min-w-[44px] min-h-[44px]">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeItem(item.productId, item.size, item.color)} className="text-muted-foreground hover:text-destructive transition-noor p-1 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Trash2 className="h-4 w-4" />
                </button>
                <p className="font-bold text-sm">{formatCFA(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg p-6 shadow-warm self-start sticky top-20">
          <h3 className="font-heading text-lg font-bold mb-4">Résumé</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Sous-total</span><span>{formatCFA(subtotal)}</span></div>
            <div className="flex justify-between"><span>Livraison</span><span>{formatCFA(deliveryFee)}</span></div>
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base">
              <span>Total</span><span className="text-accent">{formatCFA(total)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/commande')}
            className="w-full mt-6 bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:bg-accent hover:text-accent-foreground transition-noor min-h-[48px]"
          >
            Passer la commande
          </button>
        </div>
      </div>
    </div>
  );
}
